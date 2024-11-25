import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Box, Button, Grid2, Paper, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { BorrowedItems } from "../../components/BorrowedItems";
import { MemberCard } from "../../components/MemberCard";
import { MemberDetailsType } from "../../types";
import Error500 from "../Scenes/500";
import { Loading } from "../Scenes/Loading";

const MemberDetails = () => {
  const { member_id } = useParams();

  const [member, setMember] = useState<MemberDetailsType | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchMember = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${member_id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch member data");
      }
      const data = await response.json();

      setMember(data);
    } catch {
      setMember(null);
    } finally {
      setLoading(false);
    }
  }, [member_id]);

  useEffect(() => {
    fetchMember();
  }, [member_id]);

  if (loading) return <Loading />;
  if (!member) return <Error500 errorMessage={"Member data is unavailable!"} />;

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
          <MemberCard member={member} />
          <Box mt={4} sx={{ width: "100%" }}>
            {member?.borrows?.present?.length > 0 && (
              <>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ mt: 4, color: "#1976d2", textAlign: "center" }}
                >
                  Present Borrows
                </Typography>
                <Grid2 container spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
                  <BorrowedItems borrows={member.borrows.present} refetchMember={fetchMember} />
                </Grid2>
              </>
            )}

            {member?.borrows?.past?.length > 0 && (
              <>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ mt: 6, color: "#1976d2", textAlign: "center" }}
                >
                  Past Borrows
                </Typography>
                <Grid2 container spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
                  <BorrowedItems borrows={member.borrows.past} refetchMember={fetchMember} />
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
