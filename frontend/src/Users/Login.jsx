import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import loginImage from "./images/login.png";
import
{ FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import facebook from "./images/facebook-icon.png";
import twitter from "./images/twitter-icon.png";
import github from "./images/github-icon.png";
import google from "./images/google-icon.png";
import bg5 from "./images/bg5.jpg";
import bg6 from "./images/bg6.jpg";
import bg7 from "./images/bg7.jpg";
import "./Styles/Login.css";
  
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const backgrounds = [bg5, bg6, bg7];

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
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost/EMS/backend/User/login.php",
        form
      );
      if (res.data.status === "success") {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert("Login successful!");
        navigate("/home");
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
    <motion.div
      className="login-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        backgroundImage: `url(${backgrounds[currentBg]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div className="login-container">
        <div className="login-image-container">
          <img
            src={loginImage}
            alt="Login Illustration"
            className="login-image"
          />
        </div>

        <div className="login-form-section">
          <div className="login-form-container">
            <form onSubmit={handleSubmit} className="login-form">
              <h2 className="login-title">
                Welcome to EMS <span className="waving-hand">👋</span>
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
                <a href="/register" className="signup-text">
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
        </div>
      </div>
    </motion.div>
  );
}
