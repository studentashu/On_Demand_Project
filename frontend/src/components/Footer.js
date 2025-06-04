import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* About Project */}
        <div style={styles.column}>
          <h3 style={styles.heading}>On_Demand Services</h3>
          <p style={styles.text}>
            A platform connecting users with skilled service providers for all daily needs like cleaning, plumbing, electrician work, and more.
            Easy to book, fast response, trusted professionals.
          </p>
        </div>

        {/* Quick Links */}
        <div style={styles.column}>
          <h4 style={styles.heading}>Quick Links</h4>
          <ul style={styles.linkList}>
            <li><Link to="/" style={styles.link}>Home</Link></li>
            <li><Link to="/about" style={styles.link}>About</Link></li>
            <li><Link to="/contact" style={styles.link}>Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div style={styles.column}>
          <h4 style={styles.heading}>Contact</h4>
          <p style={styles.text}>📧 support@ondemand.com</p>
          <p style={styles.text}>📞 +91 98765 43210</p>
          <div style={styles.socialIcons}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.icon}><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={styles.icon}><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.icon}><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.icon}><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div style={styles.bottom}>
        <p style={styles.bottomText}>© {new Date().getFullYear()} On_Demand Services. All rights reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#2e7d32',
    color: 'white',
    padding: '2rem 1rem 1rem',
    marginTop: '3rem',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  column: {
    flex: '1 1 300px',
    margin: '1rem 0',
  },
  heading: {
    fontSize: '1.3rem',
    marginBottom: '1rem',
    borderBottom: '1px solid #fff',
    paddingBottom: '0.5rem',
  },
  text: {
    fontSize: '0.95rem',
    lineHeight: '1.6',
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '0.6rem',
    transition: 'color 0.3s ease',
  },
  socialIcons: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.8rem',
  },
  icon: {
    fontSize: '1.3rem',
    color: 'white',
    transition: 'transform 0.3s',
  },
  bottom: {
    borderTop: '1px solid #ccc',
    marginTop: '2rem',
    paddingTop: '1rem',
    textAlign: 'center',
  },
  bottomText: {
    fontSize: '0.85rem',
    color: '#e0e0e0',
  },
};

export default Footer;
