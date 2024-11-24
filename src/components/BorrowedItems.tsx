import React, { useState } from "react";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { Alert, Grid2, IconButton, Paper, Snackbar, Typography } from "@mui/material";
import { BorrowedItemType } from "../types";
import { ReturnBookModal } from "../views/modals/ReturnBookModal";

interface BorrowedItemProps {
  borrows: BorrowedItemType[];
}

export const BorrowedItems = ({ borrows }: BorrowedItemProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedBorrow, setSelectedBorrow] = useState<BorrowedItemType | null>(null);
  const [, setRating] = useState<number>(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const handleOpenModal = (borrow: BorrowedItemType) => {
    setSelectedBorrow(borrow);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBorrow(null);
    setRating(0);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSendRating = async (rating: number) => {
    if (selectedBorrow) {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/members/${selectedBorrow.memberId}/return/${selectedBorrow.book.id}`;
      const body = { rating: rating };

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          setSnackbarSeverity("success");
          setSnackbarMessage("Book returned successfully!");
          setSnackbarOpen(true);
          handleCloseModal();
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
    }
  };

  return (
    <>
      {borrows.map(borrow => (
        <Grid2 size={{ xs: 12, sm: 6, md: 4, xl: 2.65 }} key={borrow.id}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 3,
              position: "relative",
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
              background: "#f5f5f5",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              {borrow.book.name}
            </Typography>
            <Typography fontSize={14}>
              <strong>Author:</strong> {borrow.book.author}
            </Typography>
            <Typography fontSize={14}>
              <strong>Borrowed:</strong> {new Date(borrow.borrowedAt).toLocaleDateString()}
            </Typography>
            {borrow.returned && (
              <Typography fontSize={14}>
                <strong>Returned:</strong> {new Date(borrow.returnedAt!).toLocaleDateString()}
              </Typography>
            )}
            {borrow.returned && (
              <Typography fontSize={14}>
                <strong>Rating:</strong> {borrow.rating ?? 0}
              </Typography>
            )}

            {!borrow.returned && (
              <IconButton
                sx={{ position: "absolute", right: 2, bottom: 2, fontSize: 14 }}
                onClick={() => handleOpenModal(borrow)}
              >
                Return <KeyboardReturnIcon fontSize="small" />
              </IconButton>
            )}
          </Paper>
        </Grid2>
      ))}
      {selectedBorrow && (
        <ReturnBookModal
          open={openModal}
          onClose={handleCloseModal}
          onSubmit={handleSendRating}
          bookName={selectedBorrow.book.name}
        />
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
