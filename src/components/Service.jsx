import { useNavigate } from "react-router-dom";
import { FaTooth, FaTools, FaMagic, FaUserMd, FaSmileBeam, FaProcedures } from "react-icons/fa";
import { motion } from "framer-motion";

export function Service() {
  const navigate = useNavigate();

  const services = [
    { name: "General Consultation", icon: <FaUserMd size={40} />, desc: "Complete oral health checkup and diagnosis.", color: "#3b82f6" },
    { name: "Teeth Whitening", icon: <FaMagic size={40} />, desc: "Brighten your smile with simple, safe treatments.", color: "#4ade80" },
    { name: "Root Canal Treatment", icon: <FaTools size={40} />, desc: "Save your natural teeth with painless therapy.", color: "#f472b6" },
    { name: "Dental Implants", icon: <FaTooth size={40} />, desc: "Permanent, natural-looking replacement for missing teeth.", color: "#fbbf24" },
    { name: "Orthodontics (Braces)", icon: <FaSmileBeam size={40} />, desc: "Straighten your teeth for a perfect smile.", color: "#a78bfa" },
    { name: "Oral Surgery", icon: <FaProcedures size={40} />, desc: "Expert surgical care for complex dental issues.", color: "#ef4444" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative", padding: "120px 20px" }}>
      {/* Background */}
      <div className="mesh-bg">
        <div className="mesh-blob blob-1" style={{ top: "20%", left: "20%", background: "#3b82f6" }}></div>
        <div className="mesh-blob blob-2" style={{ bottom: "20%", right: "20%", background: "#8b5cf6" }}></div>
      </div>

      <div style={{ textAlign: "center", marginBottom: "80px", position: "relative", zIndex: 10 }}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gradient"
          style={{ fontSize: "3.5rem", fontWeight: "bold", marginBottom: "20px" }}
        >
          Our Premium Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: "1.2rem", color: "#cbd5e1", maxWidth: "700px", margin: "0 auto" }}
        >
          Choosing the right treatment is the first step to your perfect smile. Select a service below to book your appointment instantly.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "30px",
          position: "relative",
          zIndex: 10
        }}
      >
        {services.map((s, idx) => (
          <motion.div
            key={s.name}
            variants={itemVariants}
            className="glass-panel"
            whileHover={{ y: -10, boxShadow: `0 0 20px ${s.color}40` }}
            onClick={() => navigate("/appointment", { state: { service: s.name } })}
            style={{
              padding: "40px",
              cursor: "pointer",
              borderRadius: "24px",
              borderTop: `4px solid ${s.color}`,
              background: "rgba(255, 255, 255, 0.03)"
            }}
          >
            <div style={{
              width: "70px", height: "70px",
              background: `${s.color}20`,
              borderRadius: "16px",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "24px", color: s.color
            }}>
              {s.icon}
            </div>
            <h3 style={{ marginBottom: "12px", fontSize: "1.5rem", fontWeight: "bold", color: "white" }}>{s.name}</h3>
            <p style={{ color: "#94a3b8", marginBottom: "24px", lineHeight: "1.6" }}>{s.desc}</p>
            <button
              style={{
                width: "100%",
                padding: "12px",
                background: "transparent",
                border: `1px solid ${s.color}`,
                color: s.color,
                borderRadius: "50px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.3s"
              }}
              onMouseOver={(e) => {
                e.target.style.background = s.color;
                e.target.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = s.color;
              }}
            >
              Book Now
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
