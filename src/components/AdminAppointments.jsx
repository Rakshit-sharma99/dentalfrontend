import { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaSearch } from "react-icons/fa";
import { API_URL } from "../config";
import toast from 'react-hot-toast';

export function AdminAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const [loadingAction, setLoadingAction] = useState(null);

    async function loadAppointments() {
        try {
            const res = await fetch(`${API_URL}/appointment/view`, {
                method: "GET",
                credentials: "include",
            });
            const data = await res.json();
            setAppointments(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error fetching admin appointments", err);
        }
    }

    useEffect(() => {
        loadAppointments();
    }, []);

    function handleAction(id, action) {
        toast((t) => (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <p style={{ margin: 0, fontWeight: "500" }}>{action} this appointment?</p>
                <div style={{ display: "flex", gap: "8px" }}>
                    <button
                        onClick={() => {
                            toast.dismiss(t.id);
                            performAction(id, action);
                        }}
                        style={{
                            padding: "6px 12px",
                            background: action === 'delete' || action === 'decline' ? "#ef4444" : "#22c55e",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            textTransform: "capitalize"
                        }}
                    >
                        Yes, {action}
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        style={{
                            padding: "6px 12px", background: "#e5e7eb", color: "#374151", border: "none", borderRadius: "4px", cursor: "pointer"
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), { duration: 5000 });
    }

    async function performAction(id, action) {
        setLoadingAction(id); // Start loading for this specific ID
        try {
            const res = await fetch(`${API_URL}/appointment/${action}/${id}`, {
                method: "PUT",
                credentials: "include",
            });
            if (res.ok) {
                toast.success(`Appointment ${action}ed successfully!`);
                loadAppointments();
            } else {
                toast.error("Action failed. Please try again.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Server error. Please check your connection.");
        } finally {
            setLoadingAction(null); // Stop loading
        }
    }

    const filtered = appointments.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "all"
            ? true
            : statusFilter === "pending"
                ? (!item.status || item.status === "pending")
                : item.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="animate-fade-in">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
                <h1 style={{ fontSize: "2rem" }}>All Appointments</h1>
            </div>

            <div className="glass-card" style={{ padding: "24px", marginBottom: "32px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ flex: 1, position: "relative" }}>
                    <FaSearch style={{ position: "absolute", left: "12px", top: "14px", color: "#94a3b8" }} />
                    <input
                        type="text"
                        placeholder="Search patients..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{ paddingLeft: "40px" }}
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    style={{ width: "200px" }}
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="declined">Declined</option>
                </select>
            </div>

            <div className="glass-card table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Date & Time</th>
                            <th>Contact</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan="6" style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>No appointments found</td></tr>
                        ) : (
                            filtered.map(apt => (
                                <tr key={apt._id}>
                                    <td style={{ fontWeight: "500" }}>{apt.name}</td>
                                    <td>
                                        <div style={{ fontWeight: "500" }}>{apt.date}</div>
                                        <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{apt.time}</div>
                                    </td>
                                    <td>
                                        <div>{apt.email}</div>
                                        <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{apt.phone}</div>
                                    </td>
                                    <td style={{ maxWidth: "200px" }} title={apt.message}>{apt.message || "-"}</td>
                                    <td>
                                        <span className={`badge ${getStatusClass(apt.status)}`}>
                                            {apt.status || "pending"}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: "flex", gap: "8px" }}>
                                            {(!apt.status || apt.status === "pending") && (
                                                <>
                                                    <button
                                                        onClick={() => handleAction(apt._id, "accept")}
                                                        disabled={loadingAction === apt._id}
                                                        className="btn-primary"
                                                        style={{ padding: "8px", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", background: "#22c55e", boxShadow: "none", opacity: loadingAction === apt._id ? 0.7 : 1 }}
                                                        title="Accept"
                                                    >
                                                        {loadingAction === apt._id ? (
                                                            <div className="spinner-border spinner-border-sm" style={{ width: "12px", height: "12px", border: "2px solid white", borderTop: "2px solid transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
                                                        ) : (
                                                            <FaCheck size={12} />
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(apt._id, "decline")}
                                                        disabled={loadingAction === apt._id}
                                                        className="btn-danger"
                                                        style={{ padding: "8px", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", opacity: loadingAction === apt._id ? 0.7 : 1 }}
                                                        title="Decline"
                                                    >
                                                        {loadingAction === apt._id ? (
                                                            <div className="spinner-border spinner-border-sm" style={{ width: "12px", height: "12px", border: "2px solid white", borderTop: "2px solid transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
                                                        ) : (
                                                            <FaTimes size={12} />
                                                        )}
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

function getStatusClass(status) {
    if (!status || status === "pending") return "warning";
    if (status === "accepted") return "success";
    if (status === "declined") return "danger";
    return "default";
}
