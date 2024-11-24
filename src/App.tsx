import React, { Suspense, useEffect } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import BooksGrid from "./components/BooksGrid";
import { Loading } from "./components/Loading";
import MembersGrid from "./components/MembersGrid";
import { RootState } from "./store";
import { setTabIndex } from "./store/tabSlice";
import { BookType, MemberType } from "./types";

const App = () => {
  const dispatch = useDispatch();
  const tabIndex = useSelector((state: RootState) => state.tab.index);
  const [members, setMembers] = React.useState<MemberType[]>([]);
  const [books, setBooks] = React.useState<BookType[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    dispatch(setTabIndex(newValue));
  };

  const fetchMembers = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/members`)
      .then(response => response.json())
      .then(data => setMembers(data));
  };

  const fetchBooks = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/books`)
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
    <Box sx={{ padding: { xs: 2, md: 4 } }}>
      <Tabs value={tabIndex} onChange={handleChange}>
        <Tab label="Members" />
        <Tab label="Books" />
      </Tabs>
      <Suspense fallback={<Loading />}>
        {tabIndex === 0 && members && <MembersGrid members={members} />}
        {tabIndex === 1 && books && <BooksGrid books={books} />}
      </Suspense>
    </Box>
  );
};

export default App;
