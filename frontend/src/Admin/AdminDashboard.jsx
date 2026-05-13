import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Pages/Sidebar";
import { FaUsers, FaUserTie, FaCalendarAlt, FaComments } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const DashboardCard = ({ title, count }) => {
  const iconMap = {
    Users: <FaUsers className="text-4xl text-blue-600" />,
    Organizers: <FaUserTie className="text-4xl text-green-600" />,
    "Total Events": <FaCalendarAlt className="text-4xl text-purple-600" />,
    "Support/Feedback": <FaComments className="text-4xl text-pink-600" />,
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-2xl shadow text-center"
    >
      <div className="flex justify-center items-center mb-4">
        {iconMap[title] || <FaUsers className="text-4xl text-gray-600" />}
      </div>
      <div className="mb-2 text-xl font-semibold">{title}</div>
      {count !== undefined && (
        <p className="text-lg font-bold text-gray-700">{count}</p>
      )}
      <p className="text-sm text-gray-500 mt-1">Mikal andhbhaat</p>
    </motion.div>
  );
};

const ToDoCard = () => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white p-6 rounded-2xl shadow"
  >
    <h3 className="text-lg font-bold mb-4">To do list</h3>
    <div className="mb-2 p-4 bg-black text-white rounded-xl">
      <p>Create a digital logo for a small business</p>
      <p className="text-xs mt-1">Low - David Wilson</p>
    </div>
    <div className="p-4 bg-blue-100 rounded-xl">
      <p>Design a packaging concept for a new product</p>
      <p className="text-xs mt-1">High - Rachel Lee</p>
    </div>
  </motion.div>
);

const AssignmentCard = () => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white p-6 rounded-2xl shadow"
  >
    <h3 className="text-lg font-bold mb-4">My assignments</h3>
    <div className="mb-4">
      <p>Graphic test</p>
      <p className="text-sm text-gray-500">
        25 March, 10:30 AM | Duration: 2h 45m
      </p>
      <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
        <div
          className="bg-lime-400 h-2 rounded-full"
          style={{ width: "90%" }}
        ></div>
      </div>
    </div>
    <div>
      <p>Market research test</p>
      <p className="text-sm text-gray-500">
        14 April, 12:30 AM | Duration: 4h 15m
      </p>
      <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
        <div
          className="bg-yellow-300 h-2 rounded-full"
          style={{ width: "50%" }}
        ></div>
      </div>
    </div>
  </motion.div>
);

const ScheduleCard = () => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white p-6 rounded-2xl shadow"
  >
    <h3 className="text-lg font-bold mb-4">April 2021</h3>
    <p className="mb-2">19 April - Team meeting 10:30–12:00</p>
    <p>19 April - Meeting with supervisor 12:30–13:10</p>
  </motion.div>
);

const NotificationCard = () => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white p-6 rounded-2xl shadow"
  >
    <h3 className="text-lg font-bold mb-4">Notifications</h3>
    <p className="text-sm text-gray-500">Upcoming event</p>
    <p className="font-semibold mt-1">
      Product design meeting - 20 April, 11AM
    </p>
  </motion.div>
);

const BoardMeetingCard = () => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white p-6 rounded-2xl shadow"
  >
    <h3 className="text-lg font-bold mb-4">Board meeting</h3>
    <p>24 March, 4:00 PM</p>
    <p>Meeting with Ann Perkins, room 15</p>
    <div className="mt-2 space-x-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="px-4 py-1 bg-lime-300 rounded"
      >
        Accept invite
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="px-4 py-1 bg-gray-200 rounded"
      >
        Reschedule
      </motion.button>
    </div>
  </motion.div>
);

export default function AdminDashboard() {
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

  // Contact Part Starts
  const [contact, setContact] = useState([]);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const res = await axios.get(
        "http://localhost/EMS/backend/Admin/fetch_contactus.php"
      );
      setContact(res.data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
      toast.error("Failed to load contacts.");
    }
  };
  // Contact Part Ends

  // Organizers Part Starts

  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    fetchOrgs();
  }, []);

  const fetchOrgs = async () => {
    try {
      const res = await axios.get(
        "http://localhost/EMS/backend/Admin/get_orgs.php"
      );
      if (res.data.success) {
        setOrgs(res.data.orgs);
      } else {
        toast.error("No Organizers Found");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error Fetching Organizers");
    }
  };
  // Org Part Ends

  // event Part start
  const [events, setEvents] = useState([]);

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
  // events Part Ends

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

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-lime-50 via-white to-lime-100 text-[#1a1a1a]">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-1/5 bg-white shadow-lg p-6 rounded-r-3xl"
      >
        <Sidebar />
      </motion.div>

      {/* Main Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-4/5 p-10 overflow-y-auto"
      >
        <h1 className="text-4xl font-bold mb-2">
          Hi, {admin?.username}! <span className="text-yellow-500">👀</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Is your day{" "}
          <span className="text-yellow-500 font-semibold">going well?</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <DashboardCard title="Users" count={users.length} />
          <DashboardCard title="Organizers" count={orgs.length} />
          <DashboardCard title="Total Events" count={events.length} />
          <DashboardCard title="Support/Feedback" count={contact.length} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <ToDoCard />
          <AssignmentCard />
          <ScheduleCard />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <NotificationCard />
          <BoardMeetingCard />
        </div>
      </motion.div>
    </div>
  );
}
