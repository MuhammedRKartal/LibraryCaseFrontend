import React, { useEffect, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import BooksGrid from "./components/BooksGrid";
import MembersGrid from "./components/MembersGrid";
import { BookType, MemberType } from "./types";

const App = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [members, setMembers] = useState<MemberType[]>([]);
  const [books, setBooks] = useState<BookType[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  /**  To do less server operations in this part we can do
      if(members.length == 0){
        fetch
      }
      in fetches
  */

  const fetchMembers = () => {
    fetch("http://localhost:5000/members")
      .then(response => response.json())
      .then(data => setMembers(data));
  };

  const fetchBooks = () => {
    fetch("http://localhost:5000/books")
      .then(response => response.json())
      .then(data => setBooks(data));
  };

  useEffect(() => {
    if (tabIndex === 0) {
      fetchMembers();
    } else if (tabIndex === 1) {
      fetchBooks();
    }
  }, [tabIndex]);

  return (
    <Box>
      <Tabs value={tabIndex} onChange={handleChange}>
        <Tab label="Members" />
        <Tab label="Books" />
      </Tabs>
      {tabIndex === 0 && members && <MembersGrid members={members} />}
      {tabIndex === 1 && books && <BooksGrid books={books} />}
    </Box>
  );
};

export default App;
