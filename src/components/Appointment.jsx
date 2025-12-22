import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaTooth,
  FaCheckCircle,
  FaStickyNote,
  FaSignInAlt,
  FaStethoscope
} from "react-icons/fa";
import "../Premium.css";
import { Link } from "react-router-dom";

export const Appointment = () => {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    service: "General Consultation",
    notes: ""
  });

  // Services List
  const services = [
    "General Consultation",
    "Teeth Whitening",
    "Root Canal Therapy",
    "Dental Implants",
    "Orthodontics (Braces)",
    "Cosmetic Dentistry",
    "Pediatric Dentistry",
    "Emergency Care"
  ];

  // Time Slots
  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "04:30 PM"
  ];

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceSelect = (service) => {
    setFormData({ ...formData, service });
  };

  const handleTimeSelect = (time) => {
    setFormData({ ...formData, time });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to book an appointment.");
      return;
    }

    if (!formData.time) {
      toast.error("Please select a convenient time slot.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...formData,
        message: formData.notes
      };

      const res = await axios.post(`${API_URL}/appointment`, payload, {
        withCredentials: true,
      });

      if (res.status === 201) {
        toast.success("Appointment Request Sent! We'll confirm shortly.");
        setFormData((prev) => ({
          ...prev,
          date: "",
          time: "",
          service: "General Consultation",
          notes: ""
        }));
      }
    } catch (error) {
      console.error("Booking Error:", error);
      const msg = error.response?.data?.message || "Booking failed. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        padding: "100px 20px 80px",
        background: "linear-gradient(135deg, #0a0f1e 0%, #1a1f35 50%, #0a0f1e 100%)",
        overflow: "hidden"
      }}
    >
      {/* Animated Background Elements */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden", pointerEvents: "none" }}>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(60px)"
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{
            position: "absolute",
            bottom: "-20%",
            left: "-10%",
            width: "700px",
            height: "700px",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(60px)"
          }}
        />
      </div>

      <div style={{ position: "relative", zIndex: 10, maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "50px" }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 24px",
              borderRadius: "50px",
              background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(16, 185, 129, 0.15))",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              marginBottom: "24px",
              backdropFilter: "blur(10px)"
            }}
          >
            <FaStethoscope style={{ color: "#3b82f6", fontSize: "20px" }} />
            <span style={{ color: "#60a5fa", fontWeight: "600", fontSize: "15px", letterSpacing: "0.5px" }}>
              BOOK YOUR VISIT
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: "800",
              background: "linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "16px",
              lineHeight: "1.2"
            }}
          >
            Schedule Your Appointment
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              color: "#94a3b8",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6"
            }}
          >
            Experience world-class dental care with cutting-edge technology
          </motion.p>
        </motion.div>

        {/* Main Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          style={{
            background: "rgba(15, 23, 42, 0.7)",
            backdropFilter: "blur(20px)",
            borderRadius: "32px",
            padding: "clamp(30px, 5vw, 60px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(59, 130, 246, 0.1)"
          }}
        >
          {/* Login Gate */}
          {!user && !authLoading && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.4 }}
              style={{
                marginBottom: "40px",
                padding: "24px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(251, 146, 60, 0.1))",
                border: "1px solid rgba(245, 158, 11, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "20px"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(251, 146, 60, 0.2))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  color: "#fbbf24"
                }}>
                  <FaUser />
                </div>
                <div>
                  <h3 style={{ color: "#fde68a", fontWeight: "700", fontSize: "18px", marginBottom: "4px" }}>
                    Account Required
                  </h3>
                  <p style={{ color: "#fef3c7", fontSize: "14px", opacity: 0.9 }}>
                    Sign in to manage and track your appointments
                  </p>
                </div>
              </div>
              <Link
                to="/login"
                style={{
                  padding: "14px 32px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #f59e0b, #fb923c)",
                  color: "#000",
                  fontWeight: "700",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow: "0 4px 20px rgba(245, 158, 11, 0.3)",
                  transition: "all 0.3s ease",
                  fontSize: "15px"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <FaSignInAlt /> Login / Signup
              </Link>
            </motion.div>
          )}

          {/* THE FORM */}
          <form onSubmit={handleSubmit} style={{ position: "relative" }}>

            {/* Overlay if not logged in */}
            {(!user && !authLoading) && (
              <div style={{
                position: "absolute",
                inset: 0,
                background: "rgba(10, 15, 30, 0.05)",
                backdropFilter: "blur(1px)",
                borderRadius: "24px",
                zIndex: 20,
                cursor: "not-allowed"
              }} />
            )}

            {/* Personal Information Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              style={{ marginBottom: "40px" }}
            >
              <h3 style={{
                color: "#e2e8f0",
                fontSize: "20px",
                fontWeight: "700",
                marginBottom: "24px",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <span style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #3b82f6, #10b981)",
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)"
                }} />
                Personal Information
              </h3>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px"
              }}>
                {/* Name */}
                <InputField
                  icon={<FaUser />}
                  label="Full Name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!user}
                  required
                />

                {/* Phone */}
                <InputField
                  icon={<FaPhone />}
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="+91 00000-00000"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!user}
                  required
                />

                {/* Email */}
                <InputField
                  icon={<FaEnvelope />}
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!user}
                  required
                />
              </div>
            </motion.div>

            {/* Service Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              style={{ marginBottom: "40px" }}
            >
              <h3 style={{
                color: "#e2e8f0",
                fontSize: "20px",
                fontWeight: "700",
                marginBottom: "24px",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <span style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                  boxShadow: "0 0 20px rgba(139, 92, 246, 0.6)"
                }} />
                Select Treatment
              </h3>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "16px"
              }}>
                {services.map((service, index) => (
                  <motion.button
                    key={service}
                    type="button"
                    onClick={() => handleServiceSelect(service)}
                    disabled={!user}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.05, duration: 0.3 }}
                    whileHover={{ scale: user ? 1.03 : 1, y: user ? -2 : 0 }}
                    whileTap={{ scale: user ? 0.98 : 1 }}
                    style={{
                      padding: "18px 20px",
                      borderRadius: "16px",
                      border: formData.service === service
                        ? "2px solid rgba(139, 92, 246, 0.6)"
                        : "1px solid rgba(255, 255, 255, 0.08)",
                      background: formData.service === service
                        ? "linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.15))"
                        : "rgba(30, 41, 59, 0.4)",
                      color: formData.service === service ? "#c4b5fd" : "#94a3b8",
                      fontWeight: "600",
                      fontSize: "14px",
                      cursor: user ? "pointer" : "not-allowed",
                      transition: "all 0.3s ease",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      boxShadow: formData.service === service
                        ? "0 8px 24px rgba(139, 92, 246, 0.2)"
                        : "none"
                    }}
                  >
                    <FaTooth style={{
                      fontSize: "18px",
                      color: formData.service === service ? "#a78bfa" : "#64748b"
                    }} />
                    {service}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Date & Time Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              style={{ marginBottom: "40px" }}
            >
              <h3 style={{
                color: "#e2e8f0",
                fontSize: "20px",
                fontWeight: "700",
                marginBottom: "24px",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <span style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #10b981, #06b6d4)",
                  boxShadow: "0 0 20px rgba(16, 185, 129, 0.6)"
                }} />
                Choose Date & Time
              </h3>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "32px"
              }}>
                {/* Date Picker */}
                <div>
                  <label style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#cbd5e1",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                  }}>
                    <FaCalendarAlt style={{ color: "#10b981" }} />
                    Select Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    disabled={!user}
                    min={new Date().toISOString().split("T")[0]}
                    style={{
                      width: "100%",
                      padding: "16px 20px",
                      borderRadius: "14px",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      background: "rgba(30, 41, 59, 0.5)",
                      color: "#e2e8f0",
                      fontSize: "15px",
                      fontWeight: "500",
                      outline: "none",
                      transition: "all 0.3s ease",
                      cursor: user ? "pointer" : "not-allowed",
                      colorScheme: "dark"
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(16, 185, 129, 0.5)";
                      e.target.style.background = "rgba(30, 41, 59, 0.8)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                      e.target.style.background = "rgba(30, 41, 59, 0.5)";
                    }}
                  />
                </div>

                {/* Time Slots */}
                <div>
                  <label style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#cbd5e1",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                  }}>
                    <FaClock style={{ color: "#06b6d4" }} />
                    Select Time
                  </label>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "10px"
                  }}>
                    {timeSlots.map((slot, index) => (
                      <motion.button
                        key={slot}
                        type="button"
                        onClick={() => handleTimeSelect(slot)}
                        disabled={!user}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.03, duration: 0.2 }}
                        whileHover={{ scale: user ? 1.05 : 1 }}
                        whileTap={{ scale: user ? 0.95 : 1 }}
                        style={{
                          padding: "12px 8px",
                          borderRadius: "12px",
                          border: formData.time === slot
                            ? "2px solid rgba(6, 182, 212, 0.6)"
                            : "1px solid rgba(255, 255, 255, 0.08)",
                          background: formData.time === slot
                            ? "linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(16, 185, 129, 0.2))"
                            : "rgba(30, 41, 59, 0.4)",
                          color: formData.time === slot ? "#67e8f9" : "#94a3b8",
                          fontWeight: "600",
                          fontSize: "13px",
                          cursor: user ? "pointer" : "not-allowed",
                          transition: "all 0.3s ease",
                          boxShadow: formData.time === slot
                            ? "0 4px 16px rgba(6, 182, 212, 0.3)"
                            : "none"
                        }}
                      >
                        {slot}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Additional Notes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              style={{ marginBottom: "32px" }}
            >
              <label style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#cbd5e1",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                <FaStickyNote style={{ color: "#f59e0b" }} />
                Additional Notes (Optional)
              </label>
              <textarea
                name="notes"
                placeholder="Tell us about your symptoms or any specific requests..."
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                disabled={!user}
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  borderRadius: "14px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  background: "rgba(30, 41, 59, 0.5)",
                  color: "#e2e8f0",
                  fontSize: "15px",
                  lineHeight: "1.6",
                  outline: "none",
                  resize: "vertical",
                  transition: "all 0.3s ease",
                  fontFamily: "inherit"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(245, 158, 11, 0.5)";
                  e.target.style.background = "rgba(30, 41, 59, 0.8)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.target.style.background = "rgba(30, 41, 59, 0.5)";
                }}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading || !user}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ scale: user ? 1.02 : 1, y: user ? -2 : 0 }}
              whileTap={{ scale: user ? 0.98 : 1 }}
              style={{
                width: "100%",
                padding: "20px",
                borderRadius: "16px",
                border: "none",
                background: !user
                  ? "rgba(51, 65, 85, 0.5)"
                  : loading
                    ? "linear-gradient(135deg, #64748b, #475569)"
                    : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                color: !user ? "#64748b" : "#ffffff",
                fontSize: "17px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "1px",
                cursor: user && !loading ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                boxShadow: user && !loading
                  ? "0 10px 40px rgba(59, 130, 246, 0.3)"
                  : "none",
                transition: "all 0.3s ease",
                opacity: !user ? 0.5 : 1
              }}
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{
                      width: "20px",
                      height: "20px",
                      border: "3px solid rgba(255, 255, 255, 0.3)",
                      borderTopColor: "#ffffff",
                      borderRadius: "50%"
                    }}
                  />
                  Processing...
                </>
              ) : (
                <>
                  <FaCheckCircle style={{ fontSize: "20px" }} />
                  Confirm Appointment
                </>
              )}
            </motion.button>

          </form>
        </motion.div>

      </div>
    </div>
  );
};

// Reusable Input Field Component
const InputField = ({ icon, label, ...props }) => {
  return (
    <div>
      <label style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        color: "#cbd5e1",
        fontSize: "12px",
        fontWeight: "600",
        marginBottom: "8px",
        textTransform: "uppercase",
        letterSpacing: "0.5px"
      }}>
        {React.cloneElement(icon, { style: { color: "#3b82f6", fontSize: "14px" } })}
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <input
          {...props}
          style={{
            width: "100%",
            padding: "14px 16px",
            paddingLeft: "44px",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            background: "rgba(30, 41, 59, 0.5)",
            color: "#e2e8f0",
            fontSize: "15px",
            fontWeight: "500",
            outline: "none",
            transition: "all 0.3s ease",
            cursor: props.disabled ? "not-allowed" : "text"
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "rgba(59, 130, 246, 0.5)";
            e.target.style.background = "rgba(30, 41, 59, 0.8)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
            e.target.style.background = "rgba(30, 41, 59, 0.5)";
          }}
        />
        <div style={{
          position: "absolute",
          left: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#64748b",
          fontSize: "16px",
          pointerEvents: "none"
        }}>
          {icon}
        </div>
      </div>
    </div>
  );
};
