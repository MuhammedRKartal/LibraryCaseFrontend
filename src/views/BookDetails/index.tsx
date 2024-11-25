import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BookCard } from "../../components/BookCard";
import { BookDetailsType } from "../../types/index";
import { Loading } from "../Scenes/Loading";

const MemberDetails = () => {
  const { book_id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState<BookDetailsType | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBook = useCallback(async () => {
    setLoading(true);

    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/books/${book_id}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();

        setBook(data);
      } else {
        const error = await response.json();

        navigate("/error", { state: { code: error.code, message: error.message } });
      }
    } catch {
      setBook(null);
      navigate("/error");
    } finally {
      setLoading(false);
    }
  }, [book_id]);

  useEffect(() => {
    fetchBook();
  }, [book_id]);

  if (loading) return <Loading />;

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
          {book && <BookCard book={book} refetchBook={fetchBook} />}
        </Paper>
      </Box>
    </Suspense>
  );
};

export default MemberDetails;
