import { useEffect, useState } from "react";
import { API_URL } from "../config";

export function Admin() {
  const [appointments, setAppointments] = useState([]);

  async function loadAppointments() {
    try {
      const res = await fetch(`${API_URL}/appointment/view`, { method: "GET", credentials: "include" });
      const data = await res.json();
      setAppointments(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); }
  }

  useEffect(() => { loadAppointments(); }, []);

  const total = appointments.length;
  const accepted = appointments.filter((a) => a.status === "accepted").length;
  const pending = appointments.filter((a) => !a.status || a.status === "pending").length;

  // Count today's appointments (local date match)
  const todayStr = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD
  const today = appointments.filter((a) => a.date === todayStr).length;

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2rem" }}>Dashboard Overview</h1>
        <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Welcome back, Admin</div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px", marginBottom: "40px" }}>
        <StatCard title="Total Appointments" value={total} color="blue" />
        <StatCard title="Pending Request" value={pending} color="yellow" />
        <StatCard title="Confirmed" value={accepted} color="green" />
        <StatCard title="Today's Bookings" value={today} color="purple" />
      </div>

      {/* Recent Activity Mini Table */}
      <h3 style={{ marginBottom: "16px" }}>Recent Requests</h3>
      <div className="glass-card table-container">
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.slice(-5).reverse().map(apt => (
              <tr key={apt._id}>
                <td style={{ fontWeight: "500" }}>{apt.name}</td>
                <td>{apt.date} <span style={{ fontSize: "0.8em", color: "#94a3b8" }}>at {apt.time}</span></td>
                <td><Badge status={apt.status} /></td>
              </tr>
            ))}
            {appointments.length === 0 && <tr><td colSpan="3" style={{ textAlign: "center", color: "#94a3b8" }}>No activity yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  const colors = {
    blue: { bg: "rgba(0,114,255,0.1)", text: "#0072ff" },
    green: { bg: "rgba(67,233,123,0.1)", text: "#10b981" },
    yellow: { bg: "rgba(252,211,77,0.1)", text: "#f59e0b" },
    purple: { bg: "rgba(147, 51, 234, 0.1)", text: "#9333ea" },
  };
  const theme = colors[color] || colors.blue;

  return (
    <div className="glass-card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
      <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{title}</span>
      <span style={{ fontSize: "2rem", fontWeight: "700", color: theme.text }}>{value}</span>
    </div>
  );
}

function Badge({ status }) {
  let color = "#475569";
  let bg = "#f1f5f9";
  let text = status || "Pending";
  if (status === "accepted") { bg = "#dcfce7"; color = "#166534"; }
  else if (status === "declined") { bg = "#fee2e2"; color = "#991b1b"; }
  else if (!status || status === "pending") { bg = "#fef9c3"; color = "#854d0e"; }
  return <span style={{ background: bg, color: color, padding: "4px 12px", borderRadius: "99px", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase" }}>{text}</span>;
}
