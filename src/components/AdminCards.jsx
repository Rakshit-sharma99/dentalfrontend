export function AdminCards(props) {

  // ⭐ ACCEPT Appointment
  async function handleAccept() {
    const res = await fetch(
      `http://localhost:3000/appointment/accept/${props._id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (res.ok) {
      alert("Appointment Accepted ✅");
      props.refresh(); // Refresh UI
    }
  }

  // ⭐ DECLINE Appointment
  async function handleDecline() {
    const res = await fetch(
      `http://localhost:3000/appointment/decline/${props._id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (res.ok) {
      alert("Appointment Declined ❌");
      props.refresh(); // Refresh UI
    }
  }

  // ⭐ DELETE Appointment
  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this appointment?"
    );
    if (!confirmDelete) return;

    const res = await fetch(
      `http://localhost:3000/appointment/delete/${props._id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (res.ok) {
      alert("Appointment Deleted 🗑️");
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
