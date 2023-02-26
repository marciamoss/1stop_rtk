import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLogInMutation, authDataInfo } from "../store";
const keys = require("../keys.js");

const useInitAuth = () => {
  const dispatch = useDispatch();
  const [logIn] = useLogInMutation();
  const { token, authUserId, userName } = localStorage.getItem("1stop_rtk")
    ? JSON.parse(localStorage.getItem("1stop_rtk"))
    : "";

  useEffect(() => {
    if (authUserId) {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: keys.gAuth.clientId,
          auto_select: false,
        });
      }
      dispatch(
        authDataInfo({
          signedIn: true,
          token,
          authUserId,
          userName,
          showError: false,
          errorMessage: null,
        })
      );
    } else {
      logIn({ authDataInfo, initialRender: true });
    }
  }, [dispatch, logIn, token, authUserId, userName]);
};

export default useInitAuth;
