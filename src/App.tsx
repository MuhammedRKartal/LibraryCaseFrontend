import React, { Dispatch, SyntheticEvent, useEffect, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BooksGrid from "./components/BooksGrid";
import MembersGrid from "./components/MembersGrid";
import { RootState } from "./store";
import { setTabIndex } from "./store/tabSlice";
import { BookType, MemberType } from "./types";
import { Loading } from "./views/Scenes/Loading";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tabIndex = useSelector((state: RootState) => state.tab.index);
  const [members, setMembers] = useState<MemberType[]>([]);
  const [books, setBooks] = useState<BookType[]>([]);
  const [fetched, setFetched] = useState({ members: false, books: false });
  const [loading, setLoading] = useState(false);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    dispatch(setTabIndex(newValue));
  };

  const fetchData = (
    endpoint: string,
    setState: Dispatch<React.SetStateAction<MemberType[] | BookType[]>>
  ) => {
    setLoading(true);

    fetch(`${process.env.REACT_APP_BACKEND_URL}/${endpoint}`)
      .then(response => response.json())
      .then(data => setState(data))
      .catch(() => {
        navigate("/500");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (tabIndex === 0 && !fetched.members) {
      fetchData("users", setMembers);
      setFetched(prev => ({ ...prev, members: true }));
    } else if (tabIndex === 1 && !fetched.books) {
      fetchData("books", setBooks);
      setFetched(prev => ({ ...prev, books: true }));
    }
  }, [tabIndex]);

  return (
    <Box sx={{ padding: { xs: 2, md: 4 } }}>
      <Tabs value={tabIndex} onChange={handleChange}>
        <Tab label="Members" />
        <Tab label="Books" />
      </Tabs>
      {loading ? (
        <Loading />
      ) : tabIndex === 0 ? (
        <MembersGrid members={members} />
      ) : (
        <BooksGrid books={books} />
      )}
    </Box>
  );
};

export default App;
