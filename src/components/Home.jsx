import { motion, useScroll, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaTooth, FaRegSmileBeam, FaUserMd, FaArrowRight, FaStar } from 'react-icons/fa';
import { GoogleReviews } from './GoogleReviews';
import { SpotlightGrid } from './SpotlightGrid';

export const Home = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.2 } }
  };

  return (
    <div style={{ position: "relative", overflowX: "hidden" }}>
      {/* Progress Bar */}
      <motion.div
        style={{
          scaleX,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "#3b82f6",
          transformOrigin: "0%",
          zIndex: 1000
        }}
      />

      <section style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <div className="mesh-bg" />
        <SpotlightGrid />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{ textAlign: "center", zIndex: 10, padding: "0 20px" }}
        >
          <h5 style={{ color: "#60a5fa", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "16px", fontWeight: "bold" }}>Welcome to the Future</h5>
          <h1 className="text-gradient" style={{ fontSize: "clamp(3rem, 5vw, 5rem)", fontWeight: "800", marginBottom: "30px", lineHeight: "1.1" }}>
            Designing Smiles<br />Changing Lives
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#94a3b8", maxWidth: "600px", margin: "0 auto 40px" }}>
            We blend art and science to create stunning, healthy smiles in a relaxing, spa-like environment.
          </p>

          <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/appointment')}
              className="btn-gradient"
              style={{ padding: "16px 32px", borderRadius: "50px", fontSize: "1.1rem", fontWeight: "bold", display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
            >
              Book Application <FaArrowRight />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/services')}
              style={{ padding: "16px 32px", borderRadius: "50px", fontSize: "1.1rem", fontWeight: "bold", background: "transparent", border: "1px solid rgba(255,255,255,0.3)", color: "white", cursor: "pointer" }}
            >
              Our Services
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "100px 20px", background: "#1e293b" }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="responsive-grid"
          style={{ maxWidth: "1200px", margin: "0 auto" }}
        >
          {[
            { icon: <FaUserMd />, title: "Expert Dentists", desc: "Top-tier professionals dedicated to your care." },
            { icon: <FaTooth />, title: "Modern Tech", desc: "Digital X-rays, 3D Imaging, and Laser dentistry." },
            { icon: <FaRegSmileBeam />, title: "Painless Care", desc: "Advanced sedation for a anxiety-free experience." }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="glass-panel"
              style={{ padding: "40px", borderRadius: "24px", textAlign: "center" }}
              whileHover={{ y: -10 }}
            >
              <div style={{ fontSize: "3rem", color: "#60a5fa", marginBottom: "20px" }}>{item.icon}</div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "10px", color: "white" }}>{item.title}</h3>
              <p style={{ color: "#94a3b8" }}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* TESTIMONIALS / GOOGLE REVIEWS */}
      <section style={{ padding: "60px 0", background: "#1e293b" }}>
        <GoogleReviews />
      </section>
    </div>
  );
};
