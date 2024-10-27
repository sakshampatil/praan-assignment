// src/pages/Login.tsx
import React, { useEffect, useState } from "react";
import helpers from "../helpers";
import { useLoginMutation } from "../store/services/authApi";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { setCredentials } from "../store/features/authSlice";
import Loader from "../components/Loader";

const Login: React.FC = () => {
  const [login, { isSuccess, isError, error: loginError, data: loginData, isLoading }] =
    useLoginMutation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isSuccess) {
      const data = {
        token: loginData.data.token,
        user: loginData.data.email,
      };

      dispatch(setCredentials({ data }));
      toast.success("Success");
      setEmail("");
      setPassword("");
      setError(null);

      navigate("/");
    } else if (isError) {
      if ("status" in loginError) {
        // This is likely a FetchBaseQueryError
        const errorMessage: any =
          loginError.data && typeof loginError.data === "object" && "message" in loginError.data
            ? loginError.data.message
            : "Oops! Something went wrong.";
        toast.error(errorMessage);
      } else {
        // This is likely a SerializedError
        toast.error("Oops! Something went wrong.");
      }
    }
  }, [isSuccess, isError]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // validating email
    if (!helpers.validateEmail(email)) {
      setError("Invalid Email");
      return;
    }

    //validating password
    if (!helpers.validatePassword(password)) {
      setError("Invalid Password");
      return;
    }

    const credentials = {
      email,
      password,
    };
    login(credentials);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex items-center justify-center w-full h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-md font-medium text-gray-700">
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring "
              />
              {error && error.includes("Email") && <p className="text-sm  text-red-500">{error}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring "
                required
              />
              {error && error.includes("Password") && (
                <p className="text-sm  text-red-500">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-4 font-semibold text-white flex justify-center items-center bg-black rounded-xl"
            >
              {isLoading ? <Loader /> : "Login"}
            </button>
          </form>
          <span className="text-black text-xs mt-8 text-center block">
            Dont have an account?{" "}
            <Link to="/signup" className="text-blue-500 cursor-pointer">
              Signup
            </Link>
          </span>
          <span className="text-black text-xs mt-8 text-center block">@powered by praan</span>
        </div>
      </div>
    </>
  );
};

export default Login;
