import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import loginImage from "./images/login.png";
import facebook from "./images/facebook-icon.png";
import twitter from "./images/twitter-icon.png";
import github from "./images/github-icon.png";
import google from "./images/google-icon.png";
import { useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaTwitter,
  FaFacebook,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import "./styles/OrgLogin.css";

export default function OrgLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost/EMS/backend/Organizer/org_login.php",
        form
      );
      if (res.data.status === "success") {
        localStorage.setItem("org", JSON.stringify(res.data.org));
        alert("Login successful!");
        navigate("/org/dashboard");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-teal-200 flex items-center justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl w-full shadow-xl rounded-2xl overflow-hidden">
        <motion.div
          className="login-image-container bg-green-50 p-10 flex flex-col items-center justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={loginImage}
            alt="Login Illustration"
            className="login-image"
          />
        </motion.div>

        <motion.div
          className="login-form-section"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="login-form-container">
            <form onSubmit={handleSubmit} className="login-form">
              <h2 className="login-title uppercase">
                Welcome To EMS <br />Organizer Portal <span className="waving-hand">👋</span>
              </h2>
              <p className="login-subtitle">
                Please sign-in to your account and start the adventure
              </p>

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

              <div className="login-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  &nbsp;&nbsp;
                  <span>Remember Me</span>
                </label>
                <a href="/forgot-password" className="forgot-password">
                  Forgot Password?
                </a>
              </div>

              <button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                ) : (
                  "LOGIN"
                )}
              </button>

              <div className="signup-link">
                New on our platform?{" "}
                <a href="/org/register" className="signup-text">
                  Create an account
                </a>
              </div>

              <div className="social-login">
                <p className="social-divider">or continue with</p>
                <div className="social-icons">
                  <a href=" " className="social-icon">
                    <img src={facebook} alt="Facebook" />
                  </a>
                  <a href=" " className="social-icon">
                    <img src={twitter} alt="Twitter" />
                  </a>
                  <a href=" " className="social-icon">
                    <img src={github} alt="Github" />
                  </a>
                  <a href=" " className="social-icon">
                    <img src={google} alt="Google" />
                  </a>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
