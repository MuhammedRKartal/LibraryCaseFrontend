import React, { useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { BookDetailsType } from "../types";
import { AssignOwnerModal } from "../views/modals/AssignOwnerModal";

interface BookCardProps {
  book: BookDetailsType;
  refetchBook: () => void;
}

export const BookCard = ({ book, refetchBook }: BookCardProps) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Paper
        sx={{
          maxWidth: 340,
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
          {book.name && (
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1, textAlign: "center" }}>
              {book.name}
            </Typography>
          )}
          {book.author && (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
              <strong>{book.author}</strong>
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            mb: 8,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {book.currentOwner ? (
            <Typography
              variant="body1"
              sx={{ display: "flex", flexDirection: "column", textAlign: "center" }}
            >
              <strong>Current Owner:</strong>{" "}
              <Button
                component={Link}
                to={`/members/${book.currentOwner.id}`}
                variant="text"
                color="primary"
                sx={{ width: "fit-content", textTransform: "capitalize" }}
              >
                {book.currentOwner.name!}
              </Button>
            </Typography>
          ) : (
            <Button variant="contained" onClick={handleOpenModal}>
              Assign Owner
            </Button>
          )}
        </Box>
        <Box>
          {book.rating && (
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Average Rating:</strong> {book.rating}
            </Typography>
          )}
          {book.publisher && (
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Publisher:</strong> {book.publisher}
            </Typography>
          )}
          {book.publishYear && (
            <Typography variant="body2">
              <strong>Year of Publication:</strong> {book.publishYear}
            </Typography>
          )}
        </Box>
      </Paper>

      <AssignOwnerModal
        open={openModal}
        onClose={handleCloseModal}
        bookId={book.id}
        refetchBook={refetchBook}
      />
    </>
  );
};
