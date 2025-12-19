import { API_URL } from "../config";
import toast from 'react-hot-toast';

export function Logout() {
  async function handleLogout() {
    const res = await fetch(`${API_URL}/user/logout`, {
      method: "POST",
      credentials: "include", // ⭐ cookie delete hogi
    });

    const data = await res.json();
    toast.success(data.msg);

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
