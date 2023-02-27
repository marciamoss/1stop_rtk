import React from "react";
import { useLogInMutation, useLogOutMutation, authDataInfo } from "../../store";
import { useLocation, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useSelector } from "react-redux";
import { useCheckRoute } from "../../hooks";
import PageNotFound from "../PageNotFound";
import { APPROUTES } from "../../constants/types";

const Header = () => {
  useCheckRoute();
  const location = useLocation();
  const [logIn] = useLogInMutation();
  const [logOut] = useLogOutMutation();

  const { signedIn, userName, showError, errorMessage } = useSelector(
    (state) => {
      return {
        signedIn: state.authData.signedIn,
        userName: state.authData.userName,
        showError: state.authData.showError,
        errorMessage: state.authData.errorMessage,
      };
    }
  );

  const showHeader =
    APPROUTES.filter((r) => r === location.pathname).length > 0;
  if (!showHeader) {
    return <PageNotFound />;
  }

  return (
    <nav className="py-6 px-10 w-full bg-black">
      <div className="flex justify-between items-center container mx-auto bg-black">
        <div>
          <h1 className="max-[640px]:text-sm text-lg text-zinc-50 font-bold">
            <Link to="/">1Stop</Link>
          </h1>
        </div>
        <>
          {showError ? (
            <div>
              <h1 className="max-[640px]:text-sm text-lg text-red-600 font-bold ml-5 mr-5">
                Signin Failure: {errorMessage}, Try again
              </h1>
            </div>
          ) : (
            ""
          )}
        </>
        <>
          {signedIn ? (
            <div>
              <h1 className="max-[640px]:text-sm text-center text-lg text-zinc-50 font-bold">
                Hello {userName}
              </h1>
            </div>
          ) : (
            ""
          )}
        </>
        <button
          onClick={() =>
            !signedIn ? logIn({ authDataInfo }) : logOut({ authDataInfo })
          }
          className="max-[640px]:text-sm text-lg text-zinc-50 font-bold"
        >
          <div className="flex items-center">
            <span className="mr-1">{!signedIn ? "Sign In" : "Sign Out"}</span>
            <FcGoogle />
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Header;
