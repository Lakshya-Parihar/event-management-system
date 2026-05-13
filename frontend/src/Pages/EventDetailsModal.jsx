import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Modal Component
const EventDetailsModal = ({ event, isOpen, onClose }) => {
  if (!event) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-[90%] max-w-6xl top-40 bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%" }}
            exit={{ opacity: 0, scale: 0.8, y: "-50%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex-1 bg-gray-100 p-6 flex justify-center items-center">
              <img
                src={event.image}
                alt={event.title}
                className="rounded-xl max-h-[350px] object-cover"
              />
            </div>
            <div className="flex-1 p-10 right-4">
              <h2 className="text-2xl font-bold mb-2">
                {event.title} - {event.short_description}
              </h2>
              <p className="text-gray-500 mb-4">{event.description}</p>
              <p className="text-gray-600 mb-2">
                <strong>Date:</strong> {event.date}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Category:</strong> {event.category}
              </p>
              <Link to={"/login"}>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition">
                  Book Now
                </button>
              </Link>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventDetailsModal;
