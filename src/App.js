import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useFetchUserQuery } from "./store";
import { useAddUser, useInitAuth } from "./hooks";
import Header from "./components/Header/Header";
import LandingPage from "./components/LandingPage/LandingPage";
import MusicPage from "./components/MusicPage/MusicPage";
import { APPROUTES, APPROUTESCOMPONENTS } from "./constants/types";

const App = () => {
  const { authUserId, userAdded, signedIn } = useSelector((state) => {
    return {
      signedIn: state.authData.signedIn,
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
        {signedIn ? (
          <>
            {APPROUTESCOMPONENTS.map((rt) => (
              <Route key={rt.r} path={rt.r} element={rt.p} />
            ))}
          </>
        ) : (
          <>
            {APPROUTES.map((r) => (
              <Route key={r} path={r} element={<LandingPage />} />
            ))}
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
