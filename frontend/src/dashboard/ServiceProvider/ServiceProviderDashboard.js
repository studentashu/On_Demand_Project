import React, { useState, useContext } from 'react';
import MyProfile from '../../pages/Myprofile';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../../App'; // Adjust the path if needed

const ServiceProviderDashboard = () => {
  const { setToken } = useContext(Store);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const styles = {
    container: {
      maxWidth: 900,
      margin: '2rem auto',
      padding: '1rem 2rem',
      backgroundColor: '#f0f0f0', // light gray
      borderRadius: 10,
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#333',
    },
    heading: {
      color: '#2e7d32', // green
      fontSize: '2rem',
      marginBottom: '1rem',
      textAlign: 'center',
    },
    linksContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      marginTop: '2rem',
    },
    link: {
      backgroundColor: '#2e7d32', // green
      color: 'white',
      padding: '0.6rem 1.2rem',
      borderRadius: 6,
      textDecoration: 'none',
      fontWeight: '600',
      boxShadow: '0 2px 6px rgba(46,125,50,0.5)',
      transition: 'background-color 0.3s ease',
      cursor: 'pointer',
      userSelect: 'none',
    },
    button: {
      backgroundColor: '#2e7d32',
      color: 'white',
      padding: '0.6rem 1.2rem',
      borderRadius: 6,
      border: 'none',
      fontWeight: '600',
      boxShadow: '0 2px 6px rgba(46,125,50,0.5)',
      cursor: 'pointer',
      userSelect: 'none',
      transition: 'background-color 0.3s ease',
    },
  };

  const handleLogout = () => {
    setToken(null);
    navigate('/login'); // redirect to login page after logout
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Service Provider Dashboard</h2>

      <div style={styles.linksContainer}>
        <button
          style={styles.button}
          onClick={() => setShowProfile(prev => !prev)}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1b5e20')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#2e7d32')}
        >
          My Profile
        </button>

        <Link
          to='/serviceproviderdashboard/spform'
          style={styles.link}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1b5e20')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#2e7d32')}
        >
          Complete Your Profile
        </Link>
        <Link
          to='/serviceproviderdashboard/requests'
          style={styles.link}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1b5e20')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#2e7d32')}
        >
          Requests
        </Link>

        {/* Logout button */}
        <button
          style={styles.button}
          onClick={handleLogout}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#a52714')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#2e7d32')}
        >
          Logout
        </button>
      </div>

      {/* Conditionally render MyProfile component */}
      {showProfile && (
        <div style={{ marginTop: '2rem' }}>
          <MyProfile />
        </div>
      )}
    </div>
  );
};

export default ServiceProviderDashboard;
