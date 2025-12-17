import { useEffect, useState } from "react";
import { FaCalendarCheck, FaClock, FaCommentDots } from "react-icons/fa";
import { API_URL } from "../config";

export function MyAppointments() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchMyAppointments() {
    try {
      const res = await fetch(`${API_URL}/appointment/myAppointments`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setApps(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMyAppointments();
  }, []);

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>;

  return (
    <div className="container animate-fade-in" style={{ padding: "40px 20px" }}>
      <h2 style={{ marginBottom: "32px", borderBottom: "1px solid #e2e8f0", paddingBottom: "16px" }}>My History</h2>

      {apps.length === 0 ? (
        <div className="glass-card" style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)" }}>
          <p>You haven't booked any appointments yet.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
          {apps.map((a) => (
            <div key={a._id} className="glass-card" style={{ padding: "24px", position: "relative", overflow: "hidden" }}>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "600", color: "#0072ff" }}>
                  <FaCalendarCheck /> {a.date}
                </div>
                <Badge status={a.status} />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", color: "var(--text-muted)" }}>
                <FaClock /> {a.time}
              </div>

              {a.message && (
                <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "8px", fontSize: "0.9rem" }}>
                  <FaCommentDots style={{ marginRight: "8px", color: "#94a3b8" }} />
                  {a.message}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Badge({ status }) {
  let color = "#475569";
  let bg = "#f1f5f9";
  let text = status || "Pending";

  if (status === "accepted") {
    bg = "#dcfce7";
    color = "#166534";
  } else if (status === "declined") {
    bg = "#fee2e2";
    color = "#991b1b";
  } else if (!status || status === "pending") {
    bg = "#fef9c3";
    color = "#854d0e";
  }

  return (
    <span style={{ background: bg, color: color, padding: "4px 12px", borderRadius: "99px", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase" }}>
      {text}
    </span>
  );
}
