import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, Modal, TextField, Typography } from "@mui/material";

interface ReturnBookModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
  bookName: string;
}

export const ReturnBookModal = ({ open, onClose, onSubmit, bookName }: ReturnBookModalProps) => {
  const [rating, setRating] = useState<number>(0);

  const handleSend = () => {
    if (!isNaN(rating)) {
      onSubmit(rating);
      setRating(0);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <IconButton onClick={onClose} sx={{ position: "absolute", top: 1, right: 1 }}>
          <CloseIcon fontSize="small" />
        </IconButton>
        <Typography variant="h4">Returning Book</Typography>
        <Typography variant="h6" sx={{ mb: 2, mt: 0.5 }}>
          Rate: {bookName}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
          <TextField
            size="small"
            fullWidth
            label="Rating"
            type="number"
            value={rating}
            onChange={e => {
              const value = Math.min(10, Math.max(0, parseFloat(e.target.value) || 0));

              setRating(value);
            }}
            slotProps={{ htmlInput: { step: "0.1", min: "0", max: "10" } }}
          />
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={handleSend}
            disabled={!rating || isNaN(rating)}
            sx={{ px: 2 }}
          >
            Return
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
