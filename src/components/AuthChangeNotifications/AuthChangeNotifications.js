import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authDataInfo } from "../../store";
import MessageModal from "../Message/MessageModal";

const AuthChangeNotifications = () => {
  const dispatch = useDispatch();
  const { userName, email, showAutoLogout, showAutoLogin, showLoginSwitch } =
    useSelector((state) => state.authData);
  return (
    <>
      {showAutoLogout ? (
        <MessageModal
          showModal={showAutoLogout}
          dispatchType={() => dispatch(authDataInfo({ showAutoLogout: false }))}
          message={`You have been logged out from another session on this window, Sign In again to continue`}
          modalColor={"bg-orange-900"}
        />
      ) : (
        ""
      )}
      {showAutoLogin ? (
        <MessageModal
          showModal={showAutoLogin}
          dispatchType={() => dispatch(authDataInfo({ showAutoLogin: false }))}
          message={`You have previously logged into this application using
          ${email ? email : userName}
         on this window, Sign out if you want to use a different account`}
          modalColor={"bg-green-900"}
        />
      ) : (
        ""
      )}
      {showLoginSwitch ? (
        <MessageModal
          showModal={showLoginSwitch}
          dispatchType={() =>
            dispatch(authDataInfo({ showLoginSwitch: false }))
          }
          message={`You previously switched your account on this application to
          ${email ? email : userName}
         on this window, Sign out if you want to use a different account`}
          modalColor={"bg-green-900"}
        />
      ) : (
        ""
      )}
    </>
  );
};
export default AuthChangeNotifications;
