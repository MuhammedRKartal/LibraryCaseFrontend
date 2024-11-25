import React, { useEffect, useState } from "react";
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
}

export const AssignOwnerModal = ({ open, onClose, bookId }: AssignOwnerModalProps) => {
  const [members, setMembers] = useState<MemberType[]>([]);
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  useEffect(() => {
    if (open) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/users`)
        .then(response => response.json())
        .then(data => setMembers(data))
        .catch(() => {
          setSnackbarMessage("Failed to fetch members");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        });
    }
  }, [open]);

  const handleAssign = () => {
    if (selectedMember) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${selectedMember}/borrow/${bookId}`, {
        method: "POST",
      })
        .then(async response => {
          if (response.ok) {
            onClose();
            window.location.reload();
          } else {
            const errorMessage = await response.json();

            setSnackbarSeverity("error");
            setSnackbarMessage(`Error: ${errorMessage.error}`);
            setSnackbarOpen(true);
          }
        })
        .catch(error => {
          console.error("Error:", error);
          setSnackbarMessage("Error occurred during assignment");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
            <InputLabel id="select-member-label">Select Member</InputLabel>
            <Select
              labelId="select-member-label"
              value={selectedMember}
              onChange={e => setSelectedMember(e.target.value as string)}
              label="Select Member"
            >
              {members.map(member => (
                <MenuItem key={member.id} value={member.id}>
                  {member.name}
                </MenuItem>
              ))}
            </Select>
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
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
