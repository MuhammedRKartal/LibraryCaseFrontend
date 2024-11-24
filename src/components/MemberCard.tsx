import React from "react";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import { MemberType } from "../types";

interface MemberCardType {
  member: MemberType;
}

export const MemberCard = ({ member }: MemberCardType) => {
  return (
    <Paper
      sx={{
        minWidth: 300,
        mt: 4,
        p: 2,
        borderRadius: 3,
        borderLeft: "2px solid #3f51b5",
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        background: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Avatar sx={{ bgcolor: "#3f51b5", width: 56, height: 56 }}>{member.name.charAt(0)}</Avatar>
        <Box sx={{ ml: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {member.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {member.gender}
          </Typography>
        </Box>
      </Box>

      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Age:</strong> {member.age}
      </Typography>

      <Typography variant="body1">
        <strong>Country:</strong> {member.country}
      </Typography>
    </Paper>
  );
};
