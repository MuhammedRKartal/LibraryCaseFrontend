import React, { useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { BookType, MemberType } from "../types";
import { AssignOwnerModal } from "../views/modals/AssignOwnerModal";

interface BookCardProps {
  book: BookType;
  currentOwner: MemberType | null;
}

export const BookCard = ({ book, currentOwner }: BookCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  console.log(currentOwner);

  return (
    <>
      <Paper
        sx={{
          width: 340,
          minHeight: 500,
          p: 3,
          mx: "auto",
          borderRadius: "10px 10px 0 0",
          borderLeft: "5px solid #3f51b5",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
          background: "#f5f5f5",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1, textAlign: "center" }}>
            {book.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
            <strong>{book.author}</strong>
          </Typography>
        </Box>
        <Box sx={{ mb: 8, textAlign: "center" }}>
          {currentOwner ? (
            <Typography variant="body1" sx={{ display: "flex", flexDirection: "column" }}>
              <strong>Current Owner:</strong> {currentOwner.name!}
            </Typography>
          ) : (
            <Button variant="contained" onClick={handleOpenModal}>
              Assign Owner
            </Button>
          )}
        </Box>
        <Box>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Average Rating:</strong> {book.rating}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Publisher:</strong> {book.publisher}
          </Typography>
          <Typography variant="body2">
            <strong>Year of Publication:</strong> {book.publishYear}
          </Typography>
        </Box>
      </Paper>

      {/* Modal for assigning owner */}
      <AssignOwnerModal open={isModalOpen} onClose={handleCloseModal} bookId={book.id} />
    </>
  );
};
