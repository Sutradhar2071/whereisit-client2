import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Swal from "sweetalert2";
import useTitle from "../hooks/useTitle";

const Login = () => {
  useTitle("WhereIsIt | Login Page");

  const { signIn, googleSignIn } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    signIn(email, password)
      .then(async (result) => {
        const user = result.user;
        const token = await user.getIdToken(); 
        localStorage.setItem("access-token", token); 

        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then(async (result) => {
        const user = result.user;
        const token = await user.getIdToken(); 
        localStorage.setItem("access-token", token); 

        Swal.fire({
          icon: "success",
          title: "Google Sign-in Successful!",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-4 rounded-xl dark:bg-gray-50 dark:text-gray-800 bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1 text-sm">
            <label htmlFor="email" className="block dark:text-gray-600">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-600"
            />
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block dark:text-gray-600">
              Password
            </label>
            <input
              required
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-600"
            />
          </div>

          <button
            type="submit"
            className="block w-full p-3 text-center rounded-sm text-white bg-violet-600 hover:bg-violet-700 transition-colors"
          >
            Sign in
          </button>
        </form>

        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-sm dark:text-gray-600">Or sign in with</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleGoogleLogin}
            aria-label="Log in with Google"
            className="p-3 border rounded-full hover:bg-gray-100 transition"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
              alt="Google"
              className="w-5 h-5"
            />
          </button>
        </div>

        <p className="text-xs text-center mt-4 dark:text-gray-600">
          Don't have an account?
          <Link
            to="/register"
            className="text-violet-600 font-semibold ml-1 underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
