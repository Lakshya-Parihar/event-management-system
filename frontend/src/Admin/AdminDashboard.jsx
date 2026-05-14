import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Pages/Sidebar";
import { FaUsers, FaUserTie, FaCalendarAlt, FaComments, FaCheckCircle, FaExclamationCircle, FaClock } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const DashboardCard = ({ title, count }) => {
  const iconMap = {
    Users: <FaUsers className="text-3xl text-blue-500" />,
    Organizers: <FaUserTie className="text-3xl text-emerald-500" />,
    "Total Events": <FaCalendarAlt className="text-3xl text-indigo-500" />,
    "Support/Feedback": <FaComments className="text-3xl text-rose-500" />,
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center"
    >
      <div className="p-4 bg-gray-50 rounded-2xl mb-4">
        {iconMap[title] || <FaUsers className="text-3xl text-gray-400" />}
      </div>
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mt-1">{count ?? 0}</p>
    </motion.div>
  );
};

const ToDoCard = () => (
  <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-bold text-gray-800">Pending Actions</h3>
      <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">4 Urgent</span>
    </div>
    <div className="space-y-4">
      <div className="flex items-start gap-3 p-3 bg-rose-50 rounded-2xl border border-rose-100">
        <FaExclamationCircle className="text-rose-500 mt-1" />
        <div>
          <p className="text-sm font-semibold text-gray-800">Approve Tech-Con Venue</p>
          <p className="text-xs text-rose-600">High Priority • Operations</p>
        </div>
      </div>
      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-2xl border border-blue-100">
        <FaClock className="text-blue-500 mt-1" />
        <div>
          <p className="text-sm font-semibold text-gray-800">Review Vendor Contracts</p>
          <p className="text-xs text-blue-600">Due Today • Legal</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const AssignmentCard = () => (
  <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
    <h3 className="text-lg font-bold text-gray-800 mb-6">Event Readiness</h3>
    <div className="space-y-5">
      <div>
        <div className="flex justify-between mb-1 text-sm font-medium">
          <span>Annual Gala Setup</span>
          <span className="text-emerald-600">92%</span>
        </div>
        <div className="w-full bg-gray-100 h-2 rounded-full">
          <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "92%" }}></div>
        </div>
      </div>
      <div>
        <div className="flex justify-between mb-1 text-sm font-medium">
          <span>Sports Meet Registration</span>
          <span className="text-amber-500">45%</span>
        </div>
        <div className="w-full bg-gray-100 h-2 rounded-full">
          <div className="bg-amber-400 h-2 rounded-full" style={{ width: "45%" }}></div>
        </div>
      </div>
    </div>
  </motion.div>
);

const ScheduleCard = () => (
  <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
    <h3 className="text-lg font-bold text-gray-800 mb-6">Today's Briefing</h3>
    <div className="space-y-4">
      <div className="border-l-4 border-indigo-500 pl-4">
        <p className="text-sm font-bold">Organizer Sync-up</p>
        <p className="text-xs text-gray-500">09:00 AM - Conference Room A</p>
      </div>
      <div className="border-l-4 border-gray-200 pl-4">
        <p className="text-sm font-bold">Venue Security Audit</p>
        <p className="text-xs text-gray-500">02:30 PM - Main Stadium</p>
      </div>
    </div>
  </motion.div>
);

const NotificationCard = () => (
  <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
    <h3 className="text-lg font-bold text-gray-800 mb-4">System Alerts</h3>
    <div className="flex items-center gap-4">
      <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
        <FaCalendarAlt />
      </div>
      <div>
        <p className="text-sm font-bold text-gray-800">New Event Request</p>
        <p className="text-xs text-gray-500">"International Research Seminar" submitted by Dr. Smith.</p>
      </div>
    </div>
  </motion.div>
);

const BoardMeetingCard = () => (
  <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
    <h3 className="text-lg font-bold text-gray-800 mb-4">Admin Council Meeting</h3>
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-sm font-semibold">Budget Approval 2026</p>
        <p className="text-xs text-gray-500">Tomorrow • 11:00 AM • Virtual</p>
      </div>
      <FaCheckCircle className="text-emerald-500" />
    </div>
    <div className="flex gap-2">
      <button className="flex-1 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-gray-800 transition-colors">
        Join Call
      </button>
      <button className="flex-1 py-2 border border-gray-200 text-gray-600 text-xs font-bold rounded-xl hover:bg-gray-50 transition-colors">
        Agenda
      </button>
    </div>
  </motion.div>
);

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [contact, setContact] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    fetchContact();
    fetchOrgs();
    fetchEvents();
    fetchUsers();
  }, []);

  const fetchContact = async () => {
    try {
      const res = await axios.get("http://localhost/EMS/backend/Admin/fetch_contactus.php");
      setContact(res.data);
    } catch (err) {
      toast.error("Failed to load contacts.");
    }
  };

  const fetchOrgs = async () => {
    try {
      const res = await axios.get("http://localhost/EMS/backend/Admin/get_orgs.php");
      if (res.data.success) setOrgs(res.data.orgs);
    } catch (error) {
      toast.error("Error Fetching Organizers");
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost/EMS/backend/Admin/get_events.php");
      if (res.data.success) setEvents(res.data.events);
    } catch (error) {
      toast.error("No Events Found");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost/EMS/backend/Organizer/get_users.php");
      if (res.data.success) setUsers(res.data.users);
    } catch (error) {
      toast.error("No Users Found");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fcfdfd] text-[#1a1a1a]">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Sidebar - Integrated with consistent border/shadow */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-1/5 bg-white border-r border-gray-100 p-6"
      >
        <Sidebar />
      </motion.div>

      {/* Main Dashboard */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-4/5 p-12 overflow-y-auto"
      >
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Welcome back, {admin?.username || "Admin"}
          </h1>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <DashboardCard title="Users" count={users.length} />
          <DashboardCard title="Organizers" count={orgs.length} />
          <DashboardCard title="Total Events" count={events.length} />
          <DashboardCard title="Support/Feedback" count={contact.length} />
        </div>

        {/* Mid Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <ToDoCard />
          <AssignmentCard />
          <ScheduleCard />
        </div>

        {/* Bottom Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <NotificationCard />
          <BoardMeetingCard />
        </div>
      </motion.div>
    </div>
  );
}