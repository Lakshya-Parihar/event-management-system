import { useNavigate, useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Ticket, Share2 } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function AnimatedTicketCard() {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event;
  const [ticketID, setTicketID] = useState("");
  const ticketRef = useRef(null);
  const buttonsRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasBooked, setHasBooked] = useState(false);

  useEffect(() => {
    // Generate or fetch persistent ticketID
    const storedID = localStorage.getItem("ticket_id");
    if (storedID) {
      setTicketID(storedID);
    } else {
      const newID = "TKT" + Math.floor(100000 + Math.random() * 900000); // Ensures 6-digit random number
      setTicketID(newID);
    }
  }, []);

  useEffect(() => {
    const checkPreviousBooking = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?.id;

      try {
        const response = await fetch(
          "http://localhost/EMS/Backend/User/check_ticket.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: userId,
              event_id: event.id,
            }),
          }
        );

        const result = await response.json();
        if (result.status === "exists") {
          setHasBooked(true);
        }
      } catch (error) {
        console.error("Error checking ticket:", error);
      }
    };

    if (event) checkPreviousBooking();
  }, [event]);

  if (!event) return <p>No event data provided.</p>;

  const qrValue = JSON.stringify({
    ticketID,
    eventName: event.title,
    location: event.venue || "Not Provided",
    date: event.date || "Not Provided",
    time: event.time || "Not Provided",
    amount: event.price ? `₹ ${event.price}` : "Free",
  });

  /* const handleConfirmBooking = async () => {
    if (hasBooked) {
      alert("❗ You have already booked a ticket for this event.");
      return;
    }

    setIsGenerating(true);

    try {
      const qrCanvas = document.getElementById("ticket-qr-code");
      const canvas = await html2canvas(qrCanvas);
      const qrBase64 = canvas.toDataURL("image/png");

      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?.id;

      const payload = {
        user_id: userId,
        event_id: event.id,
        ticket_id: ticketID,
        date: new Date().toISOString().split("T")[0],
        price: event.price || 0,
        qr_code: qrBase64,
      };

      const res = await fetch(
        "http://localhost/EMS/Backend/User/create_ticket.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (result.status === "success") {
        alert("✅ Ticket booked successfully.");
        setHasBooked(true);
      } else {
        alert("❌ Error: " + result.message);
      }
    } catch (error) {
      console.error("Booking failed:", error);
      alert("❌ Booking failed.");
    } finally {
      setIsGenerating(false);
    }
  }; */
  const handleConfirmBooking = async () => {
    if (hasBooked) {
      alert("❗ You have already booked a ticket for this event.");
      return;
    }

    setIsGenerating(true);

    try {
      // Generate a fresh unique ticket ID for this booking
      const newTicketID = "TKT" + Math.floor(Math.random() * 1000000);

      const qrCanvas = document.getElementById("ticket-qr-code");
      const canvas = await html2canvas(qrCanvas);
      const qrBase64 = canvas.toDataURL("image/png");

      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?.id;

      const payload = {
        user_id: userId,
        event_id: event.id,
        start_time:event.start_time,
        end_time:event.end_time,
        ticket_id: newTicketID, // use new ID here
        date: new Date().toISOString().split("T")[0],
        price: event.price || 0,
        qr_code: qrBase64,
      };

      console.log("Sending to backend:", payload);

      const res = await fetch(
        "http://localhost/EMS/Backend/User/create_ticket.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const text = await res.text(); // Read raw text first
      console.log("Raw server response:", text);

      try {
        const result = JSON.parse(text);
        if (result.status === "success") {
          alert("✅ Ticket booked successfully.");
          setHasBooked(true);
          setTicketID(newTicketID); // update state with new ID
          navigate("/ticket/view", { state: { ticketDetails: payload } });
        } else {
          alert("❌ Error: " + result.message);
        }
      } catch (err) {
        console.error("Failed to parse JSON:", err);
        alert("❌ Server returned invalid response.");
      }
    } catch (error) {
      console.error("Booking failed:", error);
      alert("❌ Booking failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!ticketRef.current) return;

    setIsGenerating(true);
    if (buttonsRef.current) buttonsRef.current.style.display = "none";

    const canvas = await html2canvas(ticketRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("ticket.pdf");

    setShowPreview(true);
    if (buttonsRef.current) buttonsRef.current.style.display = "flex";
    setIsGenerating(false);
  };

  const handleShare = async () => {
    if (!navigator.share) {
      alert("❗ Web Share API not supported in this browser.");
      return;
    }

    if (!ticketRef.current) {
      alert("⚠ No ticket content available to share.");
      return;
    }

    try {
      const canvas = await html2canvas(ticketRef.current);
      const imgData = canvas.toDataURL("image/png");
      const blob = await fetch(imgData).then((res) => res.blob());
      const file = new File([blob], "ticket-card.png", { type: "image/png" });

      await navigator.share({
        title: "Ticket Details",
        text: `Here are your ticket details for ${event.title}`,
        files: [file],
      });

      alert("✅ Ticket shared successfully!");
    } catch (error) {
      console.error("Error sharing:", error);
      alert("❌ Failed to share.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border"
      ref={ticketRef}
    >
      {!isGenerating && (
        <div
          ref={buttonsRef}
          className="flex items-center justify-between mb-4 px-4"
        >
          <div className="flex items-center gap-2">
            <Ticket className="text-purple-600" size={30} />
            <h2 className="text-xl font-semibold text-purple-700">
              Ticket Details
            </h2>
          </div>
          <Link to={"/events"} className="flex items-center gap-1">
            <FaArrowLeft className="h-4 w-4 text-red-700" />
            <h2 className="text-xl font-semibold text-red-700">Back</h2>
          </Link>
        </div>
      )}

      <div className="bg-gray-100 p-3 rounded-xl text-sm mb-4">
        <p className="font-medium">Entry Pass for One Person</p>
        <p>{event.venue || "Location not specified"}</p>
        <p className="text-gray-500">{event.date}</p>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="font-medium">Event Name</span>
          <span>{event.title}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Ticket ID</span>
          <span>{ticketID}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Date</span>
          <span>{event.date}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Start Time</span>
          <span>{event.startTime || "04:59 pm"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">End Time</span>
          <span>{event.endTime || "11:00 pm"}</span>
        </div>
        <div className="flex justify-between text-red-500 font-semibold">
          <span>Total:</span>
          <span>{event.price ? `₹ ${event.price}` : "Free"}</span>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <QRCodeCanvas
          id="ticket-qr-code"
          value={qrValue}
          size={175}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
          includeMargin={true}
        />
      </div>

      {showPreview && (
        <p className="text-green-600 text-xs text-center mt-1 animate-fade-in">
          ✅ Ticket downloaded successfully.
        </p>
      )}

      <p className="text-xs text-gray-500 text-center mt-2">
        <span className="text-red-500 font-medium">Note:</span> Just show your
        QR code while boarding the venue.
      </p>

      {!isGenerating && (
        <div
          ref={buttonsRef}
          className="flex justify-around mt-6 gap-2 flex-wrap"
        >
          <button
            onClick={handleConfirmBooking}
            className="bg-green-600 text-white font-semibold h-12 w-36 rounded flex items-center justify-center"
            disabled={hasBooked}
          >
            {hasBooked ? "Already Booked" : "Confirm Booking"}
          </button>
          <button
            onClick={handleShare}
            className="bg-black text-white font-semibold h-12 w-28 rounded flex items-center justify-center"
          >
            <Share2 className="mr-2 mt-1 h-4 w-4 animate-pulse" /> Share
          </button>
          <button
            className="bg-black text-white font-semibold h-12 w-28 rounded flex items-center justify-center"
            onClick={handleDownload}
          >
            <Download className="mr-1 mt-2 h-4 w-4 animate-bounce" /> Download
          </button>
        </div>
      )}
    </motion.div>
  );
}
