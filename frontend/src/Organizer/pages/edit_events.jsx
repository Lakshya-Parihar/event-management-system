import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import orgimg from "../images/org-icon.png";
import { ToastContainer, toast } from "react-toastify";
import { Menu, Eye, User, UserCircle2, X } from "lucide-react";
import { FaEdit, FaTrash } from "react-icons/fa";

const EditEvent = () => {
  // Fetch Event Part
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        "http://localhost/EMS/backend/Organizer/get_events_edit.php"
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

  // Delete Event Part
  const handleDeleteEvent = async (eventId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Event?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axios.post(
        "http://localhost/EMS/backend/Organizer/delete_event.php",
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

  const navItems = [
    "DASHBOARD",
    "USERS",
    "ADD EVENTS",
    "EDIT EVENTS",
    "SUPPORT",
    "EDIT PROFILE",
    "LOGOUT",
  ];

  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("EDIT EVENTS");
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

  // Update Event Part Start
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleEditClick = (event) => {
    setEditingEvent(event);
  };

  // const handleUpdateEvent = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(
  //       "http://localhost/EMS/backend/Organizer/update_events.php",
  //       editingEvent
  //     );
  //     if (response.data.success) {
  //       setEvents((prevEvents) =>
  //         prevEvents.map((ev) =>
  //           ev.id === editingEvent.id ? editingEvent : ev
  //         )
  //       );
  //       toast.success("Event updated successfully");
  //       setEditingEvent(null);
  //     } else {
  //       toast.error("Update failed");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("An error occurred");
  //   }
  // };

  // Update Event Part Ends

  // const handleUpdateEvent = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("title", editingEvent.title);
  //   formData.append("category", editingEvent.category);
  //   formData.append("date", editingEvent.date);
  //   formData.append("venue", editingEvent.venue);
  //   formData.append("start_time", editingEvent.start_time);
  //   formData.append("end_time", editingEvent.end_time);
  //   formData.append("capacity", editingEvent.capacity);
  //   formData.append("status", editingEvent.status);
  //   formData.append("short_description", editingEvent.short_description);
  //   formData.append("description", editingEvent.description);

  //   if (imageFile) {
  //     formData.append("image", imageFile);
  //   }

  //   try {
  //     const res = await fetch("http://localhost/EMS/backend/Organizer/update_events.php", {
  //       method: "POST",
  //       body: formData,
  //     });
  //     const result = await res.json();
  //     if (res.ok) {
  //       setEditingEvent(null);
  //       setImageFile(null);
  //       setImagePreview(null);
  //       // Refresh events or show a success message here
  //     } else {
  //       console.error(result.message);
  //     }
  //   } catch (error) {
  //     console.error("Update failed:", error);
  //   }
  // };

  // const handleUpdateEvent = async (e, event) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("id", event.id); // assuming id exists
  //   formData.append("title", event.title);
  //   formData.append("category", event.category);
  //   formData.append("date", event.date);
  //   formData.append("venue", event.venue);
  //   formData.append("start_time", event.start_time);
  //   formData.append("end_time", event.end_time);
  //   formData.append("capacity", event.capacity);
  //   formData.append("status", event.status);
  //   formData.append("short_description", event.short_description);
  //   formData.append("description", event.description);

  //   if (event.newImageFile) {
  //     formData.append("image", event.newImageFile);
  //   }

  //   try {
  //     const response = await fetch(
  //       "http://localhost/EMS/backend/Organizer/update_events.php",
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );

  //     const data = await response.json();
  //     if (data.success) {
  //       alert("Event updated successfully");
  //       setEditingEvent(null);
  //     } else {
  //       alert("Failed to update event");
  //     }
  //   } catch (error) {
  //     console.error("Update failed:", error);
  //     alert("Something went wrong");
  //   }
  // };

  // const handleUpdateEvent = async (e) => {
  //   e.preventDefault();

  //   if (!editingEvent || !editingEvent.id) {
  //     console.error("No event data to update");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("id", editingEvent.id);
  //   formData.append("title", editingEvent.title);
  //   formData.append("category", editingEvent.category);
  //   formData.append("date", editingEvent.date);
  //   formData.append("venue", editingEvent.venue);
  //   formData.append("start_time", editingEvent.start_time);
  //   formData.append("end_time", editingEvent.end_time);
  //   formData.append("capacity", editingEvent.capacity);
  //   formData.append("status", editingEvent.status);
  //   formData.append("short_description", editingEvent.short_description);
  //   formData.append("description", editingEvent.description);

  //   if (editingEvent.newImageFile) {
  //     formData.append("image", editingEvent.newImageFile);
  //   }else{
  //     formData.append("existingimage", editingEvent.image_url);
  //   }

  //   for (let [key, value] of formData.entries()) {
  //     console.log(`${key}:`, value);
  //   }

  //   try {
  //     const response = await fetch(
  //       "http://localhost/EMS/backend/Organizer/update_events.php",
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );

  //     const data = await response.json();
  //     if (data.success) {
  //       alert("Event updated successfully");
  //       setEditingEvent(null);
  //     } else {
  //       alert("Failed to update event");
  //     }
  //   } catch (error) {
  //     console.error("Update failed:", error);
  //     alert("Something went wrong");
  //   }
  // };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();

    if (!editingEvent || !editingEvent.id) {
      console.error("No event data to update");
      return;
    }

    const formData = new FormData();

    formData.append("id", editingEvent.id);
    formData.append("title", editingEvent.title);
    formData.append("category", editingEvent.category);
    formData.append("date", editingEvent.date);
    formData.append("venue", editingEvent.venue);
    formData.append("start_time", editingEvent.start_time);
    formData.append("end_time", editingEvent.end_time);
    formData.append("capacity", editingEvent.capacity);
    formData.append("status", editingEvent.status);
    formData.append("short_description", editingEvent.short_description);
    formData.append("description", editingEvent.description);

    // 👇 FIX: Check for new image file
    if (editingEvent.newImageFile) {
      formData.append("image", editingEvent.newImageFile); // file upload
    } else if (editingEvent.image) {
      formData.append("existingImage", editingEvent.image); // string path
    }

    try {
      const response = await fetch(
        "http://localhost/EMS/backend/Organizer/update_events.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const text = await response.text(); // read response as plain text
      console.log("Raw Response:", text); // see what PHP actually sent

      const data = JSON.parse(text); // try to parse it
      if (data.success) {
        alert("Event updated successfully");
        setEditingEvent(null);
      } else {
        alert("Failed to update event: " + data.message);
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Something went wrong");
    }
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

      {/* Main Content  */}
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
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded"
                            onClick={() => handleEditClick(event)}
                          >
                            <FaEdit className="w-[18px] h-[18px]" />
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white p-3 rounded"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <FaTrash className="w-[18px] h-[18px]" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Edit Event Modal  */}
            {/* <AnimatePresence>
              {editingEvent && (
                <motion.div
                  key="edit-modal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                >
                  <motion.div
                    className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-2xl"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                  >
                    <h2 className="text-xl font-bold mb-4">Edit Event</h2>
                    <form onSubmit={handleUpdateEvent}>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          value={editingEvent.title}
                          onChange={(e) =>
                            setEditingEvent({
                              ...editingEvent,
                              title: e.target.value,
                            })
                          }
                          className="border p-2 rounded"
                          placeholder="Title"
                        />
                        <input
                          value={editingEvent.category}
                          onChange={(e) =>
                            setEditingEvent({
                              ...editingEvent,
                              category: e.target.value,
                            })
                          }
                          className="border p-2 rounded"
                          placeholder="Category"
                        />
                        <input
                          value={editingEvent.date}
                          onChange={(e) =>
                            setEditingEvent({
                              ...editingEvent,
                              date: e.target.value,
                            })
                          }
                          className="border p-2 rounded"
                          placeholder="Date"
                          type="date"
                        />
                        <input
                          value={editingEvent.venue}
                          onChange={(e) =>
                            setEditingEvent({
                              ...editingEvent,
                              venue: e.target.value,
                            })
                          }
                          className="border p-2 rounded"
                          placeholder="Venue"
                        />
                        <input
                          value={editingEvent.start_time}
                          onChange={(e) =>
                            setEditingEvent({
                              ...editingEvent,
                              start_time: e.target.value,
                            })
                          }
                          className="border p-2 rounded"
                          type="time"
                          placeholder="Start Time"
                        />
                        <input
                          value={editingEvent.end_time}
                          onChange={(e) =>
                            setEditingEvent({
                              ...editingEvent,
                              end_time: e.target.value,
                            })
                          }
                          className="border p-2 rounded"
                          type="time"
                          placeholder="End Time"
                        />
                        <input
                          value={editingEvent.capacity}
                          onChange={(e) =>
                            setEditingEvent({
                              ...editingEvent,
                              capacity: e.target.value,
                            })
                          }
                          className="border p-2 rounded"
                          placeholder="Capacity"
                        />
                        <select
                          value={editingEvent.status}
                          onChange={(e) =>
                            setEditingEvent({
                              ...editingEvent,
                              status: e.target.value,
                            })
                          }
                          className="border p-2 rounded"
                        >
                          <option value="upcoming">upcoming</option>
                          <option value="publish">publish</option>
                        </select>
                      </div>

                      <textarea
                        value={editingEvent.short_description}
                        onChange={(e) =>
                          setEditingEvent({
                            ...editingEvent,
                            short_description: e.target.value,
                          })
                        }
                        className="w-full mt-4 border p-2 rounded"
                        placeholder="Short Description"
                      />

                      <textarea
                        value={editingEvent.description}
                        onChange={(e) =>
                          setEditingEvent({
                            ...editingEvent,
                            description: e.target.value,
                          })
                        }
                        className="w-full mt-4 border p-2 rounded"
                        placeholder="Full Description"
                      />

                      <div className="flex justify-end space-x-4 mt-6">
                        <button
                          type="button"
                          className="text-gray-500"
                          onClick={() => setEditingEvent(null)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                        >
                          Update Event
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence> */}
            <AnimatePresence>
              {editingEvent && (
                <motion.div
                  key="edit-modal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                >
                  <motion.div
                    className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-2xl"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                  >
                    <h2 className="text-xl font-bold mb-2">Edit Event</h2>
                    <form onSubmit={handleUpdateEvent}>
                      <div className="grid grid-cols-2 gap-4">
                        {/* Image Upload Section */}
                        <motion.div
                          className="col-span-2 gap-3 flex space-y-2"
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div
                            className="w-40 h-28 border rounded-lg overflow-hidden bg-gray-100 flex items-center text-center justify-center"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {imagePreview || editingEvent.image_url ? (
                              <img
                                src={imagePreview || editingEvent.image_url}
                                alt="Event"
                                className="w-20 h-20 object-cover"
                              />
                            ) : (
                              <span className="text-gray-400">
                                No Image Available
                              </span>
                            )}
                          </motion.div>

                          <motion.input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                setImageFile(file);
                                setEditingEvent((prev) => ({
                                  ...prev,
                                  newImageFile: file,
                                }));
                                const reader = new FileReader();
                                reader.onloadend = () =>
                                  setImagePreview(reader.result);
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="border w-full mb-2 p-2 rounded"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          />
                        </motion.div>

                        {/* Form Fields */}
                        <input
                          value={editingEvent.title}
                          onChange={(e) =>
                            setEditingEvent({
                              ...editingEvent,
                              title: e.target.value,
                            })
                          }
                          className="border p-2 rounded"
                          placeholder="Title"
                        />
                        <input
                          value={editingEvent.category}
                          onChange={(e) =>
                            setEditingEvent({
                              ...editingEvent,
                              category: e.target.value,
                            })
                          }
                          className="border p-2 rounded"
                          placeholder="Category"
                        />
                        <input
                          value={editingEvent.date}
                          onChange={(e) =>
                            setEditingEvent({
                              ...editingEvent,
                              date: e.target.value,
                            })
                          }
                          className="border p-2 rounded"
                          type="date"
                          placeholder="Date"
                        />
                        <input
                          value={editingEvent.venue}
                          onChange={(e) =>
                            setEditingEvent({
                              ...editingEvent,
                              venue: e.target.value,
                            })
                          }
                          className="border p-2 rounded"
                          placeholder="Venue"
                        />
                        <input
                          value={editingEvent.start_time}
                          onChange={(e) =>
                            setEditingEvent({
                              ...editingEvent,
                              start_time: e.target.value,
                            })
                          }
                          className="border p-2 rounded"
                          type="time"
                          placeholder="Start Time"
                        />
                        <input
                          value={editingEvent.end_time}
                          onChange={(e) =>
                            setEditingEvent({
                              ...editingEvent,
                              end_time: e.target.value,
                            })
                          }
                          className="border p-2 rounded"
                          type="time"
                          placeholder="End Time"
                        />
                        <input
                          value={editingEvent.capacity}
                          onChange={(e) =>
                            setEditingEvent({
                              ...editingEvent,
                              capacity: e.target.value,
                            })
                          }
                          className="border p-2 rounded"
                          placeholder="Capacity"
                        />
                        <select
                          value={editingEvent.status}
                          onChange={(e) =>
                            setEditingEvent({
                              ...editingEvent,
                              status: e.target.value,
                            })
                          }
                          className="border p-2 rounded"
                        >
                          <option value="upcoming">upcoming</option>
                          <option value="publish">publish</option>
                        </select>
                      </div>
                      <textarea
                        value={editingEvent.short_description}
                        onChange={(e) =>
                          setEditingEvent({
                            ...editingEvent,
                            short_description: e.target.value,
                          })
                        }
                        rows={1}
                        className="w-full mt-4 border p-2 rounded"
                        placeholder="Short Description"
                      />

                      <textarea
                        value={editingEvent.description}
                        onChange={(e) =>
                          setEditingEvent({
                            ...editingEvent,
                            description: e.target.value,
                          })
                        }
                        className="w-full mt-4 border p-2 rounded"
                        placeholder="Full Description"
                      />
                      <div className="flex justify-end space-x-4 mt-6">
                        <button
                          type="button"
                          className="text-gray-500"
                          onClick={() => setEditingEvent(null)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                        >
                          Update Event
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Delete Event modal */}
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

export default EditEvent;
