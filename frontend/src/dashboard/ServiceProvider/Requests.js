import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Store } from '../../App';

const Requests = () => {
  const { token } = useContext(Store);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/provider-bookings', {
          headers: { 'x-token': token },
        });
        setRequests(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch booking requests', err);
        setError('Failed to load booking requests');
        setLoading(false);
      }
    };

    fetchRequests();
  }, [token]);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/update-booking-status/${id}`,
        { status },
        { headers: { 'x-token': token } }
      );

      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status } : req
        )
      );
    } catch (err) {
      alert('Failed to update status');
      console.error(err);
    }
  };

  // Inline styles
  const styles = {
    container: {
      maxWidth: 960,
      margin: '2rem auto',
      padding: '1rem',
      backgroundColor: '#f0f0f0', // light gray
      borderRadius: 10,
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    heading: {
      textAlign: 'center',
      color: '#2e7d32', // green
      marginBottom: '2rem',
    },
    card: {
      backgroundColor: '#fff', // white
      borderRadius: 10,
      boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      transition: 'transform 0.2s ease',
    },
    cardHover: {
      transform: 'translateY(-5px)',
    },
    cardTitle: {
      color: '#2e7d32', // green
      marginBottom: '1rem',
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    text: {
      color: '#555', // dark gray
      margin: '0.3rem 0',
      fontSize: '1rem',
    },
    strong: {
      color: '#333',
    },
    buttonSuccess: {
      backgroundColor: '#2e7d32',
      border: 'none',
      color: 'white',
      borderRadius: 5,
      fontWeight: 600,
      padding: '0.5rem 1rem',
      cursor: 'pointer',
      marginRight: '0.5rem',
      transition: 'background-color 0.3s ease',
    },
    buttonDanger: {
      backgroundColor: '#d32f2f',
      border: 'none',
      color: 'white',
      borderRadius: 5,
      fontWeight: 600,
      padding: '0.5rem 1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonContainer: {
      display: 'flex',
      gap: '0.5rem',
      marginTop: '1rem',
    },
    alertInfo: {
      backgroundColor: '#e8f5e9', // very light green
      color: '#2e7d32',
      borderRadius: 8,
      padding: '1rem',
      fontSize: '1.1rem',
      fontWeight: 500,
      textAlign: 'center',
    },
    alertDanger: {
      backgroundColor: '#ffebee', // very light red
      color: '#d32f2f',
      borderRadius: 8,
      padding: '1rem',
      fontSize: '1.1rem',
      fontWeight: 500,
      textAlign: 'center',
    },
    spinner: {
      display: 'inline-block',
      width: '3rem',
      height: '3rem',
      border: '0.4rem solid #f3f3f3',
      borderTop: '0.4rem solid #2e7d32',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: 'auto',
    },
    loadingWrapper: {
      textAlign: 'center',
      marginTop: '3rem',
      marginBottom: '3rem',
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Booking Requests</h3>

      {loading && (
        <div style={styles.loadingWrapper}>
          <div style={styles.spinner} role="status" aria-label="Loading"></div>
        </div>
      )}

      {error && <div style={styles.alertDanger}>{error}</div>}

      {!loading && !error && (
        <>
          {requests.length === 0 ? (
            <div style={styles.alertInfo}>No booking requests found.</div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              {requests.map((req) => (
                <div
                  key={req._id}
                  style={{
                    ...styles.card,
                    flex: '1 1 300px',
                    maxWidth: '320px',
                    cursor: 'default',
                  }}
                >
                  <h5 style={styles.cardTitle}>Service Request</h5>
                  <p style={styles.text}>
                    <strong style={styles.strong}>Address:</strong> {req.address}
                  </p>
                  <p style={styles.text}>
                    <strong style={styles.strong}>Contact:</strong> {req.contact}
                  </p>
                  <p style={styles.text}>
                    <strong style={styles.strong}>Date of Joining:</strong>{' '}
                    {new Date(req.dateOfJoining).toLocaleDateString()}
                  </p>
                  <p style={styles.text}>
                    <strong style={styles.strong}>Status:</strong> {req.status}
                  </p>

                  {req.status === 'pending' && (
                    <div style={styles.buttonContainer}>
                      <button
                        style={styles.buttonSuccess}
                        onClick={() => updateStatus(req._id, 'accepted')}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1b5e20')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2e7d32')}
                      >
                        Accept
                      </button>
                      <button
                        style={styles.buttonDanger}
                        onClick={() => updateStatus(req._id, 'rejected')}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#9a2222')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#d32f2f')}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {/* Spinner animation keyframes */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
};

export default Requests;
