export function Footer() {
    return (
        <footer style={{
            background: "linear-gradient(to right, #0f172a, #1e293b)",
            color: "#e2e8f0",
            padding: "60px 20px 20px",
            marginTop: "auto",
            borderTop: "1px solid rgba(255,255,255,0.1)"
        }}>
            <div style={{
                maxWidth: "1200px",
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "40px",
                marginBottom: "40px"
            }}>
                {/* Brand Section */}
                <div style={{ textAlign: "left" }}>
                    <h2 style={{
                        color: "#fff",
                        fontSize: "1.8rem",
                        marginBottom: "16px",
                        background: "linear-gradient(45deg, #3b82f6, #60a5fa)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}>
                        Modern Dental Clinic
                    </h2>
                    <p style={{ opacity: 0.8, lineHeight: "1.6" }}>
                        Providing exceptional dental care with a gentle touch. Your smile is our priority.
                    </p>
                </div>

                {/* Contact Section */}
                <div style={{ textAlign: "left" }}>
                    <h3 style={{ color: "#fff", marginBottom: "20px", fontSize: "1.2rem", borderBottom: "2px solid #3b82f6", display: "inline-block", paddingBottom: "5px" }}>
                        Contact Us
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <a href="mailto:mdclinicjalandhar@gmail.com" style={{
                            color: "#94a3b8",
                            textDecoration: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            transition: "color 0.3s"
                        }}
                            onMouseOver={(e) => e.target.style.color = "#60a5fa"}
                            onMouseOut={(e) => e.target.style.color = "#94a3b8"}
                        >
                            <span style={{ fontSize: "1.2rem" }}>📧</span> mdclinicjalandhar@gmail.com
                        </a>

                        <a href="tel:9877214745" style={{
                            color: "#94a3b8",
                            textDecoration: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            transition: "color 0.3s"
                        }}
                            onMouseOver={(e) => e.target.style.color = "#60a5fa"}
                            onMouseOut={(e) => e.target.style.color = "#94a3b8"}
                        >
                            <span style={{ fontSize: "1.2rem" }}>📞</span> +91 98772 14745
                        </a>

                        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#94a3b8" }}>
                            <span style={{ fontSize: "1.2rem" }}>📍</span>
                            <span>Phagwara, Punjab</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div style={{
                textAlign: "center",
                paddingTop: "20px",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                fontSize: "0.9rem",
                opacity: 0.6
            }}>
                <p>&copy; {new Date().getFullYear()} Modern Dental Clinic. Developed by Webaura.</p>
            </div>
        </footer>
    );
}
