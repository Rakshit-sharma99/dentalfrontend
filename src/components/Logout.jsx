export function Logout() {
  async function handleLogout() {
    const res = await fetch("http://localhost:3000/user/logout", {
      method: "POST",
      credentials: "include", // ⭐ cookie delete hogi
    });

    const data = await res.json();
    alert(data.msg);

    // Optionally reload or navigate
    window.location.reload();
  }

  return (
    <button
      onClick={handleLogout}
      className="btn btn-danger"
      style={{ marginLeft: "20px" }}
    >
      Logout
    </button>
  );
}
