import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCalendarCheck, FaClock, FaUser, FaEnvelope, FaPhone, FaNotesMedical, FaList } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";
import { API_URL } from "../config";
import { useAuth } from "../context/AuthContext";

export const Appointment = () => {
  const location = useLocation();
  const { user } = useAuth();
  const preSelectedService = location.state?.service || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    reason: preSelectedService,
    notes: ""
  });
  const [loading, setLoading] = useState(false);

  // Time Slots Generation (10:00 AM to 4:00 PM)
  const timeSlots = [
    "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00"
  ];

  const reasons = [
    "General Consultation",
    "Teeth Whitening",
    "Root Canal",
    "Dental Implants",
    "Braces / Orthodontics",
    "Tooth Extraction",
    "Cleaning / Scaling",
    "Other"
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTimeSelect = (time) => {
    setFormData({ ...formData, time });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/appointment`, formData, { withCredentials: true });
      if (res.status === 201) {
        toast.success("Appointment Confirmed! We'll see you soon.");
        setFormData({ name: "", email: "", phone: "", date: "", time: "", reason: "", notes: "" });
      }
    } catch (error) {
      console.error("Booking Error Details:", error); // Debugging log
      toast.error(error.response?.data?.message || "Booking failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // Get today's date for min attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="full-screen flex-center" style={{ position: "relative", padding: "100px 20px 40px" }}>

      {/* Background */}
      <div className="mesh-bg">
        <div className="mesh-blob blob-1"></div>
        <div className="mesh-blob blob-2"></div>
      </div>

      <motion.div
        className="glass-panel responsive-grid"
        style={{
          maxWidth: "1100px",
          width: "100%",
          padding: "40px",
          borderRadius: "30px",
          position: "relative",
          zIndex: 10
        }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left Side: Information */}
        <div style={{ color: "white" }}>
          <motion.h1
            variants={itemVariants}
            style={{ fontSize: "3rem", fontWeight: "bold", lineHeight: 1.1, marginBottom: "20px" }}
          >
            Book Your <br />
            <span className="text-gradient">Dream Smile</span>
          </motion.h1>
          <motion.p variants={itemVariants} style={{ fontSize: "1.1rem", opacity: 0.8, marginBottom: "40px" }}>
            Experience the future of dental care.
            Select your preferred slot and let us take care of the rest.
          </motion.p>

          <motion.div variants={itemVariants} style={{ marginBottom: "30px" }}>
            <h3 style={{ marginBottom: "15px", display: "flex", alignItems: "center", gap: "10px" }}><FaClock color="#a78bfa" /> Clinic Hours</h3>
            <p style={{ opacity: 0.8 }}>Mon - Sat: 10:00 AM - 04:00 PM</p>
            <p style={{ opacity: 0.6, fontSize: "0.9rem" }}>Sunday Closed</p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 style={{ marginBottom: "15px", display: "flex", alignItems: "center", gap: "10px" }}><FaCalendarCheck color="#60a5fa" /> Why Choose Us?</h3>
            <ul style={{ listStyle: "none", padding: 0, opacity: 0.8, lineHeight: "1.8" }}>
              <li>✓ Zero Wait Policy</li>
              <li>✓ Sterilized & Safe Environment</li>
              <li>✓ Pain-Free Treatments</li>
            </ul>
          </motion.div>
        </div>

        {/* Right Side: Form */}
        {/* Right Side: Form or Login Prompt */}
        {!user ? (
          <motion.div
            variants={itemVariants}
            className="glass-card"
            style={{
              padding: "40px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%"
            }}
          >
            <FaUser size={50} color="#60a5fa" style={{ marginBottom: "20px" }} />
            <h2 style={{ marginBottom: "16px", color: "white" }}>Login Required</h2>
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "32px", fontSize: "1.1rem" }}>
              Please sign in to book an appointment and track your history.
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              <Link to="/login">
                <button className="btn-gradient" style={{ padding: "12px 32px", borderRadius: "30px", fontSize: "1rem", cursor: "pointer", border: "none" }}>
                  Login Now
                </button>
              </Link>
              <Link to="/signup">
                <button className="glass-button" style={{ padding: "12px 32px", borderRadius: "30px", fontSize: "1rem", cursor: "pointer", border: "1px solid rgba(255,255,255,0.2)", color: "white", background: "transparent" }}>
                  Sign Up
                </button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* PERSONAL INFO */}
            <motion.div variants={itemVariants} className="form-grid-2">
              <div className="glass-input-group" style={{ position: "relative" }}>
                <FaUser style={{ position: "absolute", top: "50%", left: "15px", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="glass-input" style={{ width: "100%", padding: "14px 14px 14px 40px", borderRadius: "12px" }} />
              </div>
              <div className="glass-input-group" style={{ position: "relative" }}>
                <FaPhone style={{ position: "absolute", top: "50%", left: "15px", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input name="phone" type="tel" placeholder="Phone" value={formData.phone} onChange={handleChange} required className="glass-input" style={{ width: "100%", padding: "14px 14px 14px 40px", borderRadius: "12px" }} />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-input-group" style={{ position: "relative" }}>
              <FaEnvelope style={{ position: "absolute", top: "50%", left: "15px", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="glass-input" style={{ width: "100%", padding: "14px 14px 14px 40px", borderRadius: "12px" }} />
            </motion.div>

            {/* REASON & NOTES */}
            <motion.div variants={itemVariants} className="glass-input-group" style={{ position: "relative" }}>
              <FaList style={{ position: "absolute", top: "50%", left: "15px", transform: "translateY(-50%)", color: "#94a3b8", zIndex: 1 }} />
              <select name="reason" value={formData.reason} onChange={handleChange} required className="glass-input" style={{ width: "100%", padding: "14px 14px 14px 40px", borderRadius: "12px", appearance: "none", cursor: "pointer" }}>
                <option value="" disabled>Select Reason for Booking</option>
                {reasons.map(r => <option key={r} value={r} style={{ color: "black" }}>{r}</option>)}
              </select>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-input-group" style={{ position: "relative" }}>
              <FaNotesMedical style={{ position: "absolute", top: "15px", left: "15px", color: "#94a3b8" }} />
              <textarea name="notes" placeholder="Any specific issues or symptoms? (Optional)" value={formData.notes} onChange={handleChange} className="glass-input" style={{ width: "100%", padding: "14px 14px 14px 40px", borderRadius: "12px", minHeight: "80px", resize: "vertical" }} />
            </motion.div>

            {/* DATE & TIME */}
            <motion.div variants={itemVariants}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", fontSize: "0.9rem", color: "#cbd5e1" }}>Select Date</label>
              <input name="date" type="date" min={today} value={formData.date} onChange={handleChange} required className="glass-input" style={{ width: "100%", padding: "14px", borderRadius: "12px", colorScheme: "dark" }} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", fontSize: "0.9rem", color: "#cbd5e1" }}>Select Time Slot</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: "10px" }}>
                {timeSlots.map(time => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => handleTimeSelect(time)}
                    className={formData.time === time ? "btn-gradient" : "glass-input"}
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      textAlign: "center",
                      fontSize: "0.9rem",
                      border: formData.time === time ? "none" : "1px solid rgba(255,255,255,0.1)",
                      background: formData.time === time ? "" : "rgba(255,255,255,0.05)"
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="btn-gradient"
              style={{ padding: "16px", fontSize: "1.1rem", fontWeight: "bold", borderRadius: "12px", cursor: "pointer", marginTop: "10px", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </motion.button>
          </form>
        )}
      </motion.div>
    </div >
  );
};
