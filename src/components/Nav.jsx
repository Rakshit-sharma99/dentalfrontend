import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { FaTooth, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { API_URL } from "../config";

export function Nav() {
  const { user, setUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide nav on admin routes
  if (location.pathname.startsWith("/admin")) return null;

  async function handleLogout() {
    try {
      await fetch(`${API_URL}/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      navigate("/");
      setIsOpen(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  const navVariants = {
    hidden: { y: -100 },
    visible: { y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: "auto", transition: { duration: 0.3 } }
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={scrolled ? "glass-panel" : ""}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        padding: "15px 0",
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(15, 23, 42, 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.1)" : "none"
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>

        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div className="nav-logo-icon">
            <FaTooth size={30} color="#3b82f6" />
          </div>
          <span className="text-gradient" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>DentalCare</span>
        </Link>

        {/* Mobile Controls */}
        <button
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: "transparent",
            border: "none",
            color: "#f1f5f9",
            fontSize: "1.5rem",
            cursor: "pointer",
            display: "none" // Managed by CSS
          }}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Links */}
        <div className="desktop-links" style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          {['/', '/services', '/appointment'].map((path) => (
            <Link
              key={path}
              to={path}
              className={location.pathname === path ? "nav-link active" : "nav-link"}
              style={{
                color: location.pathname === path ? "#3b82f6" : "#cbd5e1",
                textDecoration: "none",
                fontWeight: "500",
                transition: "color 0.3s"
              }}
            >
              {path === '/' ? 'Home' : path.replace('/', '').charAt(0).toUpperCase() + path.slice(2)}
            </Link>
          ))}

          {user?.role === 'admin' && (
            <Link to="/admin" style={{ color: "#d946ef", fontWeight: "bold", textDecoration: "none" }}>Admin Panel</Link>
          )}

          {!user ? (
            <div style={{ display: "flex", gap: "10px" }}>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-button"
                  style={{ padding: "10px 24px", borderRadius: "30px", fontSize: "0.9rem", cursor: "pointer", border: "1px solid rgba(255,255,255,0.2)", color: "white", background: "transparent" }}
                >
                  Login
                </motion.button>
              </Link>
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-gradient"
                  style={{ padding: "10px 24px", borderRadius: "30px", fontSize: "0.9rem", cursor: "pointer", border: "none" }}
                >
                  Sign Up
                </motion.button>
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <Link to="/profile">
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: "bold", color: "white"
                }}>
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
              </Link>
              <button onClick={handleLogout} style={{ background: "transparent", border: "1px solid #ef4444", color: "#ef4444", padding: "8px 16px", borderRadius: "20px", cursor: "pointer" }}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            style={{
              background: "rgba(15, 23, 42, 0.98)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              padding: "20px 0"
            }}
          >
            {['/', '/services', '/appointment'].map((path) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "1.2rem",
                  padding: "10px",
                  width: "100%",
                  textAlign: "center"
                }}
              >
                {path === '/' ? 'Home' : path.replace('/', '').charAt(0).toUpperCase() + path.slice(2)}
              </Link>
            ))}

            {/* Mobile Admin Link */}
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                style={{ color: "#d946ef", fontWeight: "bold", textDecoration: "none", fontSize: "1.2rem", padding: "10px" }}
              >
                Admin Panel
              </Link>
            )}

            {!user ? (
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <button className="btn-gradient" style={{ padding: "10px 40px", borderRadius: "30px" }}>Login</button>
              </Link>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
                <Link to="/profile" onClick={() => setIsOpen(false)} style={{ color: "white", textDecoration: "none" }}>My Profile</Link>
                <button onClick={handleLogout} style={{ color: "#ef4444", background: "transparent", border: "1px solid #ef4444", padding: "8px 24px", borderRadius: "20px" }}>Logout</button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
