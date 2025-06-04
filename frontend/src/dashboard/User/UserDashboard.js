import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../../App'; // Adjust path if needed
import SendNotificationForm from '../../components/SendNotificationForm';
import NotificationList from '../../components/NotificationList';

export default function UserDashboard() {
  const { setToken, setRole } = useContext(Store);
  const navigate = useNavigate();

  const containerStyle = {
    minHeight: '100vh',
    backgroundImage: 'url("https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1950&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
    paddingBottom: '3rem',
  };

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '1rem 2rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  };

  const linkStyle = {
    backgroundColor: '#2e7d32',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.95rem',
    marginLeft: '1rem',
    textDecoration: 'none',
    boxShadow: '0 2px 5px rgba(46,125,50,0.3)',
    transition: 'background-color 0.3s ease',
  };

  const logoutStyle = {
    ...linkStyle,
    backgroundColor: '#c62828',
    boxShadow: '0 2px 5px rgba(198,40,40,0.3)',
  };

  const headingContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  };

  const headingStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '2rem 3rem',
    borderRadius: '16px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
    color: '#2e7d32',
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
  };

  const notificationsContainerStyle = {
    marginTop: '2rem',
    backgroundColor: 'rgba(255,255,255,0.95)',
    maxWidth: '900px',
    margin: '2rem auto',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  };

  const sectionHeadingStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: '1rem',
    textAlign: 'center',
  };

  const handleLogout = () => {
    setToken(null);
    setRole(null);
    navigate('/login');
  };

  return (
    <div style={containerStyle}>
      <div style={navbarStyle}>
        <Link to="/myrequests" style={linkStyle}>My Requests</Link>
        <Link to="/allserviceproviders" style={linkStyle}>Service Providers</Link>
        <Link to="/myprofile" style={linkStyle}>My Profile</Link>
        <button
          onClick={handleLogout}
          style={logoutStyle}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b71c1c')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#c62828')}
        >
          Logout
        </button>
      </div>

      <div style={headingContainerStyle}>
        <div style={headingStyle}>Welcome to User Dashboard</div>
      </div>

      {/* Notification Section */}
      <div style={notificationsContainerStyle}>
        <h3 style={sectionHeadingStyle}>Notifications</h3>
        <NotificationList />
      
      </div>
    </div>
  );
}
