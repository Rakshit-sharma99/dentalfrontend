import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaCalendarAlt, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { API_URL } from "../config";

export const Profile = () => {
    const { user, setUser } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(user?.name || "");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            setNewName(user.name);
            fetchAppointments();
        }
    }, [user]);

    const fetchAppointments = async () => {
        try {
            const res = await axios.get(`${API_URL}/appointment/myAppointments`, { withCredentials: true });
            setAppointments(res.data);
        } catch (error) {
            console.error("Failed to fetch appointments", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async () => {
        if (!newName.trim()) return toast.error("Name cannot be empty");
        try {
            // Assuming there's an endpoint to update user profile, if not, this acts as a placeholder or needs backend implementation.
            // For now, let's assume /user/update exists or we simulate it.
            await axios.put(`${API_URL}/user/update`, { name: newName }, { withCredentials: true });

            setUser({ ...user, name: newName });
            setIsEditing(false);
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error("Failed to update profile.");
            console.error(error);
        }
    };

    if (!user) return <div className="full-screen flex-center">Loading...</div>;

    return (
        <div className="full-screen" style={{ padding: "120px 20px", position: "relative" }}>
            <div className="mesh-bg">
                <div className="mesh-blob blob-1" style={{ width: '400px', height: '400px', top: '10%', left: '30%' }}></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel"
                style={{ maxWidth: "800px", margin: "0 auto", padding: "40px", borderRadius: "24px" }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "30px", marginBottom: "40px", flexWrap: "wrap" }}>
                    <div style={{
                        width: "100px", height: "100px", borderRadius: "50%",
                        background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "2.5rem", fontWeight: "bold", color: "white",
                        boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)"
                    }}>
                        {user.name?.charAt(0).toUpperCase()}
                    </div>

                    <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "10px" }}>
                            {isEditing ? (
                                <input
                                    className="glass-input"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    style={{ padding: "8px 16px", borderRadius: "8px", fontSize: "1.5rem", fontWeight: "bold", background: "rgba(0,0,0,0.2)" }}
                                />
                            ) : (
                                <h1 style={{ margin: 0, fontSize: "2rem" }}>{user.name}</h1>
                            )}

                            {isEditing ? (
                                <>
                                    <button onClick={handleUpdateProfile} className="btn-gradient" style={{ padding: "8px", borderRadius: "8px", cursor: "pointer" }}><FaSave /></button>
                                    <button onClick={() => setIsEditing(false)} style={{ padding: "8px", background: "transparent", border: "1px solid #ef4444", color: "#ef4444", borderRadius: "8px", cursor: "pointer" }}><FaTimes /></button>
                                </>
                            ) : (
                                <button onClick={() => setIsEditing(true)} style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer" }}><FaEdit size={20} /></button>
                            )}
                        </div>
                        <p style={{ display: "flex", alignItems: "center", gap: "10px", color: "#94a3b8", fontSize: "1.1rem" }}>
                            <FaEnvelope /> {user.email}
                        </p>
                    </div>
                </div>

                <h2 style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "15px", marginBottom: "25px" }}>
                    My Appointments
                </h2>

                {loading ? (
                    <p>Loading appointments...</p>
                ) : appointments.length > 0 ? (
                    <div style={{ display: "grid", gap: "20px" }}>
                        {appointments.map((apt) => (
                            <motion.div
                                key={apt._id}
                                whileHover={{ scale: 1.01 }}
                                style={{
                                    background: "rgba(255,255,255,0.03)",
                                    padding: "20px",
                                    borderRadius: "16px",
                                    border: "1px solid rgba(255,255,255,0.05)",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                    gap: "15px"
                                }}
                            >
                                <div>
                                    <h3 style={{ margin: "0 0 5px 0", color: "#f1f5f9" }}>{apt.service || "Dental Checkup"}</h3>
                                    <div style={{ display: "flex", gap: "20px", color: "#94a3b8", fontSize: "0.9rem" }}>
                                        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><FaCalendarAlt /> {new Date(apt.date).toLocaleDateString()}</span>
                                        <span>{apt.time}</span>
                                    </div>
                                </div>
                                <span style={{
                                    padding: "6px 12px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "600",
                                    background: apt.status === 'Accepted' ? 'rgba(34, 197, 94, 0.2)' : apt.status === 'Declined' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                                    color: apt.status === 'Accepted' ? '#4ade80' : apt.status === 'Declined' ? '#f87171' : '#facc15'
                                }}>
                                    {apt.status}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                        <p>No appointments found.</p>
                        <button className="btn-gradient" style={{ marginTop: "15px", padding: "10px 20px", borderRadius: "20px" }} onClick={() => window.location.href = '/appointment'}>
                            Book Now
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    );
};
