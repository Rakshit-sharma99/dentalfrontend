import './Footer.css';

export function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                {/* Brand Section */}
                <div className="footer-brand">
                    <h2>Modern Dental Clinic</h2>
                    <p>
                        Experience world-class dental care with a gentle touch.
                        We blend modern technology with compassionate care to create
                        healthy, beautiful smiles that last a lifetime.
                    </p>
                </div>

                {/* Contact Section */}
                <div className="footer-contact">
                    <h3>Get in Touch</h3>
                    <div className="contact-links">
                        <a href="mailto:mdclinicjalandhar@gmail.com" className="contact-item">
                            <span className="contact-icon">📧</span>
                            <span>mdclinicjalandhar@gmail.com</span>
                        </a>

                        <a href="tel:9877214745" className="contact-item">
                            <span className="contact-icon">📞</span>
                            <span>+91 98772 14745</span>
                        </a>

                        <div className="contact-item">
                            <span className="contact-icon">📍</span>
                            <span>Phagwara, Punjab</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Modern Dental Clinic. Excellence in Dentistry.</p>
                <p style={{ fontSize: '0.8em', marginTop: '5px', opacity: 0.7 }}>Developed with ❤️ by Webaura</p>
            </div>
        </footer>
    );
}
