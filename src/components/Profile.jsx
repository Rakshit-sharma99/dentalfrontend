import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaCalendarCheck, FaSignOutAlt, FaKey } from "react-icons/fa";
import { API_URL } from "../config";
import toast from 'react-hot-toast';

export function Profile() {
    const { user, setUser } = useAuth(); // Assuming logout might be available in context, else we handle it manually
    const navigate = useNavigate();
    const [appointmentCount, setAppointmentCount] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState("");
    const [loading, setLoading] = useState(false);

    // Initialize newName with current name when user loads
    useEffect(() => {
        if (user?.name) setNewName(user.name);
    }, [user]);

    async function handleUpdateProfile() {
        if (!newName.trim()) return;
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/user/update-profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: newName }),
                credentials: "include"
            });
            const data = await res.json();

            if (res.ok) {
                // Update local context
                setUser(prev => ({ ...prev, name: data.user.name }));
                setIsEditing(false);
                toast.success("Name updated successfully!");
            } else {
                toast.error(data.msg || "Update failed");
            }
        } catch (err) {
            console.error("Profile update error", err);
            toast.error("Server connection failed");
        } finally {
            setLoading(false);
        }
    }

    // Logout Logic
    async function handleLogout() {
        try {
            await fetch(`${API_URL}/user/logout`, { method: "POST", credentials: "include" });
            setUser(null);
            navigate("/login");
        } catch (err) {
            console.error("Logout failed", err);
        }
    }

    // Fetch Appointment Stats
    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch(`${API_URL}/appointment/myAppointments`, {
                    credentials: "include"
                });
                if (res.ok) {
                    const data = await res.json();
                    setAppointmentCount(Array.isArray(data) ? data.length : 0);
                }
            } catch (err) {
                console.error("Error fetching stats", err);
            }
        }
        if (user) fetchStats();
    }, [user]);

    if (!user) {
        return (
            <div style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <p>Loading Profile...</p>
            </div>
        );
    }

    // Get Initials
    const initials = user.name
        ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2)
        : "U";

    return (
        <div className="container" style={{ minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>

            <div className="glass-card animate-fade-in" style={{ width: "100%", maxWidth: "400px", padding: "40px", textAlign: "center", borderRadius: "24px" }}>

                {/* Header */}
                <h2 style={{ color: "#3b82f6", marginBottom: "8px", fontWeight: "700" }}>Profile Dashboard</h2>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "32px" }}>Manage your account and appointments</p>

                {/* Avatar */}
                <div style={{
                    width: "130px",
                    height: "130px",
                    background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                    borderRadius: "50%",
                    margin: "0 auto 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
                    position: "relative"
                }}>
                    <span style={{ fontSize: "3.5rem", fontWeight: "700", color: "white" }}>{initials}</span>
                    <div style={{
                        position: "absolute",
                        bottom: "8px",
                        right: "8px",
                        width: "24px",
                        height: "24px",
                        background: "#22c55e",
                        border: "4px solid white",
                        borderRadius: "50%"
                    }}></div>
                </div>

                {/* User Info */}
                <div style={{ marginBottom: "24px" }}>
                    {isEditing ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                style={{
                                    padding: "8px 12px",
                                    borderRadius: "8px",
                                    border: "1px solid #cbd5e1",
                                    fontSize: "1.1rem",
                                    textAlign: "center",
                                    width: "80%"
                                }}
                            />
                            <div style={{ display: "flex", gap: "10px" }}>
                                <button
                                    onClick={handleUpdateProfile}
                                    disabled={loading}
                                    style={{
                                        background: "#22c55e", color: "white", border: "none", padding: "8px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "0.95rem"
                                    }}
                                >
                                    {loading ? "Saving..." : "Save Changes"}
                                </button>
                                <button
                                    onClick={() => { setIsEditing(false); setNewName(user.name); }}
                                    style={{
                                        background: "#94a3b8", color: "white", border: "none", padding: "8px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "0.95rem"
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                            <h3 style={{ fontSize: "1.8rem", marginBottom: "4px", fontWeight: "700", color: "#1e293b" }}>{user.name}</h3>
                            <button
                                onClick={() => setIsEditing(true)}
                                style={{
                                    background: "#eff6ff", border: "1px solid #bfdbfe", color: "#3b82f6", padding: "4px 10px", borderRadius: "20px", cursor: "pointer", fontSize: "0.8rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px"
                                }}
                            >
                                ✎ Edit
                            </button>
                        </div>
                    )}
                </div>
                <p style={{ color: "var(--text-muted)", marginBottom: "32px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                    <span style={{ fontSize: "1.2rem" }}>✉️</span> {user.email}
                </p>

                {/* Status Badges */}
                <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "32px" }}>
                    <span style={{ background: "#e0f2fe", color: "#0369a1", padding: "6px 16px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "600" }}>
                        ● {user.role || "user"}
                    </span>
                    <span style={{ background: "#dcfce7", color: "#15803d", padding: "6px 16px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "600" }}>
                        ✓ Online
                    </span>
                </div>

                {/* Stats Card */}
                <div style={{ background: "rgba(255,255,255,0.6)", borderRadius: "20px", padding: "24px", marginBottom: "32px", border: "1px solid rgba(255,255,255,0.8)", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
                    <div style={{ fontSize: "3rem", fontWeight: "800", color: "#3b82f6", lineHeight: "1", marginBottom: "8px" }}>{appointmentCount}</div>
                    <div style={{ color: "#64748b", fontSize: "0.95rem", fontWeight: "500" }}>Total Appointments</div>
                </div>

                {/* Actions */}
                <Link to="/myappointments" style={{ textDecoration: "none" }}>
                    <button className="btn-primary" style={{ width: "100%", marginBottom: "16px", padding: "12px", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", borderRadius: "12px" }}>
                        <FaCalendarCheck /> View My Appointments
                    </button>
                </Link>

                {/* Styled Logout Button */}
                <button
                    onClick={handleLogout}
                    style={{
                        width: "100%",
                        padding: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        background: "#fff1f2",
                        color: "#e11d48",
                        border: "1px solid #fda4af",
                        borderRadius: "12px",
                        fontSize: "1rem",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s"
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.background = "#ffe4e6"; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = "#fff1f2"; }}
                >
                    <FaSignOutAlt /> Logout
                </button>

            </div>
        </div>
    );
}
