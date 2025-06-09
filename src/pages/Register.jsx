import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLengthValid = password.length >= 6;

    if (!hasUpperCase) {
      toast.error("Password must contain at least one uppercase letter.");
      return false;
    }
    if (!hasLowerCase) {
      toast.error("Password must contain at least one lowercase letter.");
      return false;
    }
    if (!isLengthValid) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }

    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const { name, email, photoURL, password } = formData;

    if (!validatePassword(password)) {
      return;
    }

    // Dummy simulate register success (replace with Firebase or your logic)
    toast.success("Successfully registered!");
    navigate("/login");
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
            <label htmlFor="name" className="block mb-2 text-sm">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Email address
            </label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              placeholder="leroy@jenkins.com"
            />
          </div>
          <div>
            <label htmlFor="photoURL" className="block mb-2 text-sm">
              Photo URL
            </label>
            <input
              type="text"
              name="photoURL"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              placeholder="https://example.com/photo.jpg"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              placeholder="*****"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <button
              type="submit"
              className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50"
            >
              Register
            </button>
          </div>
          <p className="px-6 text-sm text-center dark:text-gray-600">
            Already have an account?
            <a
              href="/login"
              className="hover:underline dark:text-violet-600 ml-1"
            >
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
