import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSelector } from "react-redux";
const Signup = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // Prevent form submission & submit values
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    try {
      const res = await axios.post(
        "http://localhost:1000/api/v1/sign-up",
        values
      );
      // toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>{isLoggedIn ? <ErrorPage /> :  <div className="h-screen bg-[#C7D2FE] flex items-center justify-center">
      <ToastContainer position="top-center" draggable />
      <div className="w-4/6 md:w-3/6 lg:w-2/6 flex flex-col items-center justify-center">
        <Link to="/" className="text-2xl font-bold">
          PODCASTER
        </Link>
        <form onSubmit={handleSubmit} className="mt-6 w-full">
          <div className="w-full flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="mt-2 px-2 py-2 rounded outline-none border-2 border-black"
              required
              placeholder="Username"
              name="username"
              value={values.username}
              onChange={change}
            />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email" // Change to email type for validation
              className="mt-2 px-2 py-2 rounded outline-none border-2 border-black"
              required
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={change}
            />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="mt-2 px-2 py-2 rounded outline-none border-2 border-black"
              required
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={change}
            />
          </div>
          <div className="w-full flex flex-col mt-4">
            <button
              type="submit"
              className="bg-[#2F2E41] font-semibold text-xl text-white rounded py-2"
            >
              Signup
            </button>
          </div>
        </form>
        <div className="w-full flex flex-col mt-4">
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold hover:text-blue-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>}
    </>
   
  );
};

export default Signup;
