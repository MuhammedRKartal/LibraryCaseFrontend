import React, { Suspense, useEffect, useState } from "react";
import { Box, Button, Grid2, Paper, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { BorrowedItems } from "../../components/BorrowedItems";
import { Loading } from "../../components/Loading";
import { MemberCard } from "../../components/MemberCard";
import { MemberDetailsType } from "../../types/index";

const MemberDetails = () => {
  const { member_id } = useParams();

  const [member, setMember] = useState<MemberDetailsType | null>(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${member_id}`);

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

  if (!member) return;

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
            Member Details
          </Typography>
        </Box>

        <Paper
          elevation={3}
          sx={{
            padding: { xs: 2, sm: 3 },
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MemberCard member={member.member} />

          <Box mt={4} sx={{ width: "100%" }}>
            {member.currentBorrows.length > 0 && (
              <>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ mt: 4, color: "#1976d2", textAlign: "center" }}
                >
                  Current Borrows
                </Typography>
                <Grid2 container spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
                  <BorrowedItems borrows={member.currentBorrows} />
                </Grid2>
              </>
            )}

            {member.previousBorrows.length > 0 && (
              <>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ mt: 6, color: "#1976d2", textAlign: "center" }}
                >
                  Previous Borrows
                </Typography>
                <Grid2 container spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
                  <BorrowedItems borrows={member.previousBorrows} />
                </Grid2>
              </>
            )}
          </Box>
        </Paper>
      </Box>
    </Suspense>
  );
};

export default MemberDetails;
