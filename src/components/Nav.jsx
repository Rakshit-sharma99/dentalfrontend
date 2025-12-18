import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { FaTooth, FaBars, FaTimes } from "react-icons/fa";

import { API_URL } from "../config";

export function Nav() {
  const { user, setUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide nav on admin routes
  if (location.pathname.startsWith("/admin")) return null;

  const isActive = (path) => location.pathname === path ? "active" : "";

  async function handleLogout() {
    try {
      await fetch(`${API_URL}/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-content">
        <Link to="/" className="nav-brand" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaTooth size={28} color="#0072ff" />
          <span>DentalCare</span>
        </Link>

        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <Link to="/" className={`nav-link ${isActive("/")}`} onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/services" className={`nav-link ${isActive("/services")}`} onClick={() => setIsOpen(false)}>Services</Link>

          {/* User Links - HIDE if Admin */}
          {user?.role !== "admin" && (
            <>
              <Link to="/appointment" className={`nav-link ${isActive("/appointment")}`} onClick={() => setIsOpen(false)}>Book Appointment</Link>
              {user && (
                <Link to="/myappointments" className={`nav-link ${isActive("/myappointments")}`} onClick={() => setIsOpen(false)}>My Appointments</Link>
              )}
            </>
          )}

          {/* Admin Link */}
          {user?.role === "admin" && (
            <Link to="/admin" className={`nav-link ${isActive("/admin")}`} style={{ color: "#d946ef", fontWeight: "bold" }} onClick={() => setIsOpen(false)}>Admin Panel</Link>
          )}

          {/* Auth Buttons */}
          {/*!user ? (
            <>
              <Link to="/login" className="nav-link" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/signup">
                <button className="btn-primary" style={{ padding: "8px 24px", fontSize: "0.9rem" }} onClick={() => setIsOpen(false)}>
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <Link to="/profile" className={`nav-link ${isActive("/profile")}`} onClick={() => setIsOpen(false)}>
                Profile
              </Link>
              <button onClick={handleLogout} className="logout-btn-container">
                <span className="logout-text">Logout</span>
                <div className="logout-profile-circle">
                  {user.name ? user.name.substring(0, 2).toUpperCase() : "U"}
                </div>
              </button>
            </div>
          )*/}
          {/* Auth Buttons */}
          {!user ? (
            <>
              <Link to="/login" className="nav-link" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/signup">
                <button className="btn-primary" style={{ padding: "8px 24px", fontSize: "0.9rem" }} onClick={() => setIsOpen(false)}>
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Link to="/profile" style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
                <div
                  className="logout-profile-circle"
                  title="Go to Profile"
                  style={{
                    width: "45px",
                    height: "45px",
                    background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                    color: "white",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    boxShadow: "0 4px 10px rgba(37, 99, 235, 0.2)",
                    border: "2px solid white"
                  }}
                >
                  {user.name ? user.name.substring(0, 2).toUpperCase() : "U"}
                </div>
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  background: "#fee2e2",
                  color: "#ef4444",
                  border: "none",
                  padding: "8px 20px",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  transition: "background 0.2s"
                }}
                onMouseOver={(e) => e.target.style.background = "#fecaca"}
                onMouseOut={(e) => e.target.style.background = "#fee2e2"}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
