import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../config";

export function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage("");
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/user/reset-password/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage("Password updated successfully! Redirecting to login...");
                setTimeout(() => navigate("/login"), 3000);
            } else {
                setError(data.msg || "Failed to reset password. Token may be expired.");
            }
        } catch (err) {
            console.error(err);
            setError("Server error. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="glass-card animate-fade-in" style={{ padding: "40px", width: "100%", maxWidth: "450px", textAlign: "center" }}>
                <h2 style={{ marginBottom: "16px", background: "var(--primary-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Reset Password</h2>
                <p style={{ color: "var(--text-muted)", marginBottom: "32px" }}>Enter your new password below.</p>

                {message && (
                    <div style={{ background: "#dcfce7", color: "#166534", padding: "12px", borderRadius: "8px", marginBottom: "20px", fontSize: "0.9rem" }}>
                        {message}
                    </div>
                )}

                {error && (
                    <div style={{ background: "#fee2e2", color: "#991b1b", padding: "12px", borderRadius: "8px", marginBottom: "20px", fontSize: "0.9rem" }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "20px", textAlign: "left" }}>
                        <label style={{ display: "block", marginBottom: "8px" }}>New Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="6"
                            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                        />
                    </div>

                    <div style={{ marginBottom: "24px", textAlign: "left" }}>
                        <label style={{ display: "block", marginBottom: "8px" }}>Confirm Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength="6"
                            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                        />
                    </div>

                    <button disabled={loading} className="btn-primary" style={{ width: "100%", opacity: loading ? 0.7 : 1 }}>
                        {loading ? "Updating..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}
