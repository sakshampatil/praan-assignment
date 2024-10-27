import { apiSlice } from "../api";

export const deviceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createDevice: builder.mutation({
      query: () => ({
        url: "/device/create",
        method: "POST",
      }),
    }),
    listDevices: builder.query({
      query: () => ({
        url: "/device/list",
      }),
    }),
  }),
});

export const { useCreateDeviceMutation, useListDevicesQuery } = deviceApi;
