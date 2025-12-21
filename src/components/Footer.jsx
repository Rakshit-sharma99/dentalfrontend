
import { FaTooth, FaFacebookF, FaInstagram, FaTwitter, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

export const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">

                {/* Brand Section */}
                <div className="footer-section brand">
                    <div className="brand-logo">
                        <FaTooth size={30} color="#3b82f6" />
                        <h2 className="text-gradient">DentalCare</h2>
                    </div>
                    <p className="brand-desc">
                        Redefining dental excellence with cutting-edge technology and a passion for your smile. Experience the future of dentistry today.
                    </p>
                    <div className="social-links">
                        <a href="https://www.instagram.com/moderndentalclinicphagwara?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="social-icon"><FaInstagram /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer-section links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/appointment">Book Appointment</Link></li>
                        <li><Link to="/profile">My Profile</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </div>

                {/* Services */}
                <div className="footer-section links">
                    <h3>Services</h3>
                    <ul>
                        <li><Link to="/services">Cosmetic Dentistry</Link></li>
                        <li><Link to="/services">Root Canals</Link></li>
                        <li><Link to="/services">Implantology</Link></li>
                        <li><Link to="/services">Orthodontics</Link></li>
                        <li><Link to="/services">Pediatric Care</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="footer-section contact">
                    <h3>Contact Us</h3>
                    <div className="contact-item">
                        <FaMapMarkerAlt className="icon" />
                        <a
                            href="https://maps.app.goo.gl/7kafUVcgX5EZmGzq9"
                            target="_blank"
                            rel="noreferrer"
                            className="btn-gradient"
                            style={{ padding: "8px 16px", borderRadius: "20px", fontSize: "0.9rem", textDecoration: "none", display: "inline-block" }}
                        >
                            Get Directions
                        </a>
                    </div>
                    <div className="contact-item">
                        <FaPhoneAlt className="icon" />
                        <p><a href="tel:+919877214745">+91 98772-14745</a></p>
                    </div>
                    <div className="contact-item">
                        <FaEnvelope className="icon" />
                        <p><a href="mailto:mdclinicjalandhar@gmail.com">mdclinicjalandhar@gmail.com</a></p>
                    </div>
                </div>

            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Modern Dental Clinic. All rights reserved.</p>
                <p>Designed with ❤️ for your smile- Webaura</p>
            </div>
        </footer>
    );
};
