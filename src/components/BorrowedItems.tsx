import React, { useState } from "react";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { Grid2, IconButton, Paper, Typography } from "@mui/material";
import { BorrowedItemType } from "../types";
import { ReturnBookModal } from "../views/modals/ReturnBookModal";

interface BorrowedItemProps {
  borrows: BorrowedItemType[];
}

export const BorrowedItems = ({ borrows }: BorrowedItemProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedBorrow, setSelectedBorrow] = useState<BorrowedItemType | null>(null);

  const handleOpenModal = (borrow: BorrowedItemType) => {
    setSelectedBorrow(borrow);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBorrow(null);
  };

  return (
    <>
      {borrows.map(borrow => (
        <Grid2 size={{ xs: 12, sm: 6, md: 4, xl: 2.35 }} key={borrow.id}>
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
          memberId={selectedBorrow.memberId}
          bookId={selectedBorrow.book.id}
          bookName={selectedBorrow.book.name}
        />
      )}
    </>
  );
};
