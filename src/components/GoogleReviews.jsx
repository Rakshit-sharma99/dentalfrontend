import { motion } from "framer-motion";
import { FaStar, FaGoogle } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";

export const GoogleReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                // Determine API URL (using API_URL config or default localhost)
                const baseUrl = API_URL || "http://localhost:3000";
                const res = await axios.get(`${baseUrl}/api/reviews`);

                // Map Google API or Mock structure to Component structure
                // Google: author_name, profile_photo_url, rating, text
                // Mock: name, image, rating, text
                const mappedReviews = res.data.map(r => ({
                    id: r.time || Math.random(), // Google gives 'time' timestamp
                    name: r.author_name || r.name,
                    image: r.profile_photo_url || r.image,
                    rating: r.rating,
                    text: r.text
                }));

                setReviews(mappedReviews);
            } catch (error) {
                console.error("Failed to load reviews", error);
                // Fallback hardcoded if fetch fails completely (backend down)
                setReviews([
                    { name: "Happy Patient", text: "Great service!", rating: 5, image: "https://randomuser.me/api/portraits/lego/1.jpg" }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    if (loading) return null; // Or a loader

    return (
        <div style={{ overflow: "hidden", padding: "60px 0", position: "relative" }}>

            <div className="container" style={{ textAlign: "center", marginBottom: "40px" }}>
                <h2 className="text-gradient" style={{ fontSize: "2.5rem", marginBottom: "10px", display: "inline-flex", alignItems: "center", gap: "15px" }}>
                    <FaGoogle color="#ea4335" /> Patient Love
                </h2>
                <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>Rated 5.0/5.0 by our amazing patients</p>
            </div>

            {/* Marquee Wrapper */}
            <div style={{ display: "flex", width: "100%", overflow: "hidden", maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
                <motion.div
                    style={{ display: "flex", gap: "30px", paddingLeft: "30px" }}
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                >
                    {/* Render reviews twice (or more) to create seamless loop if we have enough items */}
                    {(reviews.length < 5 ? [...reviews, ...reviews, ...reviews, ...reviews] : [...reviews, ...reviews]).map((review, index) => (
                        <div
                            key={`${review.id}-${index}`}
                            className="glass-panel"
                            style={{
                                minWidth: "350px",
                                maxWidth: "350px",
                                padding: "25px",
                                borderRadius: "20px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "15px"
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <img
                                        src={review.image}
                                        alt={review.name}
                                        referrerPolicy="no-referrer"
                                        style={{ width: "50px", height: "50px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.1)" }}
                                    />
                                    <div>
                                        <h4 style={{ margin: 0, fontSize: "1rem", color: "var(--text-main)" }}>{review.name}</h4>
                                        <div style={{ display: "flex", gap: "2px", color: "#facc15", fontSize: "0.8rem", marginTop: "2px" }}>
                                            {[...Array(Math.round(review.rating))].map((_, i) => <FaStar key={i} />)}
                                        </div>
                                    </div>
                                </div>
                                <FaGoogle size={20} color="#94a3b8" />
                            </div>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6", fontStyle: "italic", maxHeight: "100px", overflow: "hidden", textOverflow: "ellipsis" }}>
                                "{review.text}"
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="flex-center" style={{ marginTop: "40px" }}>
                <a
                    href={`https://www.google.com/maps/search/?api=1&query=Modern Dental Clinic | Best dentist in Phagwara | Best Oral Surgeon in Phagwara | Dentist near Lpu | Dr Riar 's Dental Clinic&query_place_id=${"ChIJQ5spMHJGIjRkjP9tAVHDBU"}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-gradient"
                    style={{
                        padding: "12px 30px",
                        borderRadius: "30px",
                        textDecoration: "none",
                        fontWeight: "bold",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px"
                    }}
                >
                    Write a Review <FaStar />
                </a>
            </div>
        </div>
    );
};
