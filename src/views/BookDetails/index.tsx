import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { BookCard } from "../../components/BookCard";
import { Loading } from "../../components/Loading";
import { BookDetailsType } from "../../types/index";

const MemberDetails = () => {
  const { book_id } = useParams();

  const [book, setBook] = useState<BookDetailsType | null>(null);

  const fetchBook = useCallback(async () => {
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
  }, [book_id]);

  useEffect(() => {
    fetchBook();
  }, [book_id]);

  if (!book) return;

  return (
    <Suspense fallback={<Loading />}>
      <Box sx={{ padding: { xs: 2, md: 4 } }}>
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
          <BookCard book={book} refetchBook={fetchBook} />
        </Paper>
      </Box>
    </Suspense>
  );
};

export default MemberDetails;
