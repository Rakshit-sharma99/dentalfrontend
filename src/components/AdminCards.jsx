
import { API_URL } from "../config";
import toast from 'react-hot-toast';

export function AdminCards(props) {

  // ⭐ ACCEPT Appointment
  async function handleAccept() {
    const res = await fetch(
      `${API_URL}/appointment/accept/${props._id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (res.ok) {
      toast.success("Appointment Accepted ✅");
      props.refresh(); // Refresh UI
    }
  }

  // ⭐ DECLINE Appointment
  async function handleDecline() {
    const res = await fetch(
      `${API_URL}/appointment/decline/${props._id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (res.ok) {
      toast.success("Appointment Declined ❌");
      props.refresh(); // Refresh UI
    }
  }

  // ⭐ DELETE Appointment
  function handleDelete() {
    toast((t) => (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <p style={{ margin: 0, fontWeight: "500" }}>Delete this appointment?</p>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              performDelete();
            }}
            style={{
              padding: "6px 12px", background: "#ef4444", color: "white", border: "none", borderRadius: "4px", cursor: "pointer"
            }}
          >
            Yes, Delete
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
    ));
  }

  async function performDelete() {
    const res = await fetch(
      `${API_URL}/appointment/delete/${props._id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (res.ok) {
      toast.success("Appointment Deleted 🗑️");
      props.refresh(); // Refresh after deletion
    }
  }

  return (
    <div
      className="card"
      style={{
        width: "18rem",
        padding: "15px",
        borderRadius: "12px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div className="card-body">

        <h5 className="card-title" style={{ fontWeight: "bold" }}>
          {props.name}
        </h5>

        <p className="card-text"><strong>Email:</strong> {props.email}</p>
        <p className="card-text"><strong>Phone:</strong> {props.phone}</p>
        <p className="card-text"><strong>Date:</strong> {props.date}</p>
        <p className="card-text"><strong>Time:</strong> {props.time}</p>
        <p className="card-text"><strong>Status:</strong> {props.status}</p>

        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleAccept}
          >
            Accept
          </button>

          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDecline}
          >
            Decline
          </button>

          <button
            type="button"
            className="btn btn-warning"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}
