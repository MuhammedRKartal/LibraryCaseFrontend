import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
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

  useEffect(() => {
    if (open) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/members`)
        .then(response => response.json())
        .then(data => setMembers(data))
        .catch(error => console.error("Error fetching members:", error));
    }
  }, [open]);

  const handleAssign = () => {
    if (selectedMember) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/members/${selectedMember}/borrow/${bookId}`, {
        method: "POST",
      })
        .then(response => {
          if (response.ok) {
            console.log("Book assigned successfully");
            onClose();
          } else {
            console.error("Failed to assign the book");
          }
        })
        .catch(error => console.error("Error:", error));
    }
  };

  return (
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
  );
};
