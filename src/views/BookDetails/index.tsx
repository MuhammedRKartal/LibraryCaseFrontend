import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { BookCard } from "../../components/BookCard";
import { BookDetailsType } from "../../types/index";

const MemberDetails = () => {
  const { book_id } = useParams();

  const [book, setBook] = useState<BookDetailsType | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/books/${book_id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch book data");
        }

        const data = await response.json();

        setBook(data);
      } catch {
        setBook(null);
      }
    };

    fetchBook();
  }, [book_id]);

  if (!book) return <div>Loading...</div>;

  return (
    <Box sx={{ padding: { xs: 2, md: 4 }, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        sx={{ flexDirection: { xs: "column", sm: "row" }, gap: { xs: 2, sm: 0 } }}
      >
        <Button component={Link} to="/" variant="contained" color="primary">
          Back to Homepage
        </Button>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Book Details
        </Typography>
      </Box>
      <Paper
        elevation={3}
        sx={{
          padding: { xs: 2, sm: 3 },
          backgroundColor: "#fff",
        }}
      >
        <BookCard book={book.book} currentOwner={book.currentOwner} />
      </Paper>
    </Box>
  );
};

export default MemberDetails;
