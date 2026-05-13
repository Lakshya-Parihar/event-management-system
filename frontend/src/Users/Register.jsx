import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import regImage from "./images/Register.png";

// Background images
import bg1 from "./images/bg1.jpg";
import bg2 from "./images/bg2.jpg";
import bg3 from "./images/bg3.jpg";
import bg4 from "./images/bg4.jpg";

import "./Styles/Register.css";

export default function Register() {
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
  const [currentBg, setCurrentBg] = useState(0);
  const navigate = useNavigate();

  const backgrounds = [bg1, bg2, bg3, bg4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.gender ||
      !form.email ||
      !form.password ||
      !form.phone ||
      !form.city ||
      !form.state
    ) {
      alert("Please fill in all fields including gender.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost/EMS/backend/User/register.php",
        form
      );
      if (res.data.status === "success") {
        alert("Registration successful!");
        navigate("/login");
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
    <motion.div
      className="Register-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        backgroundImage: `url(${backgrounds[currentBg]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "background-image 1s ease-in-out",
      }}
    >
      <div className="Register-container">
        <div className="Register-image-container">
          <img
            src={regImage}
            alt="Register Illustration"
            className="Register-image"
          />
        </div>

        <div className="Register-form-section">
          <div className="Register-form-container">
            <form onSubmit={handleSubmit} className="Register-form">
              <h2 className="Register-title">
                Create your EMS Account <span className="waving-hand">🚀</span>
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
                    <span className="text-black">Male</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      onChange={handleChange}
                      className="form-radio text-pink-500"
                    />
                    <span className="text-black">Female</span>
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
                  required
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
                <a href="/login" className="signup-text">
                  Sign In
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
