import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface Error500Type {
  errorMessage: string;
}

const Error500 = ({ errorMessage }: Error500Type) => {
  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        padding: 3,
      }}
    >
      <Typography variant="h1" fontWeight="bold" color="error" sx={{ mb: 2 }}>
        500
      </Typography>
      <Typography variant="h4" fontWeight="medium" sx={{ mb: 1 }}>
        Oops! Something went wrong.
      </Typography>
      {errorMessage && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {errorMessage}
        </Typography>
      )}
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        size="large"
        sx={{
          textTransform: "capitalize",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        Return to Homepage
      </Button>
    </Box>
  );
};

export default Error500;
