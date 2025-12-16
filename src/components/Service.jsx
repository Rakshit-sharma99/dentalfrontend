import { Link, useNavigate } from "react-router-dom";
import { FaTooth, FaTools, FaMagic, FaUserMd, FaSmileBeam, FaProcedures } from "react-icons/fa";

export function Service() {
  const navigate = useNavigate();

  const services = [
    { name: "General Consultation", icon: <FaUserMd size={40} />, desc: "Complete oral health checkup and diagnosis.", color: "#0072ff" },
    { name: "Teeth Whitening", icon: <FaMagic size={40} />, desc: "Brighten your smile with simple, safe treatments.", color: "#43e97b" },
    { name: "Root Canal Treatment", icon: <FaTools size={40} />, desc: "Save your natural teeth with painless therapy.", color: "#ff608c" },
    { name: "Dental Implants", icon: <FaTooth size={40} />, desc: "Permanent, natural-looking replacement for missing teeth.", color: "#f59e0b" },
    { name: "Orthodontics (Braces)", icon: <FaSmileBeam size={40} />, desc: "Straighten your teeth for a perfect smile.", color: "#9333ea" },
    { name: "Oral Surgery", icon: <FaProcedures size={40} />, desc: "Expert surgical care for complex dental issues.", color: "#ef4444" },
  ];

  const handleBook = (serviceName) => {
    navigate("/appointment", { state: { service: serviceName } });
  };

  return (
    <div className="container animate-fade-in" style={{ padding: "60px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h1 style={{ firstName: "3.5rem", marginBottom: "16px", background: "var(--primary-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Our Premium Services
        </h1>
        <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", maxWidth: "700px", margin: "0 auto" }}>
          Choosing the right treatment is the first step to your perfect smile. Select a service below to book your appointment instantly.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" }}>
        {services.map((s) => (
          <div
            key={s.name}
            className="glass-card service-hover"
            onClick={() => handleBook(s.name)}
            style={{
              padding: "32px",
              cursor: "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              borderTop: `4px solid ${s.color}`
            }}
          >
            <div style={{
              width: "80px", height: "80px",
              background: `${s.color}20`,
              borderRadius: "20px",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "24px", color: s.color
            }}>
              {s.icon}
            </div>
            <h3 style={{ marginBottom: "12px", fontSize: "1.5rem" }}>{s.name}</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "24px", lineHeight: "1.6" }}>{s.desc}</p>
            <button className="btn-secondary" style={{ width: "100%", borderColor: s.color, color: s.color }}>
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Ensure you add .service-hover:hover { transform: translateY(-10px); } to App.css or here
