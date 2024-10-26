import React, { useEffect, useState } from "react";
import helpers from "../helpers";
import { useSingupMutation } from "../store/services/authApi";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const Signup: React.FC = () => {
  const [signup, { isSuccess, isError, error: signupError }] = useSingupMutation();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Success");
      setEmail("");
      setPassword("");
      setError(null);

      //   router.replace(`/profiles`);
    } else if (isError) {
      if ("status" in signupError) {
        // This is likely a FetchBaseQueryError
        const errorMessage: any =
          signupError.data && typeof signupError.data === "object" && "message" in signupError.data
            ? signupError.data.message
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
    signup(credentials);
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
          <h2 className="text-2xl font-bold text-center text-gray-700">Signup</h2>

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
              className="w-full py-2 mt-4 font-semibold text-white bg-black rounded-xl"
            >
              Log In
            </button>
          </form>
          <span className="text-black text-xs mt-8 text-center block">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 cursor-pointer">
              Login
            </Link>
          </span>
          <span className="text-black text-xs mt-8 text-center block">@powered by praan</span>
        </div>
      </div>
    </>
  );
};

export default Signup;
