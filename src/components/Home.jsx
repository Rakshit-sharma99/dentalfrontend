
import { Link } from "react-router-dom";
import { FaTooth, FaMagic, FaUserMd, FaStar, FaShieldAlt, FaClock, FaArrowRight } from "react-icons/fa";
import { useScrollReveal } from "../hooks/useScrollReveal";

export function Home() {
  useScrollReveal();

  return (
    <div className="home-page" style={{ overflowX: "hidden" }}>

      {/* HERO SECTION - LIGHT & CLEAN */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        background: "radial-gradient(circle at 90% 10%, rgba(59, 130, 246, 0.05) 0%, rgba(248,250,252,1) 50%)"
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 2 }}>

          <div className="hero-content reveal-on-scroll" style={{ flex: "1", paddingRight: "60px" }}>

            {/* Removed #1 Rated Badge as requested */}

            <h1 className="reveal-on-scroll delay-200" style={{ fontSize: "4.5rem", marginBottom: "32px", lineHeight: "1.1", fontWeight: "800", letterSpacing: "-0.03em" }}>
              <span style={{ display: "block", color: "#0f172a" }}>Smile Brighter,</span>
              <span className="text-gradient">Live Better.</span>
            </h1>

            <p className="reveal-on-scroll delay-300" style={{ fontSize: "1.25rem", color: "#64748b", marginBottom: "48px", maxWidth: "540px", lineHeight: "1.6" }}>
              Experience world-class dental care with a touch of luxury. From alignments to implants, we craft smiles that light up the room.
            </p>

            <div className="reveal-on-scroll delay-300" style={{ display: "flex", gap: "24px" }}>
              <Link to="/appointment">
                <button className="btn-primary animate-pulse">
                  Book Consultation <FaArrowRight size={14} />
                </button>
              </Link>
              <Link to="/services">
                <button className="btn-secondary">
                  Our Services
                </button>
              </Link>
            </div>
          </div>

          {/* VISUAL / ANIMATION */}
          <div className="hero-visual reveal-on-scroll delay-200" style={{ flex: "1", position: "relative", height: "600px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(0,0,0,0) 70%)", filter: "blur(80px)" }}></div>

            <div className="animate-float" style={{ position: "relative", zIndex: 10 }}>
              <FaTooth size={320} color="white" style={{ filter: "drop-shadow(0 30px 60px rgba(59, 130, 246, 0.4))" }} />
            </div>

            <div className="glass-card animate-float" style={{ position: "absolute", top: "20%", left: "5%", padding: "24px", animationDelay: "1s" }}>
              <FaShieldAlt size={32} color="#10b981" />
            </div>
            <div className="glass-card animate-float" style={{ position: "absolute", bottom: "20%", right: "10%", padding: "24px", animationDelay: "2s" }}>
              <FaMagic size={32} color="#f59e0b" />
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US - DARK (Improved Tone) */}
      <section style={{ padding: "120px 0", background: "#1e293b", color: "white", position: "relative", overflow: "hidden" }}>
        {/* Subtle Background Glows */}
        <div style={{ position: "absolute", top: "-50%", left: "-20%", width: "80%", height: "200%", background: "radial-gradient(circle, rgba(59, 130, 246, 0.08), transparent 70%)" }}></div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="reveal-on-scroll" style={{ textAlign: "center", marginBottom: "80px" }}>
            <h2 style={{ fontSize: "3rem", marginBottom: "16px" }}>Why Choose Us?</h2>
            <p style={{ color: "#94a3b8", maxWidth: "600px", margin: "0 auto", fontSize: "1.1rem" }}>Combining advanced technology and expert care to create healthy, confident smiles you can trust.</p>
          </div>

          <div className="grid-3">
            <FeatureCard dark={true} delay="100" icon={<FaUserMd />} title="Expert Team" desc="Board-certified specialists with decades of experience." />
            <FeatureCard dark={true} delay="200" icon={<FaClock />} title="Everyday Service" desc="Serving You Seven Days a Week." />
            <FeatureCard dark={true} delay="300" icon={<FaShieldAlt />} title="Pain-Free" desc="Advanced sedation techniques for maximal comfort." />
          </div>
        </div>
      </section>

      {/* LOCATION / MAP SECTION (New) */}
      <section style={{ padding: "80px 0", background: "#f8fafc" }}>
        <div className="container">
          <h2 className="reveal-on-scroll" style={{ fontSize: "2.5rem", marginBottom: "40px", textAlign: "center" }}>Visit Our Clinic</h2>
          <div className="reveal-on-scroll glass-card" style={{ padding: "16px", overflow: "hidden" }}>
            <iframe
              title="Clinic Location"  
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109149.2367811455!2d75.63883216731777!3d31.25081367807871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391af53132299b43%3A0x150c4705b4fda48e!2sModern%20Dental%20Clinic%20%7C%20Best%20dentist%20in%20Phagwara%20%7C%20Best%20Oral%20Surgeon%20in%20Phagwara%20%7C%20Dentist%20near%20Lpu%20%7C%20Dr%20Riar%20&#39;s%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1765863588475!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: "16px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="reveal-on-scroll" style={{ padding: "120px 0", background: "linear-gradient(135deg, #334155 0%, #0f172a 100%)", color: "white", textAlign: "center", position: "relative" }}>
        <div className="container">
          <h2 style={{ fontSize: "3.5rem", marginBottom: "24px" }}>Ready to Transform Your Smile?</h2>
          <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.7)", marginBottom: "48px", maxWidth: "600px", margin: "0 auto 48px auto" }}>
            Book your consultation today and take the first step towards the confidence you deserve.
          </p>
          <Link to="/appointment">
            <button className="btn-primary" style={{
              padding: "16px 48px", fontSize: "1.2rem", fontWeight: "700",
              border: "none", cursor: "pointer", transition: "transform 0.3s"
            }} onMouseOver={e => e.target.style.transform = "scale(1.05)"} onMouseOut={e => e.target.style.transform = "scale(1)"}>
              Book Consultation Now
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}

function FeatureCard({ icon, title, desc, delay, dark }) {
  return (
    <div className={`${dark ? "glass-card-dark" : "glass-card"} reveal - on - scroll delay - ${delay} `} style={{ textAlign: "center", padding: "40px 24px" }}>
      <div style={{ width: "80px", height: "80px", margin: "0 auto 24px", background: dark ? "rgba(255,255,255,0.1)" : "rgba(59, 130, 246, 0.1)", borderRadius: "24px", display: "flex", alignItems: "center", justifyContent: "center", color: dark ? "#38bdf8" : "#3b82f6", fontSize: "2rem" }}>
        {icon}
      </div>
      <h3 style={{ marginBottom: "16px", fontSize: "1.5rem" }}>{title}</h3>
      <p style={{ color: dark ? "#cbd5e1" : "#64748b" }}>{desc}</p>
    </div>
  );
}

