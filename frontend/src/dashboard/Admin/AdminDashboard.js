import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Store } from '../../App';
import { Navigate, Link } from 'react-router-dom';  // <-- Import Link here

export default function AdminDashboard() {
  const { token, setToken } = useContext(Store);
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    if (token && showUsers) {
      axios.get('http://localhost:5000/all-users', {
        headers: { 'x-token': token }
      })
      .then(res => setUsers(res.data))
      .catch(err => {
        console.error(err);
        alert("Failed to load user list.");
      });
    }
  }, [token, showUsers]);

  const handleDelete = (userId) => {
    if (!window.confirm('Are you sure you want to remove this user?')) return;

    axios.delete(`http://localhost:5000/delete-user/${userId}`, {
      headers: { 'x-token': token }
    })
    .then(res => {
      alert(res.data.message);
      setUsers(users.filter(user => user._id !== userId));
    })
    .catch(err => {
      console.error(err);
      alert('Failed to delete user.');
    });
  };

  if (!token) return <Navigate to="/login" replace />;

  return (
   <div style={{
  padding: '2rem',
  backgroundImage: 'url("https://img.freepik.com/free-vector/abstract-blue-technology-background_23-2149352058.jpg?semt=ais_hybrid&w=740")',  // Example URL
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: '#fff', // Make text white to contrast background
  backdropFilter: 'blur(2px)', // Optional: slight blur effect
  backgroundColor: 'rgba(0,0,0,0.5)', // fallback dark overlay
  backgroundBlendMode: 'overlay' // blend overlay with background
}}>

      <h2 style={{ color: '#2e7d32', marginBottom: '1.5rem' }}>Welcome to Admin Dashboard</h2>

      {/* Logout Button */}
      <button
        onClick={() => setToken(null)}
        style={{
          padding: '0.6rem 1.2rem',
          marginBottom: '1.5rem',
          cursor: 'pointer',
          backgroundColor: '#d32f2f',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          boxShadow: '0 3px 6px rgba(211,47,47,0.4)',
          fontWeight: '600',
          transition: 'background-color 0.3s ease',
          userSelect: 'none',
          float: 'right'
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#9a2222'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#d32f2f'}
      >
        Logout
      </button>

      {/* View Profiles Toggle Button */}
      <button
        onClick={() => setShowUsers(prev => !prev)}
        style={{
          padding: '0.6rem 1.2rem',
          marginBottom: '1.5rem',
          cursor: 'pointer',
          backgroundColor: '#2e7d32',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          boxShadow: '0 3px 6px rgba(46,125,50,0.4)',
          fontWeight: '600',
          transition: 'background-color 0.3s ease',
          userSelect: 'none',
          marginRight: 'auto'
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#276127'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2e7d32'}
      >
        {showUsers ? 'Hide Profiles' : 'View Profiles'}
      </button>

      {/* New Send Notification Button */}
      <Link
        to="/send-notification"
        style={{
          padding: '0.6rem 1.2rem',
          marginBottom: '1.5rem',
          cursor: 'pointer',
          backgroundColor: '#1565c0',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          boxShadow: '0 3px 6px rgba(21,101,192,0.4)',
          fontWeight: '600',
          textDecoration: 'none',
          display: 'inline-block',
          transition: 'background-color 0.3s ease',
          userSelect: 'none',
          marginLeft: '1rem',
          float: 'right',
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0d3c71'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1565c0'}
      >
        Send Notification
      </Link>

      {showUsers && (
        <>
          <h4 style={{ color: '#555' }}>Registered Users (excluding Admins):</h4>
          <table
            border="1"
            cellPadding="10"
            style={{
              marginTop: '1rem',
              width: '100%',
              borderCollapse: 'collapse',
              borderColor: '#ddd',
              backgroundColor: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              color: '#444',
            }}
          >
            <thead style={{ backgroundColor: '#2e7d32', color: '#fff' }}>
              <tr>
                <th style={{ textAlign: 'left' }}>Username</th>
                <th style={{ textAlign: 'left' }}>Email</th>
                <th style={{ textAlign: 'left' }}>Role</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map(user => (
                  <tr key={user._id} style={{ borderBottom: '1px solid #eee' }}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        onClick={() => handleDelete(user._id)}
                        style={{
                          cursor: 'pointer',
                          padding: '0.4rem 0.8rem',
                          backgroundColor: '#a94442',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          transition: 'background-color 0.3s ease',
                          userSelect: 'none'
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#7a3535'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#a94442'}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '1rem', color: '#888' }}>
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
