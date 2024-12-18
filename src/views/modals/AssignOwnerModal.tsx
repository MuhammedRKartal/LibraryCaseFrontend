import React, { useCallback, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import { MemberType } from "../../types";

interface AssignOwnerModalProps {
  open: boolean;
  onClose: () => void;
  bookId: number;
  refetchBook: () => void;
}

export const AssignOwnerModal = ({ open, onClose, bookId, refetchBook }: AssignOwnerModalProps) => {
  const [members, setMembers] = useState<MemberType[]>([]);
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const fetchMembers = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`);

      if (response.ok) {
        const data = await response.json();

        setMembers(data);
      } else {
        const error = await response.json();

        setSnackbar({ open: true, message: error.message, severity: "error" });
      }
    } catch {
      setSnackbar({
        open: true,
        message: "Error occured while fetching members.",
        severity: "error",
      });
    }
  }, []);

  useEffect(() => {
    if (open) {
      fetchMembers();
    }
  }, [open]);

  const handleAssign = useCallback(() => {
    if (selectedMember) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${selectedMember}/borrow/${bookId}`, {
        method: "POST",
      })
        .then(async response => {
          if (response.ok) {
            refetchBook();
            onClose();
          } else {
            const error = await response.json();

            setSnackbar({ open: true, message: `Error: ${error.message}`, severity: "error" });
          }
        })
        .catch(() => {
          setSnackbar({
            open: true,
            message: "Error occurred during assignment",
            severity: "error",
          });
        });
    }
  }, [selectedMember, bookId, refetchBook, onClose]);

  const handleSnackbarClose = () => {
    setSnackbar({
      open: false,
      message: "",
      severity: "error",
    });
  };

  return (
    <>
      <Modal open={open} onClose={onClose} aria-labelledby="assign-owner-modal">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 4,
            boxShadow: 24,
          }}
        >
          <IconButton onClick={onClose} sx={{ position: "absolute", top: 1, right: 1 }}>
            <CloseIcon fontSize="small" />
          </IconButton>
          <Typography id="assign-owner-modal" variant="h6" component="h2" sx={{ mb: 2 }}>
            Assign Owner
          </Typography>
          <FormControl fullWidth>
            {members ? (
              <>
                <InputLabel id="select-member-label">Select Member</InputLabel>
                <Select
                  labelId="select-member-label"
                  value={selectedMember}
                  onChange={e => setSelectedMember(e.target.value as string)}
                  label="Select Member"
                >
                  {members?.map(member => (
                    <MenuItem key={member.id} value={member.id}>
                      {member?.name}
                    </MenuItem>
                  ))}
                </Select>
              </>
            ) : (
              <Typography variant="body1" color="error">
                Error loading members.
              </Typography>
            )}
          </FormControl>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <Button onClick={onClose} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={handleAssign}
              variant="contained"
              color="primary"
              disabled={!selectedMember}
            >
              Assign
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
