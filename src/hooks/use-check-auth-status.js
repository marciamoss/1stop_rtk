import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authDataInfo } from "../store";

const useCheckAuthStatus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUserId_redux = useSelector((state) => state.authData.authUserId);
  const { authUserId } = localStorage.getItem("1stop_rtk")
    ? JSON.parse(localStorage.getItem("1stop_rtk"))
    : "";
  useEffect(() => {
    if (authUserId) {
      if (authUserId_redux && authUserId !== authUserId_redux) {
        dispatch(
          authDataInfo({
            showLoginSwitch: authUserId !== authUserId_redux ? true : false,
          })
        );
      }
    } else {
      navigate("/");
    }
  }, [authUserId, authUserId_redux, dispatch, navigate]);
};

export default useCheckAuthStatus;
