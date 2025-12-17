import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { API_URL } from "../config";

export function Appointment() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Available services
  const services = [
    "General Consultation",
    "Teeth Whitening",
    "Root Canal Treatment",
    "Dental Implants",
    "Orthodontics (Braces)",
    "Pediatric Dentistry",
    "Oral Surgery"
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    // Service from state or default
    message: location.state?.service ? `Service Request: ${location.state.service}` : ""
  });

  // Also track separate service selection if needed, but backend often puts it in message or a specific field.
  // The user asked for "Service selection option". I'll add a dropdown and append it to the message 
  // OR if the backend allows a 'service' field. The current backend Appointment model wasn't explicitly analyzed for 'service' field,
  // but looking at previous code 'message' was used. I'll stick to appending to message or just sending it as a field if backend ignores extra fields it's fine.
  // Ideally I should check backend, but to be safe I'll put it in 'message' for the admin to see clearly.
  // WAIT, I should check if I can modify backend. "integrate ... without altering backend logic". 
  // So I MUST put it in 'message' as the backend likely only accepts {name, email, phone, date, time, message}.

  const [selectedService, setSelectedService] = useState(location.state?.service || "");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Pre-fill data
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || ""
      }));
    }
  }, [user]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!user) {
      setError("Please login to book an appointment.");
      setLoading(false);
      return;
    }

    // Combine service into message for backend compatibility
    const finalMessage = `[Service: ${selectedService}] ${formData.message}`;

    const submissionData = {
      ...formData,
      message: finalMessage
    };

    try {
      const res = await fetch(`${API_URL}/appointment`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.message || (data.errors && data.errors[0]?.msg) || "Booking failed");
      }
    } catch (err) {
      console.error("Booking Error:", err);
      setError("Server connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Get today's date for min attribute
  const today = new Date().toISOString().split("T")[0];

  if (success) {
    return (
      <div className="container" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="glass-card animate-fade-in" style={{ padding: "40px", maxWidth: "500px", textAlign: "center" }}>
          <div style={{ width: "80px", height: "80px", background: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <FaCalendarAlt size={40} color="#166534" />
          </div>
          <h2 style={{ marginBottom: "16px", color: "var(--text-dark)" }}>Appointment Booked!</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "32px" }}>
            Thank you, <strong>{formData.name}</strong>. Your request for <strong>{selectedService}</strong> on <strong>{formData.date}</strong> has been received.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            <Link to="/myappointments">
              <button className="btn-primary">View My Appointments</button>
            </Link>
            <Link to="/">
              <button className="btn-secondary">Go Home</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <div className="glass-card animate-fade-in" style={{ maxWidth: "800px", margin: "0 auto", display: "flex", overflow: "hidden", flexDirection: "row", flexWrap: "wrap" }}>

        <div style={{ flex: "1.5", padding: "40px", minWidth: "300px" }}>
          <h2 style={{ marginBottom: "8px" }}>Book an Appointment</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "32px" }}>Select a service and time that works for you.</p>

          {error && <div style={{ background: "#fee2e2", color: "#991b1b", padding: "12px", borderRadius: "8px", marginBottom: "20px" }}>{error}</div>}

          <form onSubmit={handleSubmit}>

            <div style={{ marginBottom: "20px" }}>
              <label>Select Service</label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                required
              >
                <option value="" disabled>-- Choose a Service --</option>
                {services.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <div>
                <label>Name</label>
                <input type="text" id="name" value={formData.name} onChange={handleChange} required placeholder="Your Name" />
              </div>
              <div>
                <label>Phone</label>
                <input type="tel" id="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 XXXXX-XXXXX" maxLength="10" />
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label>Email</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <div>
                <label>Date</label>
                {/* Restrict past dates */}
                <input type="date" id="date" value={formData.date} onChange={handleChange} required min={today} />
              </div>
              {/* Time Slots (Simplified) */}
              <div style={{ gridColumn: "1 / -1", marginTop: "16px" }}>
                <label style={{ display: "block", marginBottom: "12px" }}>Select Time Slot</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "10px" }}>
                  {["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"].map(slot => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => handleChange({ target: { id: "time", value: slot } })}
                      style={{
                        padding: "10px",
                        borderRadius: "8px",
                        border: formData.time === slot ? "2px solid #3b82f6" : "1px solid #e2e8f0",
                        background: formData.time === slot ? "#eff6ff" : "white",
                        color: formData.time === slot ? "#1d4ed8" : "inherit",
                        fontWeight: formData.time === slot ? "600" : "400",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                {/* Hidden input to satisfy required prop if standard submission used (but we use state) */}
                <input type="hidden" id="time" value={formData.time} required />
              </div>
            </div>

            <div style={{ marginBottom: "32px" }}>
              <label>Additional Notes</label>
              <textarea id="message" value={formData.message} onChange={handleChange} rows="3" placeholder="Any specific concerns?"></textarea>
            </div>

            {!user ? (
              <div style={{ textAlign: "center" }}>
                <p style={{ color: "var(--text-muted)", marginBottom: "16px" }}>You must be logged in to book.</p>
                <Link to="/login"><button type="button" className="btn-primary">Login to Book</button></Link>
              </div>
            ) : (
              <button disabled={loading} className="btn-primary" style={{ width: "100%", opacity: loading ? 0.7 : 1 }}>
                {loading ? "Booking..." : "Confirm Booking"}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
