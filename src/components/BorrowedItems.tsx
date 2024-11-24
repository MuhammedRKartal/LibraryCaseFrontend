import React, { useState } from "react";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { Grid2, IconButton, Paper, Typography } from "@mui/material";
import { BorrowedItemType } from "../types";
import { ReturnBookModal } from "../views/modals/ReturnBookModal";

//The borrow.returnedAt!, ! in there is telling typescript to borrow.returnedAt is not null or undefined

interface BorrowedItemProps {
  borrows: BorrowedItemType[];
}

export const BorrowedItems = ({ borrows }: BorrowedItemProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedBorrow, setSelectedBorrow] = useState<BorrowedItemType | null>(null);
  const [, setRating] = useState<number>(0);

  const handleOpenModal = (borrow: BorrowedItemType) => {
    setSelectedBorrow(borrow);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBorrow(null);
    setRating(0);
  };

  const handleSendRating = async (rating: number) => {
    if (selectedBorrow) {
      const endpoint = `http://localhost:5000/members/${selectedBorrow.memberId}/return/${selectedBorrow.book.id}`;
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
          handleCloseModal();
        } else {
        }
      } catch {}
    }
  };

  return (
    <>
      {borrows.map(borrow => (
        <Grid2 size={{ xs: 12, sm: 6, md: 4, xl: 2.65 }} key={borrow.id}>
          <Paper sx={{ p: 2, borderRadius: 3, position: "relative" }}>
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
    </>
  );
};
