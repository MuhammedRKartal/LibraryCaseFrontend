import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Box,
  Button,
  IconButton,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

interface ReturnBookModalProps {
  open: boolean;
  onClose: () => void;
  memberId: number;
  bookId: number;
  bookName: string;
}

export const ReturnBookModal = ({
  open,
  onClose,
  memberId,
  bookId,
  bookName,
}: ReturnBookModalProps) => {
  const [rating, setRating] = useState<number>(0);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const handleSendRating = async () => {
    const endpoint = `${process.env.REACT_APP_BACKEND_URL}/members/${memberId}/return/${bookId}`;
    const body = { rating };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setRating(0);
        onClose();
        window.location.reload();
      } else {
        const errorMessage = await response.json();

        setSnackbarSeverity("error");
        setSnackbarMessage(`Error: ${errorMessage.error}`);
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage(`Error: ${error.message}`);
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
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
              slotProps={{ htmlInput: { step: 0.1, min: 0, max: 10 } }}
            />
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={handleSendRating}
              disabled={!rating || isNaN(rating)}
              sx={{ px: 2 }}
            >
              Return
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
