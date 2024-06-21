import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jwtDecode } from "jwt-decode";
const keys = require("../../keys.js");
let initial = {
  signedIn: false,
  authUserId: null,
  email: null,
  userName: null,
  showError: false,
  errorMessage: null,
  token: null,
};
const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  endpoints: (builder) => ({
    gInit: builder.mutation({
      queryFn: async ({ authDataInfo }, { dispatch }) => {
        const handleGoogleSignIn = (response) => {
          const localAuthUserId = localStorage.getItem("1stop_rtk")
            ? JSON.parse(localStorage.getItem("1stop_rtk"))
            : "";
          if (localAuthUserId?.authUserId) {
            dispatch(
              authApi.endpoints.autoLogin.initiate({
                authDataInfo,
                localAuthUserId,
              })
            );
          } else {
            const responsePayload = jwtDecode(response.credential);
            localStorage.setItem(
              "1stop_rtk",
              JSON.stringify({
                token: null,
                authUserId: responsePayload.sub,
                userName: responsePayload.name,
                email: responsePayload.email,
              })
            );
            dispatch(
              authDataInfo({
                ...initial,
                ...{
                  signedIn: true,
                  authUserId: responsePayload.sub,
                  userName: responsePayload.name,
                  email: responsePayload.email,
                },
              })
            );
          }
        };
        await window.google.accounts.id.initialize({
          client_id: keys.gAuth.clientId,
          callback: handleGoogleSignIn,
          auto_select: false,
        });
        return {};
      },
    }),
    logIn: builder.mutation({
      queryFn: async (
        { authDataInfo, initialRender = false },
        { dispatch, getState }
      ) => {
        const localAuthUserId = localStorage.getItem("1stop_rtk")
          ? JSON.parse(localStorage.getItem("1stop_rtk")).authUserId
          : null;

        if (window.google && getState().authData.validRoute) {
          await dispatch(authApi.endpoints.gInit.initiate({ authDataInfo }));
          if (localAuthUserId !== getState().authData.authUserId) {
            dispatch(
              authDataInfo({
                showAutoLogout: getState().authData.authUserId ? true : false,
                ...initial,
              })
            );
          } else {
            await window.google.accounts.id.prompt(async (response) => {
              await dispatch(
                authApi.endpoints.oneStepLoginFail.initiate({
                  authDataInfo,
                  response,
                  initialRender,
                })
              );
            });
          }
        }
        return {};
      },
    }),
    oneStepLoginFail: builder.mutation({
      queryFn: async (
        { authDataInfo, response, initialRender },
        { dispatch }
      ) => {
        if (response.getDismissedReason() !== "credential_returned") {
          if (
            response.isNotDisplayed() ||
            response.isSkippedMoment() ||
            response.isDismissedMoment()
          ) {
            document.cookie = `g_state=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
            const oneStepFailReason =
              response.getNotDisplayedReason() || response.getSkippedReason();
            if (response.isNotDisplayed()) {
              if (oneStepFailReason === "opt_out_or_no_session") {
                if (!initialRender) {
                  await dispatch(
                    authApi.endpoints.authByTokenInit.initiate({ authDataInfo })
                  );
                }
              } else {
                dispatch(
                  authDataInfo({
                    ...initial,
                    ...{
                      showError: true,
                      errorMessage: oneStepFailReason,
                    },
                  })
                );
              }
            } else if (response.isSkippedMoment()) {
              if (
                ["tap_outside", "user_cancel"].indexOf(
                  response.getSkippedReason()
                ) === -1
              ) {
                dispatch(
                  authDataInfo({
                    ...initial,
                    ...{
                      showError: true,
                      errorMessage: oneStepFailReason,
                    },
                  })
                );
              }
            }
          }
        }
        return {};
      },
    }),
    authByTokenInit: builder.mutation({
      queryFn: async ({ authDataInfo }, { dispatch }) => {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: keys.gAuth.clientId,
          scope: "https://www.googleapis.com/auth/userinfo.profile",
          callback: ({ access_token }) =>
            dispatch(
              authApi.endpoints.authByToken.initiate({
                access_token,
                authDataInfo,
              })
            ),
          error_callback: (error) =>
            dispatch(
              authDataInfo({
                ...initial,
                ...{
                  showError: true,
                  errorMessage: error.message,
                },
              })
            ),
        });
        client.requestAccessToken();
        return {};
      },
    }),
    authByToken: builder.mutation({
      queryFn: async ({ access_token, authDataInfo }, { dispatch }) => {
        const localAuthUserId = localStorage.getItem("1stop_rtk")
          ? JSON.parse(localStorage.getItem("1stop_rtk"))
          : "";
        if (localAuthUserId?.authUserId) {
          dispatch(
            authApi.endpoints.autoLogin.initiate({
              authDataInfo,
              localAuthUserId,
            })
          );
        } else {
          try {
            const profile = await fetch(
              "https://www.googleapis.com/oauth2/v1/userinfo",
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${access_token}`,
                },
              }
            );
            const profileData = await profile.json();
            localStorage.setItem(
              "1stop_rtk",
              JSON.stringify({
                token: access_token,
                authUserId: profileData.id,
                userName: profileData.name,
                email: profileData.email,
              })
            );
            dispatch(
              authDataInfo({
                ...initial,
                ...{
                  signedIn: true,
                  token: access_token,
                  authUserId: profileData.id,
                  userName: profileData.name,
                  email: profileData.email,
                },
              })
            );
          } catch (error) {
            dispatch(
              authDataInfo({
                ...initial,
                ...{
                  showError: true,
                  errorMessage: error.message,
                },
              })
            );
          }
        }
        return {};
      },
    }),
    logOut: builder.mutation({
      queryFn: async ({ authDataInfo }, { dispatch, getState }) => {
        localStorage.removeItem("1stop_rtk");
        const revokeFn = getState().authData.token
          ? window.google.accounts.oauth2.revoke
          : window.google.accounts.id.revoke;
        const revokeId = getState().authData.token
          ? getState().authData.token
          : getState().authData.authUserId;
        revokeFn(revokeId, () => {
          dispatch(authDataInfo(initial));
        });
        return {};
      },
    }),
    autoLogin: builder.mutation({
      queryFn: async ({ authDataInfo, localAuthUserId }, { dispatch }) => {
        dispatch(
          authDataInfo({
            signedIn: true,
            token: localAuthUserId?.token,
            authUserId: localAuthUserId?.authUserId,
            email: localAuthUserId?.email,
            userName: localAuthUserId?.userName,
            showError: false,
            errorMessage: null,
            showAutoLogin: true,
          })
        );
        return {};
      },
    }),
  }),
});
export const { useLogInMutation, useLogOutMutation } = authApi;
export { authApi };
