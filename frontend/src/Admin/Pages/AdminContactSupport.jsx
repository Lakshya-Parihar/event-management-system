import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../Pages/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
const SupportFeedback = () => {
  const [contactus, setContactus] = useState([]);

  useEffect(() => {
    fetchContactus();
  }, []);

  const fetchContactus = async () => {
    try {
      const res = await axios.get(
        "http://localhost/EMS/backend/Admin/fetch_contactus.php"
      );
      setContactus(res.data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
      toast.error("Failed to load contacts.");
    }
  };

  const deleteContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await axios.post(
          "http://localhost/EMS/backend/Admin/delete_contactus.php",
          { id }
        );
        setContactus(contactus.filter((contact) => contact.id !== id));
        toast.success("Message deleted successfully.");
      } catch (err) {
        console.error("Error deleting contact:", err);
        toast.error("Failed to delete message.");
      }
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

      {/* Main Content  */}
      <motion.div
        className="overflow-y-auto p-6 w-4/5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <ToastContainer position="top-right" autoClose={3000} />

        <div className="flex-1 p-8 space-y-10">
          <motion.h1
            className="text-3xl font-bold mb-4 text-center uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Support / Feedback
          </motion.h1>
 
          <motion.div
            whileHover={{ scale: 1.01 }} className="overflow-x-auto bg-white p-6 rounded-xl shadow-md"
          >
            <table className="min-w-full bg-white shadow-md text-center rounded-xl overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 text-sm text-center">
                <tr className="uppercase">
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <AnimatePresence>
                <tbody>
                  {contactus.map((c) => (
                    <motion.tr
                      key={c.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3 }}
                      className="border-t text-sm hover:bg-gray-50"
                    >
                      <td className="p-4">{c.name}</td>
                      <td className="p-4">{c.email}</td>
                      <td className="p-4">{c.phone}</td>
                      <td className="p-4">{c.message}</td>
                      <td className="p-4">{c.created_at}</td>
                      <td className="p-4">
                        <motion.button
                          onClick={() => deleteContact(c.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 shadow-md transition-all"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Delete
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                  {contactus.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center text-gray-500 font-bold uppercase mt-20">
                        No feedback found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </AnimatePresence>
            </table>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SupportFeedback;
