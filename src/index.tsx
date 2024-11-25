import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App";
import { store } from "./store";
import BookDetails from "./views/BookDetails";
import MemberDetails from "./views/MemberDetails";
import "./styles/global.scss";
import ErrorComponent from "./views/Scenes/ErrorComponent";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/members" element={<App />} />
        <Route path="/members/:member_id" element={<MemberDetails />} />
        <Route path="/books/:book_id" element={<BookDetails />} />
        <Route path="/error" element={<ErrorComponent />} />
      </Routes>
    </Router>
  </Provider>
);
