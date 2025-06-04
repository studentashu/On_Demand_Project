import React, { useContext, useState, useEffect } from 'react';
import { Store } from '../App';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const MyProfile = () => {
  const { token, setToken } = useContext(Store);
  const [data, setData] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5000/myprofile', {
        headers: { 'x-token': token }
      })
      .then(res => setData(res.data))
      .catch(err => console.error(err));

      axios.get('http://localhost:5000/service-provider-profile', {
        headers: { 'x-token': token }
      })
      .then(res => setProvider(res.data))
      .catch(err => console.error(err));
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(to right, #e0f2f1, #c8e6c9)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    width: '90%',
    maxWidth: '450px',
    color: '#333',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#2e7d32',
  };

  const labelStyle = {
    color: '#555',
    marginBottom: '0.5rem',
  };

  const logoutButtonStyle = {
    marginTop: '1.5rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#2e7d32',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
  };

  return (
    <div style={containerStyle}>
      {data ? (
        <div style={cardStyle}>
          <h2 style={titleStyle}>Welcome: {data.username}</h2>
          <p style={labelStyle}><strong>Email:</strong> {data.email}</p>
          <p style={labelStyle}><strong>Role:</strong> {data.role}</p>
          {provider && (
            <>
              <hr />
              <p style={labelStyle}><strong>Full Name:</strong> {provider.fullName}</p>
              <p style={labelStyle}><strong>Work:</strong> {provider.work}</p>
              <p style={labelStyle}><strong>Availability:</strong> {provider.availability}</p>
            </>
          )}
          <button
            style={logoutButtonStyle}
            onClick={() => setToken(null)}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1b5e20')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#2e7d32')}
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default MyProfile;
