import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import useTitle from "../hooks/useTitle";

const MySwal = withReactContent(Swal);

const Register = () => {
  useTitle("WhereIsIt | Register Page")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showError = (message) => {
    MySwal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
    });
  };

  const showSuccess = (message) => {
    MySwal.fire({
      icon: "success",
      title: "Success!",
      text: message,
    });
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLengthValid = password.length >= 6;

    if (!hasUpperCase) {
      showError("Password must contain at least one uppercase letter.");
      return false;
    }
    if (!hasLowerCase) {
      showError("Password must contain at least one lowercase letter.");
      return false;
    }
    if (!isLengthValid) {
      showError("Password must be at least 6 characters long.");
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, photoURL, password } = formData;

    if (!validatePassword(password)) return;

    try {
      await createUser(email, password);
      await updateUserProfile(name, photoURL);
      showSuccess("Registration successful!");
      navigate("/login");
    } catch (error) {
      showError(error.message);
    }
  };

  return (
    <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800 mx-auto mt-10">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Register</h1>
        <p className="text-sm dark:text-gray-600">Create a new account</p>
      </div>
      <form onSubmit={handleRegister} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm">Name</label>
            <input
              type="text"
              name="name"
              required
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label htmlFor="photoURL" className="block mb-2 text-sm">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="https://example.com/photo.jpg"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm">Password</label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="******"
            />
          </div>
        </div>
        <div className="space-y-2">
          <button
            type="submit"
            className="w-full px-8 py-3 font-semibold rounded-md bg-violet-600 text-white hover:bg-violet-700"
          >
            Register
          </button>
          <p className="px-6 text-sm text-center text-gray-600">
            Already have an account?
            <a href="/login" className="hover:underline text-violet-600 ml-1">
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
