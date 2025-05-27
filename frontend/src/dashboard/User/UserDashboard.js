import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../../App'; // Adjust path if needed

export default function UserDashboard() {
  const { setToken, setRole } = useContext(Store);
  const navigate = useNavigate();

  const containerStyle = {
    backgroundColor: '#f5f5f5',
    padding: '2rem',
    borderRadius: '8px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
    minHeight: '100vh',
    textAlign: 'center',
  };

  const headingStyle = {
    marginBottom: '2rem',
    color: '#2e7d32',
  };

  const buttonStyle = {
    backgroundColor: '#2e7d32',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: '600',
    margin: '0 1rem',
    boxShadow: '0 3px 6px rgba(46,125,50,0.4)',
    textDecoration: 'none', // for Link
    display: 'inline-block',
  };

  const handleLogout = () => {
    setToken(null);
    setRole(null);
    navigate('/login');
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Welcome to User Dashboard</h2>

      <div>
       

        <Link to="/myrequests" style={buttonStyle}>
          View My Requests
        </Link>

        <Link to="/allserviceproviders" style={buttonStyle}>
          View Service Providers
        </Link>
         <Link to="/myprofile" style={buttonStyle}>
          View My Profile
        </Link>
        <button
          onClick={handleLogout}
          style={{ 
            ...buttonStyle, 
            backgroundColor: '#c62828', 
            marginLeft: '1rem',
            boxShadow: '0 3px 6px rgba(198,40,40,0.4)'
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b71c1c')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#c62828')}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
