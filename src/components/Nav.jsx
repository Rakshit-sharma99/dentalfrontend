import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { FaTooth, FaBars, FaTimes } from "react-icons/fa";
import { API_URL } from "../config";

export function Nav() {
  const { user, setUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // 🔹 Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Close profile dropdown on route change
  useEffect(() => {
    setShowProfileMenu(false);
  }, [location.pathname]);

  // 🔹 Hide navbar on admin pages
  if (location.pathname.startsWith("/admin")) return null;

  const isActive = (path) =>
    location.pathname === path ? "active" : "";

  // 🔹 Logout
  async function handleLogout() {
    await fetch(`${API_URL}/user/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    navigate("/login");
  }

  // 🔹 Get initials (First + Last name)
  const getInitials = (name = "") => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-content">

        {/* LOGO */}
        <Link to="/" className="nav-brand">
          <FaTooth size={26} color="#0072ff" />
          <span>DentalCare</span>
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* NAV LINKS */}
        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <Link to="/" className={`nav-link ${isActive("/")}`}>Home</Link>
          <Link to="/services" className={`nav-link ${isActive("/services")}`}>Services</Link>

          {/* USER LINKS */}
          {user?.role !== "admin" && (
            <>
              <Link to="/appointment" className="nav-link">Book Appointment</Link>
              {user && (
                <Link to="/myappointments" className="nav-link">My Appointments</Link>
              )}
            </>
          )}

          {/* ADMIN LINK */}
          {user?.role === "admin" && (
            <Link to="/admin" className="nav-link admin-link">
              Admin Panel
            </Link>
          )}

          {/* AUTH / PROFILE */}
          {!user ? (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="btn-primary">Sign Up</Link>
            </>
          ) : (
            <div className="profile-wrapper">
              {/* PROFILE CIRCLE */}
              <div
                className="profile-circle"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                {getInitials(user.name)}
              </div>

              {/* DROPDOWN */}
              {showProfileMenu && (
                <div className="profile-dropdown">
                  <button onClick={() => navigate("/profile")}>
                    👤 Profile
                  </button>
                  <button onClick={handleLogout}>
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
