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
import { BorrowedItemType } from "../../types";

interface ReturnBookModalProps {
  open: boolean;
  onClose: () => void;
  selectedBorrow: BorrowedItemType;
  refetchMember: () => void;
}

export const ReturnBookModal = ({
  open,
  onClose,
  selectedBorrow,
  refetchMember,
}: ReturnBookModalProps) => {
  const [rating, setRating] = useState<number>(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleReturnBook = () => {
    const body = { rating };

    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/${selectedBorrow?.memberId}/return/${selectedBorrow?.bookId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    )
      .then(async response => {
        if (response.ok) {
          setRating(0);
          refetchMember();
          onClose();
        } else {
          const error = await response.json();

          setSnackbar({ open: true, message: `Error: ${error.error}`, severity: "error" });
        }
      })
      .catch(() => {
        setSnackbar({
          open: true,
          message: "Error occurred during assignment",
          severity: "error",
        });
      });
  };

  const handleSnackbarClose = () => {
    setSnackbar({
      open: false,
      message: "",
      severity: "error",
    });
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
            Rate: {selectedBorrow?.book?.name}
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
              onClick={handleReturnBook}
              disabled={!rating || isNaN(rating)}
              sx={{ px: 2 }}
            >
              Return
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
