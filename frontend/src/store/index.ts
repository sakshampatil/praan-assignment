import { combineReducers, configureStore } from "@reduxjs/toolkit";
//features
import authReducer from "./features/authSlice";

//services
import { authApi } from "./services/authApi";

//combing reducers
const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
});

//configuring store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: any) => getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
