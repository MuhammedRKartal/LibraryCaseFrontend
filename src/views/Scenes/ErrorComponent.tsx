import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const ErrorComponent = () => {
  const location = useLocation();

  const message = location.state?.message || "An unexpected error occurred.";
  const code = location.state?.code || "500";

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
        {code}
      </Typography>
      <Typography variant="h4" fontWeight="medium" sx={{ mb: 1 }}>
        Oops! Something went wrong.
      </Typography>
      {message && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {message}
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

export default ErrorComponent;
