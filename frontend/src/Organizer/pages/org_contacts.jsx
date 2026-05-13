import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import orgimg from "../images/org-icon.png";
import { ToastContainer, toast } from "react-toastify";
import { Menu, Eye, User, UserCircle2, X } from "lucide-react";

const navItems = [
  "DASHBOARD",
  "USERS",
  "ADD EVENTS",
  "EDIT EVENTS",
  "SUPPORT",
  "EDIT PROFILE",
  "LOGOUT",
];

export default function OrgContacts() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("SUPPORT");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [orgname, setOrgname] = useState("");

  useEffect(() => {
    const storedOrg = JSON.parse(localStorage.getItem("org"));
    if (storedOrg && storedOrg.name) {
      setOrgname(storedOrg.name);
    }
  }, []);

  //   Fetch Contactus Part Start
  const [contactus, setContactus] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

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
  //   Fetch Contactus Part End

  const logout = () => {
    localStorage.removeItem("org");
    navigate("/");
  };

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-4/5 p-8 overflow-y-auto"
      >
        <ToastContainer position="top-right" autoClose={3000} />

        <h1 className="text-3xl font-bold mb-6 text-center">
          SUPPORT / FEEDBACK
        </h1>

        {contactus.length === 0 ? (
          <p className="text-gray-500 text-center font-bold uppercase mt-20">
            No Feedback found.
          </p>
        ) : (
          <>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className=" bg-white p-6 rounded-xl shadow-md"
            >
              <table className="min-w-full bg-white shadow-md text-center rounded-xl overflow-hidden">
                <thead className="bg-gray-100 text-gray-700 text-sm text-center">
                  <tr>
                    <th className="p-4">NAME</th>
                    <th className="p-4">CONTACT</th>
                    <th className="p-4">EMAIL</th>
                    <th className="p-4">MESSAGE</th>
                    <th className="p-4">VIEW</th>
                  </tr>
                </thead>
                <tbody>
                  {contactus.map((contact, index) => (
                    <motion.tr
                      key={index}
                      className="border-t text-sm hover:bg-gray-50"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="p-4">{contact.name}</td>
                      <td className="p-4">{contact.phone}</td>
                      <td className="p-4">{contact.email}</td>
                      <td className="p-4">{contact.message}</td>
                      <td className="p-4">
                        <motion.button
                          whileHover={{ scale: 1.3 }}
                          onClick={() => setSelectedContact(contact)}
                        >
                          <Eye className="w-5 h-5 text-purple-500" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            <AnimatePresence>
              {selectedContact && (
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
                      onClick={() => setSelectedContact(null)}
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div className="flex items-center space-x-4 mb-6">
                      <div>
                        <h2 className="text-xl font-bold">
                          {selectedContact.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {selectedContact.email}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 text-sm">
                      <div>
                        <strong>Phone:</strong> {selectedContact.phone}
                      </div>
                      <div>
                        <strong>Message:</strong> {selectedContact.message}
                      </div>
                    </div>
                    <div className="mt-6 text-right">
                      <motion.button onClick={() => setSelectedContact(null)}>
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
}
