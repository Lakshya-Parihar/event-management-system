import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import orgimg from "./images/org-icon.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Menu,
  Users,
  Briefcase,
  UserPlus,
  UserCheck,
  CalendarDays,
  Sparkles,
} from "lucide-react";

const navItems = [
  "DASHBOARD",
  "USERS",
  "ADD EVENTS",
  "EDIT EVENTS",
  "SUPPORT",
  "EDIT PROFILE",
  "LOGOUT",
];

const cardIcons = {
  "Total Users": Users,
  "Featured Events": Briefcase,
  "Upcoming Events": UserPlus,
  "Support / Feedback": UserCheck,
};

const initialNotes = {};

export default function OrgDashboard() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("DASHBOARD");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notes, setNotes] = useState(initialNotes);
  const [newNote, setNewNote] = useState("");

  // Events Part Start
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch Featured Events
        const featuredRes = await axios.post(
          "http://localhost/EMS/backend/Organizer/get_events_dash.php",
          { status: "publish" }
        );
        setFeaturedEvents(featuredRes.data);

        // Fetch Upcoming Events
        const upcomingRes = await axios.post(
          "http://localhost/EMS/backend/Organizer/get_events_dash.php",
          { status: "upcoming" }
        );
        setUpcomingEvents(upcomingRes.data);
      } catch (err) {
        console.error("Failed to fetch events", err);
      }
    };

    fetchEvents();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  const groupInPairs = (events) => {
    const pairs = [];
    for (let i = 0; i < events.length; i += 2) {
      pairs.push([events[i], events[i + 1]]);
    }
    return pairs;
  };
  // Events Part End

  // Active Login Org Start
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
  // Active Login Org End

  // Users Part Start
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost/EMS/backend/Organizer/get_users.php"
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
  // Users Part Ends

  // Contact Part Starts
  const [contact, setContact] = useState([]);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const res = await axios.get(
        "http://localhost/EMS/backend/Organizer/get_contacts.php"
      );
      setContact(res.data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
      toast.error("Failed to load contacts.");
    }
  };
  // Contact Part Ends

  // ToDo Part Start
  const getDateKey = (date) => date.toISOString().split("T")[0];
  const dateKey = getDateKey(selectedDate);

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    setNotes((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newNote],
    }));
    setNewNote("");
  };
  // ToDo Part Ends

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
      <main className="flex-1 p-4 md:ml-0 md:mt-0 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 flex justify-between items-center"
        >
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-full bg-white/70 backdrop-blur-sm shadow"
            >
              <Menu className="h-5 w-5 text-black" />
            </button>
            <h2 className="text-3xl font-bold">{activeItem}</h2>
          </div>
        </motion.div>
        <ToastContainer position="top-right" autoClose={3000} />

        {activeItem.toUpperCase() === "DASHBOARD" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { title: "Total Users", value: users.length },
                { title: "Featured Events", value: featuredEvents.length },
                { title: "Upcoming Events", value: upcomingEvents.length },
                { title: "Support / Feedback", value: contact.length },
              ].map(({ title, value }) => {
                const Icon = cardIcons[title];
                return (
                  <motion.div
                    key={title}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-2xl bg-white/40 backdrop-blur-md border border-white/20 shadow hover:shadow-lg transition duration-300"
                  >
                    <div className="p-4 flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600 font-medium">
                          {title}
                        </p>
                        <motion.div
                          className="text-violet-600"
                          whileHover={{ rotate: 20 }}
                          transition={{ duration: 0.4 }}
                        >
                          <Icon className="h-5 w-5" />
                        </motion.div>
                      </div>
                      <p className="text-2xl font-bold">{value}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Events Part  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Upcoming Events */}
              <div className="bg-white p-5 rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                  <CalendarDays className="text-purple-500" /> Upcoming Events
                </h2>
                {upcomingEvents.length === 0 ? (
                  <p className="text-gray-500 text-center font-bold uppercase mt-20">
                    No Events found.
                  </p>
                ) : (
                  upcomingEvents.map((event, index) => (
                    <motion.div
                      key={index}
                      className="p-4 bg-gray-100 rounded-xl shadow-sm mb-4 w-full"
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={cardVariants}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-indigo-600">
                          {event.title}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {event.date}
                        </span>
                      </div>
                      <p className="text-sm mt-2 text-gray-700">
                        {event.short_description}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-medium">Venue:</span>{" "}
                        {event.venue}
                      </p>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Featured Events  */}
              <div className="bg-white p-5 rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                  <Sparkles className="text-yellow-500" /> Featured Events
                </h2>
              {featuredEvents.length === 0 ? (
                  <p className="text-gray-500 text-center font-bold uppercase mt-20">
                    No Events found.
                  </p>
                ) : (
                featuredEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-gray-100 rounded-xl shadow-sm mb-4"
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-indigo-600">
                        {event.title}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {event.date}
                      </span>
                    </div>
                    <p className="text-sm mt-2 text-gray-700">
                      {event.short_description}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-medium">Venue:</span> {event.venue}
                    </p>
                  </motion.div>
                ))
              )}
              </div>
            </div>

            {/* TO DO Part  */}
            <div className="rounded-2xl bg-white/40 backdrop-blur-md border border-white/20 p-4 shadow hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-2">
                To-Do / Notes for {dateKey}
              </h3>
              <ul className="text-sm">
                {(notes[dateKey] || []).map((note, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="mb-2 p-2 rounded bg-yellow-100 text-yellow-900"
                  >
                    {note}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add new note or task"
                  className="flex-1 p-2 rounded-lg border border-gray-300"
                />
                <button
                  onClick={handleAddNote}
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg"
                >
                  Add
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
