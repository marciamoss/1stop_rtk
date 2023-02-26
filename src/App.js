import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useFetchUserQuery } from "./store";
import { useAddUser, useInitAuth } from "./hooks";
import Header from "./components/Header/Header";
import LandingPage from "./components/LandingPage/LandingPage";
import MusicPage from "./components/MusicPage/MusicPage";

const App = () => {
  const { authUserId, userAdded } = useSelector((state) => {
    return {
      authUserId: state.authData.authUserId,
      userAdded: state.userData.userAdded,
    };
  });
  useInitAuth();
  useFetchUserQuery(authUserId);
  useAddUser();

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage authUserId={authUserId} userAdded={userAdded} />
          }
        />
        <Route path="/movies" element={<div>movies page</div>} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/videos" element={<div>videos page</div>} />
        <Route path="/news" element={<div>news page</div>} />
      </Routes>
    </Router>
  );
};

export default App;
