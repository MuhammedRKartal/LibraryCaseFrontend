import React from "react";
import { Visibility } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MemberType } from "../types";

interface MemberProps {
  members: MemberType[];
}

const MembersGrid = ({ members }: MemberProps) => {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Age</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Gender</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Country</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members?.map((member: MemberType) => (
            <TableRow key={member?.id}>
              <TableCell>{member?.id}</TableCell>
              <TableCell>{member?.name}</TableCell>
              <TableCell>{member?.age}</TableCell>
              <TableCell>{member?.gender}</TableCell>
              <TableCell>{member?.country}</TableCell>

              <TableCell>
                <IconButton onClick={() => navigate(`/members/${member?.id}`)} size="small">
                  <Visibility fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(MembersGrid);
