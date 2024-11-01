import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchArgs,
} from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "./features/authSlice";
import { RootState } from "./index";
import { BaseQueryFn } from "@reduxjs/toolkit/query";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface RefreshResponse {
  data?: {
    data?: {
      token: string;
      email: string;
    };
  };
}

//base query
const baseQuery = fetchBaseQuery({
  baseUrl: backendUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Custom base query with re-authentication
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    // Fetching refresh token
    const refreshResult = (await baseQuery(
      "/auth/refreshToken",
      api,
      extraOptions
    )) as RefreshResponse;

    if (refreshResult) {
      // const user = (api.getState() as RootState).auth.user;
      const data = {
        token: refreshResult?.data?.data?.token,
        user: refreshResult?.data?.data?.email,
      };
      // Store the new token
      api.dispatch(setCredentials({ data }));
      // Retry the original query with the new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

// api slice
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
