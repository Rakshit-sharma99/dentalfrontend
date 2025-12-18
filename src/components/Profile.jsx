import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { API_URL } from "../config";

export function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [lastLogin, setLastLogin] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  if (!user) return null;

  // 🔹 Get initials (First + Last name)
  const getInitials = (name = "") => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  // 🔹 FETCH USER APPOINTMENTS COUNT
  useEffect(() => {
    async function fetchAppointments() {
      try {
        const res = await fetch(`${API_URL}/appointment/myAppointments`, {
          credentials: "include",
        });

        if (!res.ok) return;

        const data = await res.json();
        setAppointmentsCount(data.length);
      } catch (err) {
        console.error("Failed to load appointments", err);
      }
    }

    fetchAppointments();
  }, []);

  // 🔹 FETCH LAST LOGIN TIME
  useEffect(() => {
    const storedLastLogin = localStorage.getItem("lastLogin");
    if (storedLastLogin) {
      setLastLogin(storedLastLogin);
    }
  }, []);

  // 🔹 MONITOR ONLINE/OFFLINE STATUS
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // 🎨 Gradients
  const gradientPrimary = "linear-gradient(135deg, #6C8CFF 0%, #7B5CFF 100%)";
  const gradientSecondary = "linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: "linear-gradient(135deg, rgba(108,140,255,0.08) 0%, rgba(123,92,255,0.08) 100%)",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div style={{ 
        width: "100%", 
        maxWidth: "400px", // Reduced from 480px
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {/* CARD - Centered and Compact */}
        <div
          style={{
            padding: "32px 28px", // Reduced padding
            borderRadius: "24px", // Slightly smaller radius
            background: "rgba(255,255,255,0.98)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 15px 35px rgba(31,38,135,0.1), 0 0 0 1px rgba(255,255,255,0.8)",
            border: "1px solid rgba(255,255,255,0.8)",
            transition: "transform 0.3s ease",
            width: "100%",
          }}
        >
          {/* HEADER SECTION - More compact */}
          <div style={{ marginBottom: "24px", textAlign: "center" }}>
            <h1
              style={{
                fontSize: "24px", // Reduced from 32px
                fontWeight: "800",
                background: gradientPrimary,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "6px",
                letterSpacing: "-0.3px",
              }}
            >
              Profile Dashboard
            </h1>
            <p style={{ color: "#64748B", fontSize: "13px", fontWeight: "500" }}>
              Manage your account and appointments
            </p>
          </div>

          {/* AVATAR SECTION - Compact */}
          <div style={{ textAlign: "center", marginBottom: "28px", position: "relative" }}>
            {/* Status Indicator */}
            <div style={{
              position: "absolute",
              top: "60px", // Adjusted position
              right: "calc(50% - 40px - 8px)", // Adjusted position
              width: "20px", // Smaller
              height: "20px", // Smaller
              borderRadius: "50%",
              background: isOnline ? "#10B981" : "#EF4444",
              border: "2.5px solid #FFFFFF",
              zIndex: 2,
              boxShadow: "0 0 0 2px rgba(255,255,255,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <div style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#FFFFFF",
              }} />
            </div>

            {/* Avatar - Smaller */}
            <div style={{
              width: "96px", // Reduced from 112px
              height: "96px", // Reduced from 112px
              borderRadius: "50%",
              background: gradientPrimary,
              color: "#fff",
              fontSize: "32px", // Reduced from 40px
              fontWeight: "800",
              margin: "0 auto 16px", // Reduced margin
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 25px rgba(108,140,255,0.3), inset 0 0 0 2px rgba(255,255,255,0.3)",
              position: "relative",
              overflow: "hidden",
            }}>
              {getInitials(user.name)}
            </div>

            <h2
              style={{
                fontSize: "22px", // Reduced from 28px
                fontWeight: "700",
                marginBottom: "6px",
                color: "#1E293B",
                letterSpacing: "-0.2px",
              }}
            >
              {user.name}
            </h2>

            <p style={{ 
              color: "#64748B", 
              fontSize: "14px", // Slightly smaller
              fontWeight: "500",
              marginBottom: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px"
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {user.email}
            </p>

            {/* Status Badges - Compact */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginTop: "12px",
              flexWrap: "wrap",
            }}>
              <span
                style={{
                  padding: "6px 16px", // Smaller padding
                  borderRadius: "999px",
                  background: "rgba(108,140,255,0.12)",
                  color: "#6C8CFF",
                  fontWeight: "600",
                  fontSize: "13px", // Smaller font
                  border: "1px solid rgba(108,140,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: isOnline ? "#10B981" : "#EF4444",
                  display: "inline-block",
                  animation: isOnline ? "pulse 2s infinite" : "none",
                }} />
                {user.role}
              </span>

              <span style={{
                padding: "6px 12px", // Smaller padding
                borderRadius: "999px",
                background: isOnline ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
                color: isOnline ? "#10B981" : "#EF4444",
                fontWeight: "600",
                fontSize: "12px", // Smaller font
                border: `1px solid ${isOnline ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)"}`,
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  {isOnline ? (
                    <path d="M8 12l3 3 5-5" />
                  ) : (
                    <path d="M18 6L6 18M6 6l12 12" />
                  )}
                </svg>
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>
          </div>

          {/* APPOINTMENT COUNT - Compact */}
          <div
            style={{
              padding: "22px", // Reduced padding
              borderRadius: "18px", // Smaller radius
              background: gradientSecondary,
              textAlign: "center",
              border: "1px solid rgba(226,232,240,0.8)",
              marginBottom: "24px", // Reduced margin
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)",
            }}
          >
            <div
              style={{
                fontSize: "36px", // Reduced from 48px
                fontWeight: "900",
                background: gradientPrimary,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "6px",
                letterSpacing: "-0.8px",
              }}
            >
              {appointmentsCount}
            </div>
            <p style={{ 
              color: "#64748B", 
              fontSize: "14px", // Smaller font
              fontWeight: "600",
              letterSpacing: "0.3px",
            }}>
              Total Appointments
            </p>
          </div>

          {/* LAST LOGIN SECTION - Compact */}
          {lastLogin && (
            <div
              style={{
                padding: "16px", // Reduced padding
                borderRadius: "14px", // Smaller radius
                background: "rgba(248,250,252,0.8)",
                border: "1px solid rgba(226,232,240,0.6)",
                marginBottom: "24px", // Reduced margin
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "36px", // Smaller
                  height: "36px", // Smaller
                  borderRadius: "10px", // Smaller radius
                  background: "rgba(108,140,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6C8CFF" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: "12px", color: "#64748B", fontWeight: "500", marginBottom: "2px" }}>
                    Last Login
                  </p>
                  <p style={{ fontSize: "14px", color: "#1E293B", fontWeight: "600" }}>
                    {lastLogin}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* BUTTON - Compact */}
          <button
            onClick={() => navigate("/myappointments")}
            style={{
              width: "100%",
              padding: "16px 20px", // Reduced padding
              borderRadius: "16px", // Smaller radius
              border: "none",
              background: gradientPrimary,
              color: "#fff",
              fontWeight: "600",
              fontSize: "15px", // Slightly smaller font
              cursor: "pointer",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 6px 20px rgba(108,140,255,0.3)",
              letterSpacing: "0.2px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 25px rgba(108,140,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(108,140,255,0.3)";
            }}
          >
            {/* Button Content */}
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              View My Appointments
            </span>
          </button>
        </div>

        {/* Footer Note - Smaller */}
        <p style={{
          textAlign: "center",
          fontSize: "11px", // Smaller font
          color: "#94A3B8",
          marginTop: "16px",
          fontWeight: "500",
          maxWidth: "300px",
        }}>
          Profile updated in real-time • Secure connection
        </p>
      </div>

      {/* Add CSS animations */}
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        
        * {
          transition: all 0.2s ease;
        }
      `}</style>
    </div>
  );
}