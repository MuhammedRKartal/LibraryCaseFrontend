import React from "react";
import { Box, LinearProgress } from "@mui/material";

export const Loading = () => {
  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      <LinearProgress />
    </Box>
  );
};
