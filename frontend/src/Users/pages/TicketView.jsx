/* import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function TicketView() {
  const location = useLocation();
  const navigate = useNavigate();
  const { event, ticketID, qr_code } = location.state || {};

  useEffect(() => {
    if (!event || !ticketID || !qr_code) {
      navigate("/events"); // redirect if data is missing
    }
  }, [event, ticketID, qr_code, navigate]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = qr_code;
    link.download = `Ticket_${ticketID}.png`;
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Ticket for ${event.title}`,
          text: `Here's my ticket for ${event.title} at ${event.venue} on ${event.date}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Sharing failed:", error);
      }
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border">
      <h2 className="text-2xl font-bold text-center mb-4 text-purple-700">🎟️ Ticket Confirmation</h2>

      <div className="bg-gray-100 p-4 rounded-xl space-y-2 text-sm">
        <p><strong>Event:</strong> {event.title}</p>
        <p><strong>Venue:</strong> {event.venue}</p>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Time:</strong> {event.time}</p>
        <p><strong>Ticket ID:</strong> {ticketID}</p>
        <p><strong>Price:</strong> {event.price ? `₹ ${event.price}` : "Free"}</p>
      </div>

      <div className="flex flex-col items-center mt-6">
        <img src={qr_code} alt="Ticket QR Code" className="w-48 h-48 mb-4 border" />

        <div className="flex gap-4 mb-4">
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Download QR
          </button>
          <button
            onClick={handleShare}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Share Ticket
          </button>
        </div>

        <button
          onClick={() => navigate("/events")}
          className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
        >
          ⬅️ Back to Events
        </button>
      </div>
    </div>
  );
}
*/
import { useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";

const TicketView = () => {
  const location = useLocation();
  const { ticketDetails } = location.state || {};
  const ticketOnlyRef = useRef(); // for image generation (without buttons)

  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);

  if (!ticketDetails) {
    return (
      <div className="text-center p-10 text-red-600 font-semibold">
        No ticket details found.
      </div>
    );
  }

  const generateImage = async () => {
    const canvas = await html2canvas(ticketOnlyRef.current, { scale: 2 });
    return canvas.toDataURL("image/png");
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const imgData = await generateImage();
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `Ticket_${ticketDetails.ticket_id}.png`;
      link.click();
    } catch (err) {
      alert("Failed to download ticket");
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    if (!navigator.canShare || !navigator.canShare({ files: [] })) {
      alert("Sharing not supported in this browser.");
      return;
    }

    setSharing(true);
    try {
      const imgData = await generateImage();
      const res = await fetch(imgData);
      const blob = await res.blob();
      const file = new File([blob], `Ticket_${ticketDetails.ticket_id}.png`, {
        type: "image/png",
      });

      await navigator.share({
        title: `Your Ticket for ${ticketDetails.event_name}`,
        text: `Here is my ticket for ${ticketDetails.event_name} on ${ticketDetails.date}`,
        files: [file],
      });
    } catch (err) {
      console.error("Share failed:", err);
    } finally {
      setSharing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 py-10 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Ticket Only (for export) */}
        <div ref={ticketOnlyRef} className="p-5 text-black">
          {/* Header */}
          <div className="text-purple-700 font-bold text-lg flex items-center gap-2 mb-3">
            🎟️ Ticket Details
          </div>

          <div className="bg-gray-100 rounded-xl p-3 mb-4">
            <p className="font-semibold text-sm">Entry Pass for One Person</p>
            <p className="text-xs text-gray-700">{ticketDetails.venue}</p>
            <p className="text-xs text-gray-600">{ticketDetails.date}</p>
          </div>

          {/* Info */}
          {/* Ticket Details Grid */}
          <div className="text-sm mb-4 grid grid-cols-2 gap-y-2">
            <p className="font-semibold">Event Name:</p>
            <p className="text-right">{ticketDetails.event_name}</p>

            <p className="font-semibold">Ticket ID:</p>
            <p className="text-right">{ticketDetails.ticket_id}</p>

            <p className="font-semibold">Date:</p>
            <p className="text-right">{ticketDetails.date}</p>

            <p className="font-semibold">Start Time:</p>
            <p className="text-right">{ticketDetails.start_time}</p>

            <p className="font-semibold">End Time:</p>
            <p className="text-right">{ticketDetails.end_time}</p>

            <p className="font-semibold text-red-600">Total:</p>
            <p className="text-right text-red-600 font-semibold">
              {ticketDetails.price ? `₹ ${ticketDetails.price}` : "Free"}
            </p>
          </div>

          {/* Dashed Line */}
          <div className="border-t border-dashed border-gray-400 my-4"></div>

          {/* QR Code */}
          <div className="flex justify-center my-3">
            <img
              src={ticketDetails.qr_code}
              alt="QR Code"
              className="w-40 h-40 border rounded"
            />
          </div>

          {/* Confirmation */}
          <p className="text-green-600 text-sm text-center mt-1 mb-2">
            ✅ Ticket downloaded successfully.
          </p>
          <p className="text-xs text-center text-red-600">
            <strong>Note:</strong> Just show your QR code while boarding the
            venue.
          </p>
        </div>

        {/* Buttons (excluded from image) */}
        <div className="flex justify-around bg-white px-4 py-3 border-t">
          <button
            onClick={handleShare}
            disabled={sharing}
            className={`flex-1 mx-1 py-2 rounded-lg text-white ${
              sharing ? "bg-gray-400" : "bg-black hover:bg-gray-800"
            } transition`}
          >
            {sharing ? "Sharing..." : "📤 Share"}
          </button>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className={`flex-1 mx-1 py-2 rounded-lg text-white ${
              downloading ? "bg-gray-400" : "bg-black hover:bg-gray-800"
            } transition`}
          >
            {downloading ? "Downloading..." : "⬇️ Download"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TicketView;
