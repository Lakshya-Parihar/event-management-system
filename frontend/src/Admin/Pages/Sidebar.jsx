import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import adminimg from "../Images/Admin-img.jpg";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Sidebar = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin");
    } else {
      try {
        const decoded = jwtDecode(token);
        setAdmin(decoded.data);
      } catch (e) {
        navigate("/admin");
      }
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  const handleNavigation = (item) => {
    switch (item) {
      case "Dashboard":
        navigate("/admin/dashboard");
        break;
      case "Manage Users":
        navigate("/admin/manage-users");
        break;
      case "Settings & Admin Control":
        navigate("/admin/settings");
        break;
      case "Support / Feedback":
        navigate("/admin/support-contact");
        break;
      case "Manage Organizers":
        navigate("/admin/manage-orgs");
        break;
      case "Manage Events":
        navigate("/admin/manage-events");
        break;
      // Add more cases here for other sidebar items
      default:
        console.warn("No route defined for", item);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 h-auto bg-white shadow-md">
      <div className="mb-10 text-center">
        <img
          src={adminimg}
          alt="User"
          className="rounded-full w-16 h-16 mx-auto"
        />
        <h2 className="text-lg text-black font-semibold mt-2 uppercase">
          {admin?.username}
        </h2>
        <p className="text-sm text-gray-500 uppercase">Ahmedabad, India</p>
      </div>

      <nav className="space-y-4 w-full">
        {[
          "Dashboard",
          "Manage Users",
          "Manage Organizers",
          "Manage Events",
          "Manage Ticket",
          "Support / Feedback",
          "Settings & Admin Control",
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="px-4 py-2 font-medium rounded-xl cursor-pointer bg-gradient-to-r from-white to-white hover:from-lime-100 hover:via-lime-300 hover:to-lime-100 shadow uppercase"
            onClick={() => handleNavigation(item)}
          >
            {item}
          </motion.div>
        ))}
      </nav>
        <button
          className="px-4 py-2 mt-4 bg-white text-blue-600 rounded-xl font-semibold shadow hover:scale-105 transition"
          onClick={logout}
        >
          LOGOUT
        </button>
    </div>
  );
};

export default Sidebar;
