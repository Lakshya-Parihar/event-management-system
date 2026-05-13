import React, { useState, useEffect } from "react";
import { Eye, User, UserCircle2, X } from "lucide-react";
import Sidebar from "../Pages/Sidebar";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost/EMS/backend/Admin/get_users.php"
      );
      if (res.data.success) {
        setUsers(res.data.users);
      } else {
        toast.error("No Users Found");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("No Users Found");
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axios.post(
        "http://localhost/EMS/backend/Admin/delete_user.php",
        { id: userId }
      );
      if (res.data.success) {
        toast.success("User deleted successfully!");
        fetchUsers();
      } else {
        toast.error("Failed to delete user.");
      }
    } catch (error) {
      console.error(
        "Error deleting user:",
        error.response?.data || error.message
      );
      toast.error("An error occurred while deleting.");
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

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-4/5 p-8 overflow-y-auto"
      >
        <ToastContainer position="top-right" autoClose={3000} />
 
        <h1 className="text-3xl font-bold mb-6 text-center">MANAGE USERS</h1>
        
        {users.length === 0 ? (
          <p className="text-gray-500 text-center font-bold uppercase mt-20">No users found.</p>
        ) : (
          <>
            <motion.div whileHover={{ scale: 1.01 }} className=" bg-white p-6 rounded-xl shadow-md">
              <table className="min-w-full bg-white shadow-md text-center rounded-xl overflow-hidden">
                <thead className="bg-gray-100 text-gray-700 text-sm text-center">
                  <tr>
                    <th className="p-4">GENDER</th>
                    <th className="p-4">NAME</th>
                    <th className="p-4">CONTACT</th>
                    <th className="p-4">EMAIL</th>
                    <th className="p-4">STATUS</th>
                    <th className="p-4">CITY</th>
                    <th className="p-4">STATE</th>
                    <th className="p-4">VIEW</th>
                    <th className="p-4">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <motion.tr
                      key={index}
                      className="border-t text-sm hover:bg-gray-50"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="p-4">
                        {user.gender === "male" ? (
                          <User className="w-6 h-6 text-blue-600" />
                        ) : (
                          <UserCircle2 className="w-6 h-6 text-pink-500" />
                        )}
                      </td>
                      <td className="p-4">{user.name}</td>
                      <td className="p-4">{user.phone}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="p-4">{user.city}</td>
                      <td className="p-4">{user.state}</td>
                      <td className="p-4">
                        <motion.button
                          whileHover={{ scale: 1.3 }}
                          onClick={() => setSelectedUser(user)}
                        >
                          <Eye className="w-5 h-5 text-purple-500" />
                        </motion.button>
                      </td>
                      <td className="p-4">
                        {" "}
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded-lg"
                        >
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            <AnimatePresence>
              {selectedUser && (
                <motion.div
                  key="modal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                >
                  <motion.div
                    className="bg-white rounded-xl p-6 shadow-lg w-[90%] max-w-lg relative"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <button
                      className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                      onClick={() => setSelectedUser(null)}
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div className="flex items-center space-x-4 mb-6">
                      {selectedUser.gender === "male" ? (
                        <User className="w-16 h-16 text-blue-600" />
                      ) : (
                        <UserCircle2 className="w-16 h-16 text-pink-500" />
                      )}
                      <div>
                        <h2 className="text-xl font-bold">
                          {selectedUser.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {selectedUser.email}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 text-sm">
                      <div>
                        <strong>Phone:</strong> {selectedUser.phone}
                      </div>
                      <div>
                        <strong>Status:</strong> {selectedUser.status}
                      </div>
                      <div>
                        <strong>City:</strong> {selectedUser.city}
                      </div>
                      <div>
                        <strong>State:</strong> {selectedUser.state}
                      </div>
                    </div>
                    <div className="mt-6 text-right">
                      <motion.button onClick={() => setSelectedUser(null)}>
                        Close
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AdminManageUsers;
