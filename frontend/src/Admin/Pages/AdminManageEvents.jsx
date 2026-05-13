import React, { useState, useEffect } from "react";
import { Eye, User, UserCircle2, X } from "lucide-react";
import Sidebar from "../Pages/Sidebar";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
const AdminManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        "http://localhost/EMS/backend/Admin/get_events.php"
      );
      if (res.data.success) {
        setEvents(res.data.events);
      } else {
        toast.error("No Events Found");
      }
    } catch (error) {
      console.error("Error fetching Events:", error);
      toast.error("No Events Found");
    }
  };

  const handleDeleteEvent = async (eventId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Event?"
    );
    if (!confirmDelete) return;
 
    try {
      const res = await axios.post(
        "http://localhost/EMS/backend/Admin/delete_event.php",
        { id: eventId }
      );
      if (res.data.success) {
        toast.success("Event deleted successfully!");
        fetchEvents();
      } else {
        toast.error("Failed to delete Event.");
      }
    } catch (error) {
      console.error(
        "Error deleting Event:",
        error.response?.event || error.message
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

        <h1 className="text-3xl font-bold mb-6 text-center">MANAGE EVENTS</h1>

        {events.length === 0 ? (
          <p className="text-gray-500 text-center font-bold uppercase mt-20">
            No Events found.
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
                    <th className="p-4">TITLE</th>
                    <th className="p-4">IMAGE</th>
                    <th className="p-4">SHORT DESCRIPTION</th>
                    <th className="p-4">DATE</th>
                    <th className="p-4">CATEGORY</th>
                    <th className="p-4">VENUE</th>
                    <th className="p-4">STATUS</th>
                    <th className="p-4">VIEW</th>
                    <th className="p-4">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, index) => (
                    <motion.tr
                      key={index}
                      className="border-t text-sm hover:bg-gray-50"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="p-4">{event.title}</td>
                      <td className="p-4">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-28 h-20 object-cover rounded-lg shadow-sm"
                        />
                      </td>
                      <td className="p-4">{event.short_description}</td>
                      <td className="p-4">{event.date}</td>
                      <td className="p-4">{event.category}</td>
                      <td className="p-4">{event.venue}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            event.status === "publish"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {event.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <motion.button
                          whileHover={{ scale: 1.3 }}
                          onClick={() => setSelectedEvent(event)}
                        >
                          <Eye className="w-5 h-5 text-purple-500" />
                        </motion.button>
                      </td>
                      <td className="p-4">
                        {" "}
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
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
              {selectedEvent && (
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
                      onClick={() => setSelectedEvent(null)}
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div className="flex items-center space-x-4 mb-6">
                      <img
                        src={selectedEvent.image}
                        alt={selectedEvent.title}
                        className="w-24 h-20 object-cover rounded-lg shadow-sm"
                      />
                      <div>
                        <h2 className="text-xl font-bold">
                          {selectedEvent.title}
                        </h2>
                        <p className="text-sm text-gray-800 mt-2">
                          {selectedEvent.short_description}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 text-sm">
                      <div>
                        <strong>Date:</strong> {selectedEvent.date}
                      </div>
                      <div>
                        <strong>Venue:</strong> {selectedEvent.venue}
                      </div>
                      <div>
                        <strong>Category:</strong> {selectedEvent.category}
                      </div>
                      <div>
                        <strong>Description:</strong>{" "}
                        {selectedEvent.description}
                      </div>
                      <div>
                        <strong>Status:</strong> {selectedEvent.status}
                      </div>
                    </div>
                    <div className="mt-6 text-right">
                      <motion.button onClick={() => setSelectedEvent(null)}>
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

export default AdminManageEvents;
