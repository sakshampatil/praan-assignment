import { apiSlice } from "../api";

export const pollutantApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listPollutants: builder.query({
      query: (body) => ({
        url: `/pollutant/list/${body.deviceId}?date=${body.date}`,
      }),
    }),
    getAvgPollutants: builder.query({
      query: (body) => ({
        url: `/pollutant/avgPollutant/${body.deviceId}?date=${body.date}`,
      }),
    }),
  }),
});

export const { useListPollutantsQuery, useGetAvgPollutantsQuery } = pollutantApi;
