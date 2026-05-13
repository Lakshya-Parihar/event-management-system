import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../Pages/Sidebar";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getAdminIdFromToken = () => {
  const token = localStorage.getItem("adminToken");

  try {
    const decoded = jwtDecode(token);
    return decoded.data?.id || null;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};

const AdminSettings = () => {
  const [currentAdmin, setCurrentAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });

  // const adminId = getAdminIdFromToken();

  const handleUpdateAdmin = async () => {
    const adminId = getAdminIdFromToken();

    try {
      const payload = { id: adminId, ...currentAdmin };
      console.log("Payload:", payload);

      const res = await axios.post(
        "http://localhost/EMS/backend/Admin/update_admin.php",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.data.status === "success") {
        toast.success("Admin Updated Successfully!.");
        
      } else {
        alert("Update failed: " + res.data.message);
      }
    } catch (error) {
      alert("Update failed");
      console.error(error);
    }
  };

  const handleAddAdmin = async () => {
    try {
      const res = await axios.post(
        "http://localhost/EMS/backend/Admin/add_admin.php",
        newAdmin
      );
      if (res.data.status === "success") {
        toast.success("New Admin Added!.");
        setNewAdmin({ name: "", email: "", password: "" });
      } else {
        alert("Add failed: " + res.data.message);
      }
    } catch (error) {
      toast.error("Add failed");
      console.error(error);
    }
  };
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-1/5 bg-white shadow-lg p-6 rounded-r-3xl sticky top-0 self-start min-h-screen"
      >
        <Sidebar />
      </motion.div>

      {/* Content Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="overflow-y-auto p-6 w-4/5"
      >
        <ToastContainer />
        
        <div className="flex-1 p-8 space-y-10">
          <h1 className="text-3xl font-bold text-center">ADMIN SETTINGS</h1>

          {/* Update Current Admin */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 pb-2 overflow-y-auto"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h2 className="text-2xl font-semibold mb-4">
                Edit Current Admin Details
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={currentAdmin.name}
                  onChange={(e) =>
                    setCurrentAdmin({ ...currentAdmin, name: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={currentAdmin.email}
                  onChange={(e) =>
                    setCurrentAdmin({ ...currentAdmin, email: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="New Password (optional)"
                  value={currentAdmin.password}
                  onChange={(e) =>
                    setCurrentAdmin({
                      ...currentAdmin,
                      password: e.target.value,
                    })
                  }
                  className="w-full p-3 border rounded-lg"
                />
                <button
                  onClick={handleUpdateAdmin}
                  className="bg-lime-500 hover:bg-lime-600 text-white px-5 py-2 rounded-lg"
                >
                  Update Admin
                </button>
              </div>
            </motion.div>
          </motion.div>
 
          {/* Add New Admin */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 overflow-y-auto"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h2 className="text-2xl font-semibold mb-4">Add New Admin</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={newAdmin.name}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, name: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={newAdmin.email}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, email: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={newAdmin.password}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, password: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg"
                />
                <button
                  onClick={handleAddAdmin}
                  className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg"
                >
                  Add Admin
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminSettings;
