import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiUser, FiMail, FiPhone, FiHome, FiLock } from "react-icons/fi";
import { FaCircle } from "react-icons/fa";

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.name) {
      setUsername(storedUser.name);
    }
  }, []);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

      const [isOnline, setIsOnline] = useState(navigator.onLine);
  
    useEffect(() => {
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);
  
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
  
      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }, []);

  const [activeSection, setActiveSection] = useState("Account Information");
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const fetchUserData = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;
    if (!userId) return;

    fetch(`http://localhost/EMS/backend/User/update_user.php?id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setUser({ ...data.user, id: userId });
        } else {
          console.error("Failed to fetch user data:", data.message);
        }
      })
      .catch((err) => console.error("Error fetching user:", err));
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    const { name, email, phone, city, state } = user;

    if (!name || !email || !phone || !city || !state) {
      toast.error("All fields are required.");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;
    if (!userId) {
      toast.error("User not found.");
      return;
    }

    const updatedUser = { ...user, id: userId };

    const res = await fetch(
      "http://localhost/EMS/backend/User/update_user.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      }
    );

    const result = await res.json();
    if (result.status === "success") {
      toast.success(result.message || "Profile updated successfully!");

      // Update localStorage and username shown in the navbar
      const updatedLocalUser = { ...storedUser, name: updatedUser.name };
      localStorage.setItem("user", JSON.stringify(updatedLocalUser));
      setUsername(updatedUser.name);
    } else {
      toast.error(result.message || "Failed to update profile.");
    }

    setUser({
      id: userId,
      name: "",
      email: "",
      phone: "",
      city: "",
      state: "",
    });

    setActiveSection("Account Information");
  };

  const handlePasswordChange = async () => {
    const { currentPassword, newPassword, confirmNewPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;
    if (!userId) {
      toast.error("User ID not found.");
      return;
    }

    const res = await fetch(
      "http://localhost/EMS/backend/User/update_user.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userId,
          changePassword: true,
          currentPassword,
          newPassword,
        }),
      }
    );

    const result = await res.json();
    toast.success(result.message || "Password updated successfully!");

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });

    setActiveSection("Account Information");
  };

  const updateField = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <motion.div
        className="backdrop-blur-md bg-gradient-to-r from-blue-600/60 to-cyan-500/60 px-8 py-4 rounded-b-2xl shadow-lg sticky top-0 z-50 flex justify-between items-center"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
      >
        <Link to="/home">
          <h1 className="text-3xl font-bold text-white drop-shadow-md">EMS</h1>
        </Link>

        <div className="space-x-4 ml-36 font-semibold text-white flex items-center">
          <Link
            to="/home"
            className="hover:text-black transition duration-300 cursor-pointer"
          >
            HOME
          </Link>
          <Link
            to="/events"
            className="hover:text-black transition duration-300 cursor-pointer"
          >
            EVENTS
          </Link>
          <a
            href="/home#about"
            className="hover:text-black transition duration-300 cursor-pointer"
          >
            ABOUT
          </a>
          <Link
            to="/users-contact"
            className="hover:text-black transition duration-300 cursor-pointer"
          >
            CONTACT
          </Link>
          <a
            href="/home#faq"
            className="hover:text-black transition duration-300 cursor-pointer"
          >
            FAQs
          </a>
          <Link
            to="/org/login"
            className="hover:text-black transition duration-300 cursor-pointer"
          >
            ORGANIZER
          </Link>

          <Link
            to="/user-profile"
            className="hover:text-black transition duration-300 cursor-pointer"
          >
            <FiUser className="text-xl" />
          </Link>
        </div>

        <div className="flex items-center gap-4">

          <div className="flex gap-2 items-center">
            <FaCircle
              className={`text-sm ${
                isOnline ? "text-green-700" : "text-red-700"
              }`}
            />
            <span className="text-sm font-medium text-black">
              {isOnline ? "ONLINE" : "OFFLINE"}
            </span>
          </div>

          <Link to="/">
            <button
              className="px-4 py-2 bg-white text-blue-600 rounded-xl font-semibold shadow hover:scale-105 transition"
              onClick={logout}
            >
              LOGOUT
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Main Content User-Profile  */}
      <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-white via-gray-100 to-gray-200 p-6">
        <motion.div
          className="lg:w-1/4 bg-white rounded-2xl p-6 shadow-lg backdrop-blur-md"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <nav className="mt-8">
            {["Account Information", "Password"].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`flex items-center p-3 text-gray-600 hover:text-orange-500 hover:bg-gray-100 rounded-xl cursor-pointer mb-2 transition ${
                  activeSection === item ? "bg-gray-100 text-orange-500" : ""
                }`}
                onClick={() => setActiveSection(item)}
              >
                <span className="mr-3">{item}</span>
              </motion.div>
            ))}
          </nav>
        </motion.div>

        <motion.div
          className="flex-1 bg-white rounded-2xl shadow-lg p-6 mt-6 lg:mt-0 lg:ml-6 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {activeSection === "Account Information" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Personal Information
              </h2>
              <div className="flex items-center mb-6">
                <motion.div
                  className="w-16 h-16 rounded-full bg-gray-300 mr-4 flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                >
                  <FiUser size={32} className="text-orange-500" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-semibold text-orange-500">
                    {username}
                  </h3>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    label: "Full Name",
                    value: user.name,
                    field: "name",
                    icon: <FiUser />,
                  },
                  {
                    label: "Email Address",
                    value: user.email,
                    field: "email",
                    icon: <FiMail />,
                  },
                  {
                    label: "Phone Number",
                    value: user.phone,
                    field: "phone",
                    icon: <FiPhone />,
                  },
                  {
                    label: "City",
                    value: user.city,
                    field: "city",
                    icon: <FiHome />,
                  },
                  {
                    label: "State",
                    value: user.state,
                    field: "state",
                    icon: <FiHome />,
                  },
                ].map(({ label, value, field, icon }, index) => (
                  <div key={index} className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1 flex items-center">
                      <span className="mr-2 text-orange-500">{icon}</span>
                      {label}
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={value}
                      onChange={updateField}
                      className="border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:ring focus:ring-orange-200 focus:outline-none"
                      required
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={handleUpdate}
                className="bg-orange-500 text-white py-3 px-6 rounded-xl shadow-md transition hover:bg-orange-600 mt-6"
              >
                Update
              </button>
            </div>
          )}

          {activeSection === "Password" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Change Password
              </h2>
              <div className="grid gap-4">
                {[
                  { label: "Current Password", field: "currentPassword" },
                  { label: "New Password", field: "newPassword" },
                  {
                    label: "Confirm New Password",
                    field: "confirmNewPassword",
                  },
                ].map(({ label, field }, index) => (
                  <div key={index} className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1 flex items-center">
                      <FiLock className="text-orange-500 mr-2" />
                      <span>{label}</span>
                    </label>
                    <input
                      type="password"
                      value={passwordData[field]}
                      onChange={(e) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          [field]: e.target.value,
                        }))
                      }
                      className="border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:ring focus:ring-orange-200 focus:outline-none"
                      required
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={handlePasswordChange}
                className="bg-orange-500 text-white py-3 px-6 rounded-xl shadow-md transition hover:bg-orange-600 mt-6"
              >
                Update Password
              </button>
            </div>
          )}
        </motion.div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          closeOnClick
        />
      </div>

      {/* Footer */}
      <footer className="text-white">
        <motion.div
          className="backdrop-blur-md bg-gradient-to-r from-blue-600/60 to-cyan-500/60 px-8 py-4 rounded-t-2xl shadow-lg sticky top-0 z-50 flex justify-between items-center"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
        >
          <div className="max-w-7xl mx-auto px-2">
            {/* Main Footer Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-1 pt-10 border-t border-white justify-between text-center">
              {/* Logo + Description */}
              <div className="justify-start text-left">
                <h3 className="text-xl font-bold mb-2 hover:text-black transition duration-300 cursor-pointer">
                  EMS
                </h3>
                <p className="text-sm mb-3 font-semibold hover:text-black transition duration-300 cursor-pointer">
                  We create digital experiences for event organizers and
                  attendees.
                </p>
                <p className="text-sm mb-3 font-semibold hover:text-black transition duration-300 cursor-pointer">
                  From planning to ticketing, EMS simplifies every step of event
                  management.
                </p>
              </div>

              {/* Company */}
              <div>
                <h4 className="font-semibold mb-3 hover:text-black transition duration-300 cursor-pointer">
                  COMPANY
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="/home#about"
                      className="font-semibold hover:text-black transition duration-300 cursor-pointer"
                    >
                      ABOUT US
                    </a>
                  </li>
                  <li>
                    <a
                      href={'/org/login'}
                      className="font-semibold hover:text-black transition duration-300 cursor-pointer"
                    >
                      ORGANIZE
                    </a>
                  </li>
                  <li>
                    <a
                      href={"/users-contact"}
                      className="font-semibold hover:text-black transition duration-300 cursor-pointer"
                    >
                      CONTACT US
                    </a>
                  </li>
                  <li>
                    <a
                      href={"/users-team"}
                      className="font-semibold hover:text-black transition duration-300 cursor-pointer"
                    >
                      OUR TEAM
                    </a>
                  </li>
                </ul>
              </div>

              {/* Customer */}
              <div>
                <h4 className="font-semibold mb-3 hover:text-black transition duration-300 cursor-pointer">
                  CUSTOMER
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href={"/users-contact"}
                      className="font-semibold hover:text-black transition duration-300 cursor-pointer"
                    >
                      SUPPORT
                    </a>
                  </li>
                  <li>
                    <a
                      href={"/events"}
                      className="font-semibold hover:text-black transition duration-300 cursor-pointer"
                    >
                      EVENTS
                    </a>
                  </li>
                  <li>
                    <a
                      href="/home#faq"
                      className="font-semibold hover:text-black transition duration-300 cursor-pointer"
                    >
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a
                      href={"/users-pricing"}
                      className="font-semibold hover:text-black transition duration-300 cursor-pointer"
                    >
                      PRICING
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="font-semibold mb-3 hover:text-black transition duration-300 cursor-pointer">
                  CONTACT INFO
                </h4>
                <ul className="space-y-2 text-sm font-semibold">
                  <li className="font-semibold hover:text-black transition duration-300 cursor-pointer">
                    <i className="fas fa-envelope mr-2"></i>info@ems.com
                  </li>
                  <li className="font-semibold hover:text-black transition duration-300 cursor-pointer">
                    <i className="fas fa-phone mr-2"></i>+123 456 7890
                  </li>
                  <li className="font-semibold hover:text-black transition duration-300 cursor-pointer">
                    <i className="fas fa-map-marker-alt mr-2"></i>123 Event St,
                    City, Country
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="social-icons">
                <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-md shadow-gray-200 group transition-all duration-300">
                  <svg
                    class="transition-all duration-300 group-hover:scale-110"
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 72 72"
                    fill="none"
                  >
                    <path
                      d="M46.4927 38.6403L47.7973 30.3588H39.7611V24.9759C39.7611 22.7114 40.883 20.4987 44.4706 20.4987H48.1756V13.4465C46.018 13.1028 43.8378 12.9168 41.6527 12.8901C35.0385 12.8901 30.7204 16.8626 30.7204 24.0442V30.3588H23.3887V38.6403H30.7204V58.671H39.7611V38.6403H46.4927Z"
                      fill="#337FFF"
                    />
                  </svg>
                </button>
                <button class="w-8 h-8 flex items-center justify-center group rounded-lg bg-white shadow-md shadow-gray-200 group transition-all duration-300">
                  <svg
                    class="transition-all duration-300 group-hover:scale-110"
                    width="25"
                    height="25"
                    viewBox="0 0 72 72"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.4456 35.7808C27.4456 31.1786 31.1776 27.4468 35.7826 27.4468C40.3875 27.4468 44.1216 31.1786 44.1216 35.7808C44.1216 40.383 40.3875 44.1148 35.7826 44.1148C31.1776 44.1148 27.4456 40.383 27.4456 35.7808ZM22.9377 35.7808C22.9377 42.8708 28.6883 48.618 35.7826 48.618C42.8768 48.618 48.6275 42.8708 48.6275 35.7808C48.6275 28.6908 42.8768 22.9436 35.7826 22.9436C28.6883 22.9436 22.9377 28.6908 22.9377 35.7808ZM46.1342 22.4346C46.1339 23.0279 46.3098 23.608 46.6394 24.1015C46.9691 24.595 47.4377 24.9797 47.9861 25.2069C48.5346 25.4342 49.1381 25.4939 49.7204 25.3784C50.3028 25.2628 50.8378 24.9773 51.2577 24.5579C51.6777 24.1385 51.9638 23.6041 52.0799 23.0222C52.1959 22.4403 52.1367 21.8371 51.9097 21.2888C51.6828 20.7406 51.2982 20.2719 50.8047 19.942C50.3112 19.6122 49.7309 19.436 49.1372 19.4358H49.136C48.3402 19.4361 47.5771 19.7522 47.0142 20.3144C46.4514 20.8767 46.1349 21.6392 46.1342 22.4346ZM25.6765 56.1302C23.2377 56.0192 21.9121 55.6132 21.0311 55.2702C19.8632 54.8158 19.0299 54.2746 18.1538 53.4002C17.2777 52.5258 16.7354 51.6938 16.2827 50.5266C15.9393 49.6466 15.533 48.3214 15.4222 45.884C15.3009 43.2488 15.2767 42.4572 15.2767 35.781C15.2767 29.1048 15.3029 28.3154 15.4222 25.678C15.5332 23.2406 15.9425 21.918 16.2827 21.0354C16.7374 19.8682 17.2789 19.0354 18.1538 18.1598C19.0287 17.2842 19.8612 16.7422 21.0311 16.2898C21.9117 15.9466 23.2377 15.5406 25.6765 15.4298C28.3133 15.3086 29.1054 15.2844 35.7826 15.2844C42.4598 15.2844 43.2527 15.3106 45.8916 15.4298C48.3305 15.5408 49.6539 15.9498 50.537 16.2898C51.7049 16.7422 52.5382 17.2854 53.4144 18.1598C54.2905 19.0342 54.8308 19.8682 55.2855 21.0354C55.6289 21.9154 56.0351 23.2406 56.146 25.678C56.2673 28.3154 56.2915 29.1048 56.2915 35.781C56.2915 42.4572 56.2673 43.2466 56.146 45.884C56.0349 48.3214 55.6267 49.6462 55.2855 50.5266C54.8308 51.6938 54.2893 52.5266 53.4144 53.4002C52.5394 54.2738 51.7049 54.8158 50.537 55.2702C49.6565 55.6134 48.3305 56.0194 45.8916 56.1302C43.2549 56.2514 42.4628 56.2756 35.7826 56.2756C29.1024 56.2756 28.3125 56.2514 25.6765 56.1302ZM25.4694 10.9322C22.8064 11.0534 20.9867 11.4754 19.3976 12.0934C17.7518 12.7316 16.3585 13.5878 14.9663 14.977C13.5741 16.3662 12.7195 17.7608 12.081 19.4056C11.4626 20.9948 11.0403 22.8124 10.9191 25.4738C10.7958 28.1394 10.7676 28.9916 10.7676 35.7808C10.7676 42.57 10.7958 43.4222 10.9191 46.0878C11.0403 48.7494 11.4626 50.5668 12.081 52.156C12.7195 53.7998 13.5743 55.196 14.9663 56.5846C16.3583 57.9732 17.7518 58.8282 19.3976 59.4682C20.9897 60.0862 22.8064 60.5082 25.4694 60.6294C28.138 60.7506 28.9893 60.7808 35.7826 60.7808C42.5759 60.7808 43.4286 60.7526 46.0958 60.6294C48.759 60.5082 50.5774 60.0862 52.1676 59.4682C53.8124 58.8282 55.2066 57.9738 56.5989 56.5846C57.9911 55.1954 58.8438 53.7998 59.4842 52.156C60.1026 50.5668 60.5268 48.7492 60.6461 46.0878C60.7674 43.4202 60.7956 42.57 60.7956 35.7808C60.7956 28.9916 60.7674 28.1394 60.6461 25.4738C60.5248 22.8122 60.1026 20.9938 59.4842 19.4056C58.8438 17.7618 57.9889 16.3684 56.5989 14.977C55.2088 13.5856 53.8124 12.7316 52.1696 12.0934C50.5775 11.4754 48.7588 11.0514 46.0978 10.9322C43.4306 10.811 42.5779 10.7808 35.7846 10.7808C28.9913 10.7808 28.138 10.809 25.4694 10.9322Z"
                      fill="url(#paint0_radial_7092_54471)"
                    />
                    <path
                      d="M27.4456 35.7808C27.4456 31.1786 31.1776 27.4468 35.7826 27.4468C40.3875 27.4468 44.1216 31.1786 44.1216 35.7808C44.1216 40.383 40.3875 44.1148 35.7826 44.1148C31.1776 44.1148 27.4456 40.383 27.4456 35.7808ZM22.9377 35.7808C22.9377 42.8708 28.6883 48.618 35.7826 48.618C42.8768 48.618 48.6275 42.8708 48.6275 35.7808C48.6275 28.6908 42.8768 22.9436 35.7826 22.9436C28.6883 22.9436 22.9377 28.6908 22.9377 35.7808ZM46.1342 22.4346C46.1339 23.0279 46.3098 23.608 46.6394 24.1015C46.9691 24.595 47.4377 24.9797 47.9861 25.2069C48.5346 25.4342 49.1381 25.4939 49.7204 25.3784C50.3028 25.2628 50.8378 24.9773 51.2577 24.5579C51.6777 24.1385 51.9638 23.6041 52.0799 23.0222C52.1959 22.4403 52.1367 21.8371 51.9097 21.2888C51.6828 20.7406 51.2982 20.2719 50.8047 19.942C50.3112 19.6122 49.7309 19.436 49.1372 19.4358H49.136C48.3402 19.4361 47.5771 19.7522 47.0142 20.3144C46.4514 20.8767 46.1349 21.6392 46.1342 22.4346ZM25.6765 56.1302C23.2377 56.0192 21.9121 55.6132 21.0311 55.2702C19.8632 54.8158 19.0299 54.2746 18.1538 53.4002C17.2777 52.5258 16.7354 51.6938 16.2827 50.5266C15.9393 49.6466 15.533 48.3214 15.4222 45.884C15.3009 43.2488 15.2767 42.4572 15.2767 35.781C15.2767 29.1048 15.3029 28.3154 15.4222 25.678C15.5332 23.2406 15.9425 21.918 16.2827 21.0354C16.7374 19.8682 17.2789 19.0354 18.1538 18.1598C19.0287 17.2842 19.8612 16.7422 21.0311 16.2898C21.9117 15.9466 23.2377 15.5406 25.6765 15.4298C28.3133 15.3086 29.1054 15.2844 35.7826 15.2844C42.4598 15.2844 43.2527 15.3106 45.8916 15.4298C48.3305 15.5408 49.6539 15.9498 50.537 16.2898C51.7049 16.7422 52.5382 17.2854 53.4144 18.1598C54.2905 19.0342 54.8308 19.8682 55.2855 21.0354C55.6289 21.9154 56.0351 23.2406 56.146 25.678C56.2673 28.3154 56.2915 29.1048 56.2915 35.781C56.2915 42.4572 56.2673 43.2466 56.146 45.884C56.0349 48.3214 55.6267 49.6462 55.2855 50.5266C54.8308 51.6938 54.2893 52.5266 53.4144 53.4002C52.5394 54.2738 51.7049 54.8158 50.537 55.2702C49.6565 55.6134 48.3305 56.0194 45.8916 56.1302C43.2549 56.2514 42.4628 56.2756 35.7826 56.2756C29.1024 56.2756 28.3125 56.2514 25.6765 56.1302ZM25.4694 10.9322C22.8064 11.0534 20.9867 11.4754 19.3976 12.0934C17.7518 12.7316 16.3585 13.5878 14.9663 14.977C13.5741 16.3662 12.7195 17.7608 12.081 19.4056C11.4626 20.9948 11.0403 22.8124 10.9191 25.4738C10.7958 28.1394 10.7676 28.9916 10.7676 35.7808C10.7676 42.57 10.7958 43.4222 10.9191 46.0878C11.0403 48.7494 11.4626 50.5668 12.081 52.156C12.7195 53.7998 13.5743 55.196 14.9663 56.5846C16.3583 57.9732 17.7518 58.8282 19.3976 59.4682C20.9897 60.0862 22.8064 60.5082 25.4694 60.6294C28.138 60.7506 28.9893 60.7808 35.7826 60.7808C42.5759 60.7808 43.4286 60.7526 46.0958 60.6294C48.759 60.5082 50.5774 60.0862 52.1676 59.4682C53.8124 58.8282 55.2066 57.9738 56.5989 56.5846C57.9911 55.1954 58.8438 53.7998 59.4842 52.156C60.1026 50.5668 60.5268 48.7492 60.6461 46.0878C60.7674 43.4202 60.7956 42.57 60.7956 35.7808C60.7956 28.9916 60.7674 28.1394 60.6461 25.4738C60.5248 22.8122 60.1026 20.9938 59.4842 19.4056C58.8438 17.7618 57.9889 16.3684 56.5989 14.977C55.2088 13.5856 53.8124 12.7316 52.1696 12.0934C50.5775 11.4754 48.7588 11.0514 46.0978 10.9322C43.4306 10.811 42.5779 10.7808 35.7846 10.7808C28.9913 10.7808 28.138 10.809 25.4694 10.9322Z"
                      fill="url(#paint1_radial_7092_54471)"
                    />
                    <defs>
                      <radialGradient
                        id="paint0_radial_7092_54471"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(17.4144 61.017) scale(65.31 65.2708)"
                      >
                        <stop offset="0.09" stop-color="#FA8F21" />
                        <stop offset="0.78" stop-color="#D82D7E" />
                      </radialGradient>
                      <radialGradient
                        id="paint1_radial_7092_54471"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(41.1086 63.257) scale(51.4733 51.4424)"
                      >
                        <stop
                          offset="0.64"
                          stop-color="#8C3AAA"
                          stop-opacity="0"
                        />
                        <stop offset="1" stop-color="#8C3AAA" />
                      </radialGradient>
                    </defs>
                  </svg>
                </button>
                <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-md shadow-gray-200 group transition-all duration-300">
                  <svg
                    class="rounded-md transition-all duration-300 group-hover:scale-110"
                    width="25"
                    height="25"
                    viewBox="0 0 72 72"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.0065 56.1236H21.4893V35.5227L9.37109 26.4341V52.4881C9.37109 54.4997 11.001 56.1236 13.0065 56.1236Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M50.5732 56.1236H59.056C61.0676 56.1236 62.6914 54.4937 62.6914 52.4881V26.4341L50.5732 35.5227"
                      fill="#34A853"
                    />
                    <path
                      d="M50.5732 19.7693V35.5229L62.6914 26.4343V21.587C62.6914 17.0912 57.5594 14.5282 53.9663 17.2245"
                      fill="#FBBC04"
                    />
                    <path
                      d="M21.4893 35.5227V19.769L36.0311 30.6754L50.5729 19.769V35.5227L36.0311 46.429"
                      fill="#EA4335"
                    />
                    <path
                      d="M9.37109 21.587V26.4343L21.4893 35.5229V19.7693L18.0962 17.2245C14.4971 14.5282 9.37109 17.0912 9.37109 21.587Z"
                      fill="#C5221F"
                    />
                  </svg>
                </button>
                <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-md shadow-gray-200 group transition-all duration-300">
                  <svg
                    class="transition-all duration-300 group-hover:scale-110"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 72 72"
                    fill="none"
                  >
                    <path
                      d="M40.7568 32.1716L59.3704 11H54.9596L38.7974 29.383L25.8887 11H11L30.5205 38.7983L11 61H15.4111L32.4788 41.5869L46.1113 61H61L40.7557 32.1716H40.7568ZM34.7152 39.0433L32.7374 36.2752L17.0005 14.2492H23.7756L36.4755 32.0249L38.4533 34.7929L54.9617 57.8986H48.1865L34.7152 39.0443V39.0433Z"
                      fill="black"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="flex flex-col md:flex-row justify-between font-semibold items-center mt-4 +pt-1 border-t border-white text-sm">
              <p className="hover:text-black transition duration-300 cursor-pointer">
                © 2025 EMS. All rights reserved.
              </p>
              <div className="space-x-4 mt-4 md:mt-0">
                <a
                  href="#"
                  className="hover:text-black transition duration-300 cursor-pointer"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="hover:text-black transition duration-300 cursor-pointer"
                >
                  Legal Notice
                </a>
                <a
                  href="#"
                  className="hover:text-black transition duration-300 cursor-pointer"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
