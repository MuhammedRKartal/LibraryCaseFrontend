import React, { useEffect, useState } from "react";
import { Box, Button, Grid2, Paper, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { BorrowedItems } from "../../components/BorrowedItems";
import { MemberCard } from "../../components/MemberCard";
import { MemberDetailsType } from "../../types/index";

const MemberDetails = () => {
  const { member_id } = useParams();

  const [member, setMember] = useState<MemberDetailsType | null>(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await fetch(`http://localhost:5000/members/${member_id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch member data");
        }

        const data = await response.json();

        setMember(data);
      } catch {
        setMember(null);
      }
    };

    fetchMember();
  }, [member_id]);

  if (!member) return <div>Loading...</div>;

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
          Member Details
        </Typography>
      </Box>

      <Paper
        elevation={3}
        sx={{
          padding: { xs: 2, sm: 3 },
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <MemberCard member={member.member} />

        <Box mt={4}>
          {member.currentBorrows.length > 0 && (
            <>
              <Typography variant="h5" gutterBottom sx={{ mt: 4, color: "#1976d2" }}>
                Current Borrows
              </Typography>
              <Grid2 container spacing={2}>
                <BorrowedItems borrows={member.currentBorrows} />
              </Grid2>
            </>
          )}

          {member.previousBorrows.length > 0 && (
            <>
              <Typography variant="h5" gutterBottom sx={{ mt: 6, color: "#1976d2" }}>
                Previous Borrows
              </Typography>
              <Grid2 container spacing={2}>
                <BorrowedItems borrows={member.previousBorrows} />
              </Grid2>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default MemberDetails;
