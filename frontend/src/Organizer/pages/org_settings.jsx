import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import orgimg from "../images/org-icon.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Menu, Eye, User, UserCircle2, X } from "lucide-react";
import { FiUser, FiMail, FiPhone, FiHome, FiLock } from "react-icons/fi";

const navItems = [
  "DASHBOARD",
  "USERS",
  "ADD EVENTS",
  "EDIT EVENTS",
  "SUPPORT",
  "EDIT PROFILE",
  "LOGOUT",
];

export default function OrgEditProfile() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("EDIT PROFILE");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [orgname, setOrgname] = useState("");

  useEffect(() => {
    const storedOrg = JSON.parse(localStorage.getItem("org"));
    if (storedOrg && storedOrg.name) {
      setOrgname(storedOrg.name);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("org");
    navigate("/");
  };

  const [activeSection, setActiveSection] = useState("Account Information");

  //   Fetch Users Part
  const [org, setOrg] = useState({
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

  const fetchOrgs = async () => {
    const storedOrg = JSON.parse(localStorage.getItem("org"));
    const OrgId = storedOrg?.id;
    if (!OrgId) return;

    fetch(`http://localhost/EMS/backend/Organizer/update_user.php?id=${OrgId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setOrg({ ...data.org, id: OrgId });
        } else {
          console.error("Failed to fetch organizers data:", data.message);
        }
      })
      .catch((err) => console.error("Error fetching Organizer:", err));
  };

  useEffect(() => {
    fetchOrgs();
  }, []);

  //   Fetch Users End

  // Updates part start
  const handleUpdate = async () => {
    const { name, email, phone, city, state } = org;

    if (!name || !email || !phone || !city || !state) {
      toast.error("All fields are required.");
      return;
    }

    const storedOrg = JSON.parse(localStorage.getItem("org"));
    const OrgId = storedOrg?.id;
    if (!OrgId) {
      toast.error("Organizer not found.");
      return;
    }

    const updatedOrg = { ...org, id: OrgId };

    const res = await fetch(
      "http://localhost/EMS/backend/Organizer/update_user.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedOrg),
      }
    );

    const result = await res.json();
    if (result.status === "success") {
      toast.success(result.message || "Profile updated successfully!");

      // Update localStorage and username shown in the navbar
      const updatedLocalOrg = { ...storedOrg, name: updatedOrg.name };
      localStorage.setItem("org", JSON.stringify(updatedLocalOrg));
      setOrgname(updatedOrg.name);
    } else {
      toast.error(result.message || "Failed to update profile.");
    }

    setOrg({
      id: OrgId,
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

    const storedOrg = JSON.parse(localStorage.getItem("org"));
    const OrgId = storedOrg?.id;
    if (!OrgId) {
      toast.error("Org ID not found.");
      return;
    }

    const res = await fetch(
      "http://localhost/EMS/backend/Organizer/update_user.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: OrgId,
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
    setOrg({ ...org, [e.target.name]: e.target.value });
  };
  // updates part end

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-white to-violet-100 text-gray-900 font-sans">
      {/* Sidebar  */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="md:sticky top-0 fixed z-20 md:z-auto md:w-72 text-center bg-black text-white rounded-r-2xl p-4 shadow-lg h-screen"
      >
        <h1 className="text-2xl font-semibold mt-10 mb-6">
          <img
            src={orgimg}
            alt="User"
            className="rounded-full bg-white w-20 h-20 mx-auto p-2"
          />
          <h2 className="text-lg font-semibold mt-2">{orgname}</h2>
          <span className="text-sm text-white uppercase">Ahmedabad, India</span>
        </h1>
        <nav className="space-y-4">
          {navItems.map((item) => (
            <motion.button
              key={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (item === "ADD EVENTS") {
                  navigate("/org/add-events");
                } else if (item === "LOGOUT") {
                  logout();
                } else if (item === "DASHBOARD") {
                  navigate("/org/dashboard");
                } else if (item === "USERS") {
                  navigate("/org/users");
                } else if (item === "EDIT EVENTS") {
                  navigate("/org/edit-events");
                } else if (item === "SUPPORT") {
                  navigate("/org/contacts");
                } else if (item === "EDIT PROFILE") {
                  navigate("/org/edit-profile");
                } else {
                  setActiveItem(item);
                }
              }}
              className={`w-full text-left px-4 py-2 rounded-lg border transition font-medium ${
                activeItem === item
                  ? "bg-white text-black"
                  : "hover:bg-white hover:text-black"
              }`}
            >
              {item}
            </motion.button>
          ))}
        </nav>
      </motion.aside>

      {/* Main content */}
      <div className="min-h-screen w-full flex flex-col lg:flex-row bg-gradient-to-br from-white via-gray-100 to-gray-200 p-6">
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
                    {orgname}
                  </h3>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    label: "Full Name",
                    value: org.name,
                    field: "name",
                    icon: <FiUser />,
                  },
                  {
                    label: "Email Address",
                    value: org.email,
                    field: "email",
                    icon: <FiMail />,
                  },
                  {
                    label: "Phone Number",
                    value: org.phone,
                    field: "phone",
                    icon: <FiPhone />,
                  },
                  {
                    label: "City",
                    value: org.city,
                    field: "city",
                    icon: <FiHome />,
                  },
                  {
                    label: "State",
                    value: org.state,
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
    </div>
  );
}
