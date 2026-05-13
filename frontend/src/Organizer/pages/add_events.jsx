import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import orgimg from "../images/org-icon.png";
import { ToastContainer, toast } from "react-toastify";
import {
  CalendarIcon,
  ClockIcon,
  PaperclipIcon,
  UsersIcon,
  Menu,
  Eye,
  User,
  UserCircle2,
  X,
} from "lucide-react";

const AddEvent = () => {

  const [formData, setFormData] = useState({
    title: "",
    short_description: "",
    image: null,
    venue: "",
    date: "",
    category: "",
    description: "",
    capacity: "",
    starttime: "",
    endtime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (action) => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("short_description", formData.short_description);
    data.append("image", formData.image); // this is the file
    data.append("venue", formData.venue);
    data.append("category", formData.category);
    data.append("date", formData.date);
    data.append("description", formData.description);
    data.append("capacity", formData.capacity);
    data.append("start_time", formData.starttime); // fixed
    data.append("end_time", formData.endtime); // fixed
    data.append("status", action); // upcoming or publish

    fetch("http://localhost/EMS/backend/Organizer/add_event.php", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Response from server:", response);
        if (response.success) {
          toast.success("Event added successfully!");

          setFormData({
            title: "",
            short_description: "",
            image: null,
            venue: "",
            date: "",
            category: "",
            description: "",
            capacity: "",
            starttime: "",
            endtime: "",
          });

        } else {
          toast.error("Failed To Add Event.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Something went wrong!");
      });
  };

  const inputStyle =
    "w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400";

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
  const [activeItem, setActiveItem] = useState("ADD EVENTS");
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
        transition={{ duration: 0.6 }}
        className="p-6 w-full md:w-5/6 lg:w-4/5 mx-auto bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl mt-10 mb-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(173, 216, 230, 0.3))",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <ToastContainer position="top-right" autoClose={3000} />

        <h1 className="text-3xl font-bold text-center uppercase mb-6">
          Create New Event
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-semibold">Event Name</label>
            <input
              type="text"
              name="title"
              className={inputStyle}
              placeholder="Event Title/Name of Event"
              value={formData.title}
              onChange={handleChange}
            />

            <div>
              <label className="block mb-2 font-semibold gap-4 mt-4">
                Event Date
              </label>
              <input
                type="date"
                name="date"
                className={inputStyle}
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block mb-2 font-semibold">Start Time</label>
                <input
                  type="time"
                  name="starttime"
                  className={inputStyle}
                  value={formData.starttime}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">End Time</label>
                <input
                  type="time"
                  name="endtime"
                  className={inputStyle}
                  value={formData.endtime}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="block mb-2 font-semibold">Venue</label>
              <input
                type="text"
                name="venue"
                placeholder="Venue"
                className={inputStyle}
                value={formData.venue}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-4">
              <label className="block mb-2 font-semibold">Add Image</label>
              <div className="flex items-center gap-2">
                <PaperclipIcon className="text-gray-500" />
                <input
                  type="file"
                  name="image"
                  className={inputStyle}
                  onChange={handleFileChange}
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Short Description
            </label>
            <textarea
              type="text"
              name="short_description"
              placeholder="Short Description"
              rows={1}
              className={inputStyle}
              value={formData.short_description}
              onChange={handleChange}
              required
            />

            <label className="block mb-2 font-semibold mt-6">
              Full Description About Event
            </label>
            <textarea
              name="description"
              placeholder="Event Description"
              className={`${inputStyle}`}
              rows={5}
              value={formData.description}
              onChange={handleChange}
              required
            />

            <div className="mt-4">
              <label className="block mb-2 font-semibold">Category</label>
              <input
                type="text"
                name="category"
                placeholder="Category"
                className={inputStyle}
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-6">
              <label className="block mb-2 font-semibold">
                Maximum Capacity
              </label>
              <div className="flex items-center gap-2">
                <UsersIcon />
                <input
                  type="text"
                  name="capacity"
                  placeholder="Max Capacity"
                  className={inputStyle}
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-3 mt-6">
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#facc15" }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => handleSubmit("upcoming")}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded-xl font-semibold shadow-md"
          >
            Mark as Upcoming
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#22c55e" }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => handleSubmit("publish")}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-semibold shadow-md"
          >
            Publish Event
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AddEvent;
