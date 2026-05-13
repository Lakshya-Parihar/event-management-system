import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import regImage from "./images/Register.png";

import "./styles/OrgRegister.css";

export default function OrgRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    gender: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    state: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost/EMS/backend/Organizer/org_register.php",
        form
      );
      if (res.data.status === "success") {
        alert("Registration successful!");
        navigate("/org/login");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-teal-200 flex items-center justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl w-full shadow-xl rounded-2xl overflow-hidden">
        <motion.div
          className="Register-image-container bg-green-50 p-10 flex flex-col items-center justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={regImage}
            alt="Register Illustration"
            className="Register-image"
          />
        </motion.div>

        <motion.div
          className="Register-form-section bg-white p-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="Register-form-container">
            <form onSubmit={handleSubmit} className="Register-form">
              <h2 className="Register-title uppercase">
                Create your EMS Organizer's Account
              </h2>
              <p className="Register-subtitle">
                Join us and start your journey!
              </p>

              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-2">
                <label className="block mb-1 font-semibold text-black">
                  Gender
                </label>
                <div className="flex items-center space-x-6 mt-1">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      onChange={handleChange}
                      className="form-radio text-blue-600"
                    />
                    <span className="text-black">male</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      onChange={handleChange}
                      className="form-radio text-pink-500"
                    />
                    <span className="text-black">female</span>
                  </label>
                </div>
              </div>

              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 bottom-1 top-1/2 transform -translate-y-1/2 cursor-pointer text-black"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>

              <div className="input-group">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" disabled={loading}>
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                ) : (
                  "REGISTER"
                )}
              </button>

              <div className="signup-link">
                Already have an account?{" "}
                <a href="/org/login" className="signup-text">
                  Sign In
                </a>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
