import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useRefreshTokenMutation } from "../store/services/authApi";
import { useEffect } from "react";
import { setCredentials } from "../store/features/authSlice";
import Navbar from "./Navbar";

const RequireAuth = () => {
  const [getToken, { data: refreshData, isSuccess, isError }] = useRefreshTokenMutation({});
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && isError) {
      navigate("/login");
    }
    if (isSuccess) {
      const data = {
        token: refreshData.data.token,
        user: refreshData.data.email,
      };

      dispatch(setCredentials({ data }));
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (!token) {
      getToken({});
    }
  }, [token]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
export default RequireAuth;
