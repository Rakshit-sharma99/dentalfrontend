import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaTooth, FaChartBar, FaCalendarCheck, FaUserInjured, FaCog, FaSignOutAlt } from "react-icons/fa";

export function AdminLayout() {
  const { user, loading, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading || !user || user.role !== "admin") return null; // or loading spinner

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      {/* SIDEBAR */}
      <aside style={{ width: "260px", background: "#0f172a", color: "white", padding: "24px", display: "flex", flexDirection: "column", position: "fixed", height: "100%", left: 0, top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "40px", paddingLeft: "12px" }}>
          <FaTooth size={24} color="#00c6ff" />
          <h2 style={{ fontSize: "1.2rem", margin: 0 }}>DentalAdmin</h2>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
          <Link to="/admin" className={`admin-link ${isActive("/admin")}`} style={navLinkStyle}>
            <FaChartBar /> Dashboard
          </Link>
          <Link to="/admin/appointments" className={`admin-link ${isActive("/admin/appointments")}`} style={navLinkStyle}>
            <FaCalendarCheck /> Appointments
          </Link>
        </nav>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px" }}>
          <button onClick={() => navigate("/")} style={{ ...navLinkStyle, background: "rgba(255,255,255,0.05)", border: "none", width: "100%", cursor: "pointer", marginBottom: "12px", justifyContent: "center" }}>
            Back to Website
          </button>
          <button onClick={() => { setUser(null); navigate("/"); }} style={{ ...navLinkStyle, background: "none", border: "none", width: "100%", cursor: "pointer", color: "#ef4444" }}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ marginLeft: "260px", padding: "40px", width: "100%", overflowX: "hidden" }}>
        <Outlet />
      </main>
    </div>
  );
}

const navLinkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 16px",
  borderRadius: "12px",
  color: "#94a3b8",
  textDecoration: "none",
  transition: "all 0.3s ease",
  fontSize: "0.95rem",
  fontWeight: "500",
};

// Add this CSS to App.css or global styles to handle hover/active states better if possible,
// strictly speaking inline styles allow basic hover but 'isActive' class logic needs CSS.
// For now, I rely on the class logic if I added it to App.css, but I haven't. created .admin-link there.
// I'll add the styles to App.css concurrently or just assume basic functionality.
// To ensure it looks good, I'll add a <style> block or just update App.css later.

