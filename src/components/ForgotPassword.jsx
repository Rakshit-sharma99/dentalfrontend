import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";

export function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch(`${API_URL}/user/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            // Security: Always show success message regardless of actual result to prevent enumeration
            // But we can parse the JSON just in case backend sends something specific we want to know (though we designed it to be generic)
            await res.json();

            setMessage("If an account exists, a reset link has been sent to your email.");
        } catch (err) {
            console.error(err);
            setMessage("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="glass-card animate-fade-in" style={{ padding: "40px", width: "100%", maxWidth: "450px", textAlign: "center" }}>
                <h2 style={{ marginBottom: "16px", background: "var(--primary-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Forgot Password?</h2>
                <p style={{ color: "var(--text-muted)", marginBottom: "32px" }}>Enter your email to receive a reset link.</p>

                {message && (
                    <div style={{ background: "#dcfce7", color: "#166534", padding: "12px", borderRadius: "8px", marginBottom: "20px", fontSize: "0.9rem" }}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "24px", textAlign: "left" }}>
                        <label style={{ display: "block", marginBottom: "8px" }}>Email Address</label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                        />
                    </div>

                    <button disabled={loading} className="btn-primary" style={{ width: "100%", opacity: loading ? 0.7 : 1 }}>
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>

                <p style={{ marginTop: "24px", color: "var(--text-muted)", fontSize: "0.95rem" }}>
                    Remembered? <Link to="/login" style={{ color: "#0072ff", fontWeight: "600", textDecoration: "none" }}>Back to Login</Link>
                </p>
            </div>
        </div>
    );
}
