import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLogInMutation, authDataInfo } from "../store";
const keys = require("../keys.js");

const useInitAuth = () => {
  const dispatch = useDispatch();
  const [logIn] = useLogInMutation();
  const authUserId_redux = useSelector((state) => state.authData.authUserId);
  const { token, authUserId, userName, email } = localStorage.getItem(
    "1stop_rtk"
  )
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
          email,
          showError: false,
          errorMessage: null,
        })
      );
      if (authUserId_redux && authUserId !== authUserId_redux) {
        dispatch(
          authDataInfo({
            showLoginSwitch: authUserId !== authUserId_redux ? true : false,
          })
        );
      }
    } else {
      logIn({ authDataInfo, initialRender: true });
    }
  }, [dispatch, logIn, token, authUserId, email, userName, authUserId_redux]);
};

export default useInitAuth;
