import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiUser } from "react-icons/fi";
import {
  FaGoogle,
  FaTwitter,
  FaFacebook,
  FaEye,
  FaEyeSlash,
  FaCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "../Styles/Main.css";
import aboutimg from "../Images/about-img.jpg";
import headerimg1 from "../Images/header-img-1.jpg";
import headerimg2 from "../Images/header-img-2.jpg";
import headerimg3 from "../Images/header-img-3.jpg";

const Home = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.name) {
      setUsername(storedUser.name);
    }
  }, []);

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // Header declaration part
  const [index, setIndex] = useState(0);

  const headerImages = [headerimg1, headerimg2, headerimg3];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % headerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [headerImages.length]);

  const goToPrev = () => {
    setIndex((prev) => (prev - 1 + headerImages.length) % headerImages.length);
  };

  const goToNext = () => {
    setIndex((prev) => (prev + 1) % headerImages.length);
  };

  const goToSlide = (slideIndex) => {
    setIndex(slideIndex);
  };
  // Header part end

  // FeaturedEvents declaration part
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost/EMS/backend/get_events.php?status=publish")
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }, []);
  // FeaturedEvents part end

  // faq declaration part
  const faqs = [
    {
      question: "Is it free to use EMS?",
      answer:
        "Yes, publishing your event on Eventbrite is free! Your attendees pay Ticketing Fees including a service fee and payment processing fee, unless you choose to cover them. If your event is free, no Ticketing Fees apply.",
    },
    {
      question: "How do I use EMS?",
      answer:
        "Just sign up to create your account — and then start creating your events. EMS makes it easy to create, manage, and promote your events on the digital platform.",
    },
    {
      question: "Can I offer discounts or promo codes on event tickets?",
      answer:
        "If you're wondering how to sell tickets online at a higher volume, discount codes are a great way to incentivize a purchase. Utilize Eventbrite’s online ticket management software to create tickets, offer discounts for attendees, use promo codes to track the performance.",
    },
    {
      question: "Do you offer special pricing for nonprofits?",
      answer:
        "Yes, we offer discounted Ticketing Fees on donation tickets, so more of your funds go directly to your cause. We’re committed to supporting non-profits with tailored features designed to help you and your community thrive.",
    },
    {
      question: "I have a question about an event.",
      answer:
        "The organizer may have provided the answer in their event listing. If not, you’ll need to contact them directly. Eventbrite can't answer questions about an event on the organizer's behalf.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  // faq close

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* Navbar */}
      <motion.div
        className="backdrop-blur-md bg-gradient-to-r from-blue-600/60 to-cyan-500/60 px-8 py-4 rounded-b-2xl shadow-lg sticky top-0 z-50 flex justify-between items-center"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
      >
        <Link to="/home">
          <h1 className="text-3xl font-bold text-white drop-shadow-md">EMS</h1>
        </Link>

        <div className="space-x-4 ml-36 font-semibold text-white flex items-center">
          <Link
            to="/home"
            className="hover:text-black transition duration-300 cursor-pointer"
          >
            HOME
          </Link>
          <Link
            to="/events"
            className="hover:text-black transition duration-300 cursor-pointer"
          >
            EVENTS
          </Link>
          <a
            href="#about"
            className="hover:text-black transition duration-300 cursor-pointer"
          >
            ABOUT
          </a>
          <Link
            to="/users-contact"
            className="hover:text-black transition duration-300 cursor-pointer"
          >
            CONTACT
          </Link>
          <a
            href="#faq"
            className="hover:text-black transition duration-300 cursor-pointer"
          >
            FAQs
          </a>
          <Link
            to="/org/login"
            className="hover:text-black transition duration-300 cursor-pointer"
          >
            ORGANIZER
          </Link>

          <Link
            to="/user-profile"
            className="hover:text-black transition duration-300 cursor-pointer"
          >
            <FiUser className="text-xl" />
          </Link>
        </div>

        <div className="flex items-center gap-4">

          <div className="flex gap-2 items-center">
            <FaCircle
              className={`text-sm ${
                isOnline ? "text-green-700" : "text-red-700"
              }`}
            />
            <span className="text-sm font-medium text-black">
              {isOnline ? "ONLINE" : "OFFLINE"}
            </span>
          </div>

          <Link to="/">
            <button
              className="px-4 py-2 bg-white text-blue-600 rounded-xl font-semibold shadow hover:scale-105 transition"
              onClick={logout}
            >
              LOGOUT
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Header */}
      <header
        id="header"
        className="text-center py-0 bg-gradient-to-br from-indigo-100 to-white"
      >
        {/* <h2 className="text-5xl font-bold text-indigo-700 mb-4">
          Discover & Attend Amazing Events
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          Browse, register, and join your favorite events happening around you.
        </p>
        <Link
          to="/events"
          className="bg-indigo-600 text-white px-6 py-3 rounded shadow-md hover:bg-indigo-700"
        >
          Explore Events
        </Link> */}
        <div className="relative w-full h-[90vh] p-4 pt-1 mb-4">
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            {headerImages.map((src, i) => (
              <motion.img
                key={i}
                src={src}
                alt={`Slide ${i + 1}`}
                className="absolute w-full h-full object-cover top-0 left-0 rounded-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: i === index ? 1 : 0 }}
                transition={{ duration: 1 }}
              />
            ))}

            {/* Optional overlay and text */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-white text-center px-4"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Discover & Attend Amazing Events
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto">
                  Your gateway for discovering, managing, and experiencing
                  amazing events. Browse, register, and join your favorite
                  events happening around you.
                </p>
              </motion.div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute top-1/2 left-8 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 text-white p-2 rounded-full z-10"
            >
              <ChevronLeft size={40} />
            </button>
            <button
              onClick={goToNext}
              className="absolute top-1/2 right-8 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 text-white p-2 rounded-full z-10"
            >
              <ChevronRight size={40} />
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2">
              {headerImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`w-3 h-3 rounded-full ${
                    i === index ? "bg-white" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* About */}
      <section id="about" className="px-6 py-12 bg-white text-center">
        <motion.h2
          className="text-4xl font-bold text-indigo-700 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ABOUT US
        </motion.h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-left space-y-6"
          >
            <div>
              <h3 className="text-xl font-semibold text-indigo-600 mb-1">
                Our Mission
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>
                  To empower communities and individuals by providing a seamless
                  platform to discover, organize, and experience memorable
                  events of all kinds.
                </li>
                <li>
                  To streamline event coordination with user-friendly technology
                  and support services.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-indigo-600 mb-1">
                Our Vision
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>
                  To become the leading event management hub that connects
                  people through shared experiences and drives local engagement
                  globally.
                </li>
                <li>
                  To foster innovation in event technology that enhances both
                  virtual and physical event experiences.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-indigo-600 mb-1">
                Our Goals
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Enable organizers to manage events effortlessly.</li>
                <li>Provide attendees with reliable event discovery tools.</li>
                <li>
                  Foster community involvement through diverse event categories.
                </li>
                <li>Support virtual and in-person event experiences.</li>
              </ul>
            </div>
          </motion.div>

          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl shadow-xl shadow-gray-300 hover:shadow-blue-200"
            >
              <img
                src={aboutimg}
                alt="People enjoying events"
                className="rounded-xl shadow-lg"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Featured Events */}
      <section
        id="featured-events"
        className="px-10 py-12 bg-gray-100 text-center"
      >
        <motion.h2
          className="text-4xl font-bold text-indigo-700 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          FEATURED EVENTS
        </motion.h2>

        {events.length === 0 ? (
          <p className="text-center text-gray-500">No events available.</p>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center justify-center gap-6">
              {/* Previous To Previous Card  */}
              {events.length > 1 && (
                <motion.div
                  key={
                    events[(currentIndex - 2 + events.length) % events.length]
                      ?.id
                  }
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 0.5, scale: 0.95 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="w-[260px] h-[360px] bg-white rounded-2xl shadow-lg p-4 opacity-50 pointer-events-none scale-95 hidden md:block"
                >
                  <img
                    src={
                      events[(currentIndex - 2 + events.length) % events.length]
                        .image
                    }
                    alt=""
                    className="rounded-xl h-40 w-full object-cover mb-3"
                  />
                  <h3 className="text-lg font-semibold text-indigo-600 truncate">
                    {
                      events[(currentIndex - 2 + events.length) % events.length]
                        .title
                    }
                  </h3>
                  <p className="text-black mt-2">
                    {
                      events[(currentIndex - 2 + events.length) % events.length]
                        .short_description
                    }
                  </p>
                  <p className="text-sm text-black mt-3">
                    Date:{" "}
                    {
                      events[(currentIndex - 2 + events.length) % events.length]
                        .date
                    }
                  </p>
                </motion.div>
              )}

              {/* Previous Card - Optional Preview */}
              {events.length > 1 && (
                <motion.div
                  key={
                    events[(currentIndex - 1 + events.length) % events.length]
                      ?.id
                  }
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 0.5, scale: 0.95 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="w-[260px] h-[360px] bg-white rounded-2xl shadow-lg p-4 opacity-50 pointer-events-none scale-95 hidden md:block"
                >
                  <img
                    src={
                      events[(currentIndex - 1 + events.length) % events.length]
                        .image
                    }
                    alt=""
                    className="rounded-xl h-40 w-full object-cover mb-3"
                  />
                  <h3 className="text-lg font-semibold text-indigo-600 truncate">
                    {
                      events[(currentIndex - 1 + events.length) % events.length]
                        .title
                    }
                  </h3>
                  <p className="text-black mt-2">
                    {
                      events[(currentIndex - 1 + events.length) % events.length]
                        .short_description
                    }
                  </p>
                  <p className="text-sm text-black mt-3">
                    Date:{" "}
                    {
                      events[(currentIndex - 1 + events.length) % events.length]
                        .date
                    }
                  </p>
                </motion.div>
              )}

              {/* Current Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={events[currentIndex]?.id}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-[320px] h-[420px] bg-white rounded-2xl shadow-xl shadow-gray-300 hover:shadow-blue-200 p-4 flex flex-col justify-between items-center"
                >
                  <img
                    src={events[currentIndex].image}
                    alt={events[currentIndex].title}
                    className="rounded-xl h-52 w-full object-cover mb-3"
                  />
                  <h3 className="text-xl font-semibold text-indigo-800">
                    {events[currentIndex].title}
                  </h3>
                  <p className="text-gray-600">
                    {events[currentIndex].short_description}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Date: {events[currentIndex].date}
                  </p>
                  <button className="spiral-hover pop-hover text-black mt-3 px-3 py-2 rounded-xl shadow-xl font-semibold bg-gradient-to-r from-blue-500 to-green-400">
                    View Details
                  </button>
                </motion.div>
              </AnimatePresence>

              {/* Next Card - Optional Preview */}
              {events.length > 1 && (
                <motion.div
                  key={events[(currentIndex + 1) % events.length]?.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 0.5, scale: 0.95 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="w-[260px] h-[360px] bg-white rounded-2xl shadow-lg p-4 opacity-50 pointer-events-none scale-95 hidden md:block"
                >
                  <img
                    src={events[(currentIndex + 1) % events.length].image}
                    alt=""
                    className="rounded-xl h-40 w-full object-cover mb-3"
                  />
                  <h3 className="text-lg font-semibold text-indigo-600 truncate">
                    {events[(currentIndex + 1) % events.length].title}
                  </h3>
                  <p className="text-black mt-2">
                    {
                      events[(currentIndex + 1) % events.length]
                        .short_description
                    }
                  </p>
                  <p className="text-sm text-black mt-3">
                    Date: {events[(currentIndex + 1) % events.length].date}
                  </p>
                </motion.div>
              )}

              {/* Next To Next Card */}
              {events.length > 1 && (
                <motion.div
                  key={events[(currentIndex + 2) % events.length]?.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 0.5, scale: 0.95 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="w-[260px] h-[360px] bg-white rounded-2xl shadow-lg p-4 opacity-50 pointer-events-none scale-95 hidden md:block"
                >
                  <img
                    src={events[(currentIndex + 2) % events.length].image}
                    alt=""
                    className="rounded-xl h-40 w-full object-cover mb-3"
                  />
                  <h3 className="text-lg font-semibold text-indigo-600 truncate">
                    {events[(currentIndex + 2) % events.length].title}
                  </h3>
                  <p className="text-black mt-2">
                    {
                      events[(currentIndex + 2) % events.length]
                        .short_description
                    }
                  </p>
                  <p className="text-sm text-black mt-3">
                    Date: {events[(currentIndex + 2) % events.length].date}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Arrows */}
            <div className="flex justify-center gap-6 mt-4">
              <motion.button
                whileTap={{ scale: 0.8 }}
                className="p-3 rounded-full bg-gray-800 text-white shadow-xl"
                onClick={() =>
                  setCurrentIndex(
                    (prev) => (prev - 1 + events.length) % events.length
                  )
                }
              >
                <ArrowLeft />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.8 }}
                className="p-3 rounded-full bg-indigo-200 text-black shadow-xl"
                onClick={() =>
                  setCurrentIndex((prev) => (prev + 1) % events.length)
                }
              >
                <ArrowRight />
              </motion.button>
            </div>
          </div>
        )}
      </section>

      {/* Faqs */}
      <section
        id="faq"
        className="relative text-center py-12 px-6 bg-gray-200 min-h-screen"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-[#252b48] mb-12"
        >
          FAQ's
        </motion.h1>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-xl p-6 text-left shadow-md bg-white cursor-pointer border transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:border-blue-300 ${
                openIndex === index
                  ? "border-blue-400 shadow-lg"
                  : "border-transparent"
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3
                  className={`font-semibold text-lg transition-colors duration-200 ${
                    openIndex === index ? "text-red-500" : "text-gray-800"
                  }`}
                >
                  {faq.question}
                </h3>
                <motion.span
                  className="text-2xl text-gray-400"
                  initial={false}
                  animate={{ rotate: openIndex === index ? 360 : 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  {openIndex === index ? "−" : "+"}
                </motion.span>
              </div>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white mt-auto">
        <motion.div
          className="backdrop-blur-md bg-gradient-to-r from-blue-600/60 to-cyan-500/60 px-8 py-4 rounded-t-2xl shadow-lg sticky top-0 z-50 flex justify-between items-center"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
        >
          <div className="max-w-7xl mx-auto px-2">
            {/* Main Footer Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-1 pt-10 border-t border-white justify-between text-center">
              {/* Logo + Description */}
              <div className="justify-start text-left">
                <h3 className="text-xl font-bold mb-2 hover:text-black transition duration-300 cursor-pointer">
                  EMS
                </h3>
                <p className="text-sm mb-3 font-semibold hover:text-black transition duration-300 cursor-pointer">
                  We create digital experiences for event organizers and
                  attendees.
                </p>
                <p className="text-sm mb-3 font-semibold hover:text-black transition duration-300 cursor-pointer">
                  From planning to ticketing, EMS simplifies every step of event
                  management.
                </p>
              </div>

              {/* Company */}
              <div>
                <h4 className="font-semibold mb-3 hover:text-black transition duration-300 cursor-pointer">
                  COMPANY
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="#about"
                      className="font-semibold hover:text-black transition duration-300 cursor-pointer"
                    >
                      ABOUT US
                    </a>
                  </li>
                  <li>
                    <a
                      href={"/org/login"}
                      className="font-semibold hover:text-black transition duration-300 cursor-pointer"
                    >
                      ORGANIZE
                    </a>
                  </li>
                  <li>
                    <a
                      href={"/users-contact"}
                      className="font-semibold hover:text-black transition duration-300 cursor-pointer"
                    >
                      CONTACT US
                    </a>
                  </li>
                  <li>
                    <a
                      href={"/users-team"}
                      className="font-semibold hover:text-black transition duration-300 cursor-pointer"
                    >
                      OUR TEAM
                    </a>
                  </li>
                </ul>
              </div>

              {/* Customer */}
              <div>
                <h4 className="font-semibold mb-3 hover:text-black transition duration-300 cursor-pointer">
                  CUSTOMER
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href={"/users-contact"}
                      className="font-semibold hover:text-black transition duration-300 cursor-pointer"
                    >
                      SUPPORT
                    </a>
                  </li>
                  <li>
                    <a
                      href={"/events"}
                      className="font-semibold hover:text-black transition duration-300 cursor-pointer"
                    >
                      EVENTS
                    </a>
                  </li>
                  <li>
                    <a
                      href="#faq"
                      className="font-semibold hover:text-black transition duration-300 cursor-pointer"
                    >
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a
                      href={"/users-pricing"}
                      className="font-semibold hover:text-black transition duration-300 cursor-pointer"
                    >
                      PRICING
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="font-semibold mb-3 hover:text-black transition duration-300 cursor-pointer">
                  CONTACT INFO
                </h4>
                <ul className="space-y-2 text-sm font-semibold">
                  <li className="font-semibold hover:text-black transition duration-300 cursor-pointer">
                    <i className="fas fa-envelope mr-2"></i>info@ems.com
                  </li>
                  <li className="font-semibold hover:text-black transition duration-300 cursor-pointer">
                    <i className="fas fa-phone mr-2"></i>+123 456 7890
                  </li>
                  <li className="font-semibold hover:text-black transition duration-300 cursor-pointer">
                    <i className="fas fa-map-marker-alt mr-2"></i>123 Event St,
                    City, Country
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="social-icons">
                <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-md shadow-gray-200 group transition-all duration-300">
                  <svg
                    class="transition-all duration-300 group-hover:scale-110"
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 72 72"
                    fill="none"
                  >
                    <path
                      d="M46.4927 38.6403L47.7973 30.3588H39.7611V24.9759C39.7611 22.7114 40.883 20.4987 44.4706 20.4987H48.1756V13.4465C46.018 13.1028 43.8378 12.9168 41.6527 12.8901C35.0385 12.8901 30.7204 16.8626 30.7204 24.0442V30.3588H23.3887V38.6403H30.7204V58.671H39.7611V38.6403H46.4927Z"
                      fill="#337FFF"
                    />
                  </svg>
                </button>
                <button class="w-8 h-8 flex items-center justify-center group rounded-lg bg-white shadow-md shadow-gray-200 group transition-all duration-300">
                  <svg
                    class="transition-all duration-300 group-hover:scale-110"
                    width="25"
                    height="25"
                    viewBox="0 0 72 72"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.4456 35.7808C27.4456 31.1786 31.1776 27.4468 35.7826 27.4468C40.3875 27.4468 44.1216 31.1786 44.1216 35.7808C44.1216 40.383 40.3875 44.1148 35.7826 44.1148C31.1776 44.1148 27.4456 40.383 27.4456 35.7808ZM22.9377 35.7808C22.9377 42.8708 28.6883 48.618 35.7826 48.618C42.8768 48.618 48.6275 42.8708 48.6275 35.7808C48.6275 28.6908 42.8768 22.9436 35.7826 22.9436C28.6883 22.9436 22.9377 28.6908 22.9377 35.7808ZM46.1342 22.4346C46.1339 23.0279 46.3098 23.608 46.6394 24.1015C46.9691 24.595 47.4377 24.9797 47.9861 25.2069C48.5346 25.4342 49.1381 25.4939 49.7204 25.3784C50.3028 25.2628 50.8378 24.9773 51.2577 24.5579C51.6777 24.1385 51.9638 23.6041 52.0799 23.0222C52.1959 22.4403 52.1367 21.8371 51.9097 21.2888C51.6828 20.7406 51.2982 20.2719 50.8047 19.942C50.3112 19.6122 49.7309 19.436 49.1372 19.4358H49.136C48.3402 19.4361 47.5771 19.7522 47.0142 20.3144C46.4514 20.8767 46.1349 21.6392 46.1342 22.4346ZM25.6765 56.1302C23.2377 56.0192 21.9121 55.6132 21.0311 55.2702C19.8632 54.8158 19.0299 54.2746 18.1538 53.4002C17.2777 52.5258 16.7354 51.6938 16.2827 50.5266C15.9393 49.6466 15.533 48.3214 15.4222 45.884C15.3009 43.2488 15.2767 42.4572 15.2767 35.781C15.2767 29.1048 15.3029 28.3154 15.4222 25.678C15.5332 23.2406 15.9425 21.918 16.2827 21.0354C16.7374 19.8682 17.2789 19.0354 18.1538 18.1598C19.0287 17.2842 19.8612 16.7422 21.0311 16.2898C21.9117 15.9466 23.2377 15.5406 25.6765 15.4298C28.3133 15.3086 29.1054 15.2844 35.7826 15.2844C42.4598 15.2844 43.2527 15.3106 45.8916 15.4298C48.3305 15.5408 49.6539 15.9498 50.537 16.2898C51.7049 16.7422 52.5382 17.2854 53.4144 18.1598C54.2905 19.0342 54.8308 19.8682 55.2855 21.0354C55.6289 21.9154 56.0351 23.2406 56.146 25.678C56.2673 28.3154 56.2915 29.1048 56.2915 35.781C56.2915 42.4572 56.2673 43.2466 56.146 45.884C56.0349 48.3214 55.6267 49.6462 55.2855 50.5266C54.8308 51.6938 54.2893 52.5266 53.4144 53.4002C52.5394 54.2738 51.7049 54.8158 50.537 55.2702C49.6565 55.6134 48.3305 56.0194 45.8916 56.1302C43.2549 56.2514 42.4628 56.2756 35.7826 56.2756C29.1024 56.2756 28.3125 56.2514 25.6765 56.1302ZM25.4694 10.9322C22.8064 11.0534 20.9867 11.4754 19.3976 12.0934C17.7518 12.7316 16.3585 13.5878 14.9663 14.977C13.5741 16.3662 12.7195 17.7608 12.081 19.4056C11.4626 20.9948 11.0403 22.8124 10.9191 25.4738C10.7958 28.1394 10.7676 28.9916 10.7676 35.7808C10.7676 42.57 10.7958 43.4222 10.9191 46.0878C11.0403 48.7494 11.4626 50.5668 12.081 52.156C12.7195 53.7998 13.5743 55.196 14.9663 56.5846C16.3583 57.9732 17.7518 58.8282 19.3976 59.4682C20.9897 60.0862 22.8064 60.5082 25.4694 60.6294C28.138 60.7506 28.9893 60.7808 35.7826 60.7808C42.5759 60.7808 43.4286 60.7526 46.0958 60.6294C48.759 60.5082 50.5774 60.0862 52.1676 59.4682C53.8124 58.8282 55.2066 57.9738 56.5989 56.5846C57.9911 55.1954 58.8438 53.7998 59.4842 52.156C60.1026 50.5668 60.5268 48.7492 60.6461 46.0878C60.7674 43.4202 60.7956 42.57 60.7956 35.7808C60.7956 28.9916 60.7674 28.1394 60.6461 25.4738C60.5248 22.8122 60.1026 20.9938 59.4842 19.4056C58.8438 17.7618 57.9889 16.3684 56.5989 14.977C55.2088 13.5856 53.8124 12.7316 52.1696 12.0934C50.5775 11.4754 48.7588 11.0514 46.0978 10.9322C43.4306 10.811 42.5779 10.7808 35.7846 10.7808C28.9913 10.7808 28.138 10.809 25.4694 10.9322Z"
                      fill="url(#paint0_radial_7092_54471)"
                    />
                    <path
                      d="M27.4456 35.7808C27.4456 31.1786 31.1776 27.4468 35.7826 27.4468C40.3875 27.4468 44.1216 31.1786 44.1216 35.7808C44.1216 40.383 40.3875 44.1148 35.7826 44.1148C31.1776 44.1148 27.4456 40.383 27.4456 35.7808ZM22.9377 35.7808C22.9377 42.8708 28.6883 48.618 35.7826 48.618C42.8768 48.618 48.6275 42.8708 48.6275 35.7808C48.6275 28.6908 42.8768 22.9436 35.7826 22.9436C28.6883 22.9436 22.9377 28.6908 22.9377 35.7808ZM46.1342 22.4346C46.1339 23.0279 46.3098 23.608 46.6394 24.1015C46.9691 24.595 47.4377 24.9797 47.9861 25.2069C48.5346 25.4342 49.1381 25.4939 49.7204 25.3784C50.3028 25.2628 50.8378 24.9773 51.2577 24.5579C51.6777 24.1385 51.9638 23.6041 52.0799 23.0222C52.1959 22.4403 52.1367 21.8371 51.9097 21.2888C51.6828 20.7406 51.2982 20.2719 50.8047 19.942C50.3112 19.6122 49.7309 19.436 49.1372 19.4358H49.136C48.3402 19.4361 47.5771 19.7522 47.0142 20.3144C46.4514 20.8767 46.1349 21.6392 46.1342 22.4346ZM25.6765 56.1302C23.2377 56.0192 21.9121 55.6132 21.0311 55.2702C19.8632 54.8158 19.0299 54.2746 18.1538 53.4002C17.2777 52.5258 16.7354 51.6938 16.2827 50.5266C15.9393 49.6466 15.533 48.3214 15.4222 45.884C15.3009 43.2488 15.2767 42.4572 15.2767 35.781C15.2767 29.1048 15.3029 28.3154 15.4222 25.678C15.5332 23.2406 15.9425 21.918 16.2827 21.0354C16.7374 19.8682 17.2789 19.0354 18.1538 18.1598C19.0287 17.2842 19.8612 16.7422 21.0311 16.2898C21.9117 15.9466 23.2377 15.5406 25.6765 15.4298C28.3133 15.3086 29.1054 15.2844 35.7826 15.2844C42.4598 15.2844 43.2527 15.3106 45.8916 15.4298C48.3305 15.5408 49.6539 15.9498 50.537 16.2898C51.7049 16.7422 52.5382 17.2854 53.4144 18.1598C54.2905 19.0342 54.8308 19.8682 55.2855 21.0354C55.6289 21.9154 56.0351 23.2406 56.146 25.678C56.2673 28.3154 56.2915 29.1048 56.2915 35.781C56.2915 42.4572 56.2673 43.2466 56.146 45.884C56.0349 48.3214 55.6267 49.6462 55.2855 50.5266C54.8308 51.6938 54.2893 52.5266 53.4144 53.4002C52.5394 54.2738 51.7049 54.8158 50.537 55.2702C49.6565 55.6134 48.3305 56.0194 45.8916 56.1302C43.2549 56.2514 42.4628 56.2756 35.7826 56.2756C29.1024 56.2756 28.3125 56.2514 25.6765 56.1302ZM25.4694 10.9322C22.8064 11.0534 20.9867 11.4754 19.3976 12.0934C17.7518 12.7316 16.3585 13.5878 14.9663 14.977C13.5741 16.3662 12.7195 17.7608 12.081 19.4056C11.4626 20.9948 11.0403 22.8124 10.9191 25.4738C10.7958 28.1394 10.7676 28.9916 10.7676 35.7808C10.7676 42.57 10.7958 43.4222 10.9191 46.0878C11.0403 48.7494 11.4626 50.5668 12.081 52.156C12.7195 53.7998 13.5743 55.196 14.9663 56.5846C16.3583 57.9732 17.7518 58.8282 19.3976 59.4682C20.9897 60.0862 22.8064 60.5082 25.4694 60.6294C28.138 60.7506 28.9893 60.7808 35.7826 60.7808C42.5759 60.7808 43.4286 60.7526 46.0958 60.6294C48.759 60.5082 50.5774 60.0862 52.1676 59.4682C53.8124 58.8282 55.2066 57.9738 56.5989 56.5846C57.9911 55.1954 58.8438 53.7998 59.4842 52.156C60.1026 50.5668 60.5268 48.7492 60.6461 46.0878C60.7674 43.4202 60.7956 42.57 60.7956 35.7808C60.7956 28.9916 60.7674 28.1394 60.6461 25.4738C60.5248 22.8122 60.1026 20.9938 59.4842 19.4056C58.8438 17.7618 57.9889 16.3684 56.5989 14.977C55.2088 13.5856 53.8124 12.7316 52.1696 12.0934C50.5775 11.4754 48.7588 11.0514 46.0978 10.9322C43.4306 10.811 42.5779 10.7808 35.7846 10.7808C28.9913 10.7808 28.138 10.809 25.4694 10.9322Z"
                      fill="url(#paint1_radial_7092_54471)"
                    />
                    <defs>
                      <radialGradient
                        id="paint0_radial_7092_54471"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(17.4144 61.017) scale(65.31 65.2708)"
                      >
                        <stop offset="0.09" stop-color="#FA8F21" />
                        <stop offset="0.78" stop-color="#D82D7E" />
                      </radialGradient>
                      <radialGradient
                        id="paint1_radial_7092_54471"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(41.1086 63.257) scale(51.4733 51.4424)"
                      >
                        <stop
                          offset="0.64"
                          stop-color="#8C3AAA"
                          stop-opacity="0"
                        />
                        <stop offset="1" stop-color="#8C3AAA" />
                      </radialGradient>
                    </defs>
                  </svg>
                </button>
                <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-md shadow-gray-200 group transition-all duration-300">
                  <svg
                    class="rounded-md transition-all duration-300 group-hover:scale-110"
                    width="25"
                    height="25"
                    viewBox="0 0 72 72"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.0065 56.1236H21.4893V35.5227L9.37109 26.4341V52.4881C9.37109 54.4997 11.001 56.1236 13.0065 56.1236Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M50.5732 56.1236H59.056C61.0676 56.1236 62.6914 54.4937 62.6914 52.4881V26.4341L50.5732 35.5227"
                      fill="#34A853"
                    />
                    <path
                      d="M50.5732 19.7693V35.5229L62.6914 26.4343V21.587C62.6914 17.0912 57.5594 14.5282 53.9663 17.2245"
                      fill="#FBBC04"
                    />
                    <path
                      d="M21.4893 35.5227V19.769L36.0311 30.6754L50.5729 19.769V35.5227L36.0311 46.429"
                      fill="#EA4335"
                    />
                    <path
                      d="M9.37109 21.587V26.4343L21.4893 35.5229V19.7693L18.0962 17.2245C14.4971 14.5282 9.37109 17.0912 9.37109 21.587Z"
                      fill="#C5221F"
                    />
                  </svg>
                </button>
                <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-md shadow-gray-200 group transition-all duration-300">
                  <svg
                    class="transition-all duration-300 group-hover:scale-110"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 72 72"
                    fill="none"
                  >
                    <path
                      d="M40.7568 32.1716L59.3704 11H54.9596L38.7974 29.383L25.8887 11H11L30.5205 38.7983L11 61H15.4111L32.4788 41.5869L46.1113 61H61L40.7557 32.1716H40.7568ZM34.7152 39.0433L32.7374 36.2752L17.0005 14.2492H23.7756L36.4755 32.0249L38.4533 34.7929L54.9617 57.8986H48.1865L34.7152 39.0443V39.0433Z"
                      fill="black"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="flex flex-col md:flex-row justify-between font-semibold items-center mt-4 +pt-1 border-t border-white text-sm">
              <p className="hover:text-black transition duration-300 cursor-pointer">
                © 2025 EMS. All rights reserved.
              </p>
              <div className="space-x-4 mt-4 md:mt-0">
                <a
                  href="#"
                  className="hover:text-black transition duration-300 cursor-pointer"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="hover:text-black transition duration-300 cursor-pointer"
                >
                  Legal Notice
                </a>
                <a
                  href="#"
                  className="hover:text-black transition duration-300 cursor-pointer"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </footer>
    </div>
  );
};

export default Home;
