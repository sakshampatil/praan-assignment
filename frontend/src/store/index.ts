import { combineReducers, configureStore } from "@reduxjs/toolkit";
//features
import authReducer from "./features/authSlice";

//services
import { authApi } from "./services/authApi";
import { deviceApi } from "./services/deviceApi";
import { pollutantApi } from "./services/pollutantApi";

//combing reducers
const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  ["device"]: deviceApi.reducer,
  ["pollutant"]: pollutantApi.reducer,
});

//configuring store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      deviceApi.middleware,
      pollutantApi.middleware
    ),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
