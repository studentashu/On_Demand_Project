import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Store } from '../App';

function SendNotification() {
  const { token } = useContext(Store);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setStatus('Please enter a notification message.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/send-notification',
        { message },
        { headers: { 'x-token': token } }
      );
      setStatus('✅ Notification sent successfully!');
      setMessage('');
    } catch (error) {
      console.error(error);
      setStatus('❌ Failed to send notification.');
    }
  };

  const backgroundStyle = {
    minHeight: '100vh',
    backgroundImage: 'url("https://images.unsplash.com/photo-1525182008055-f88b95ff7980")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  };

  const formContainerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '2rem',
    borderRadius: '15px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
    maxWidth: '600px',
    width: '100%',
  };

  return (
    <div style={backgroundStyle}>
      <div style={formContainerStyle}>
        <h2 style={{ textAlign: 'center', color: '#1565c0', marginBottom: '1rem' }}>📢 Send Notification</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Enter your message..."
            rows="5"
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              resize: 'none',
              marginBottom: '1rem',
              boxSizing: 'border-box'
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.8rem',
              backgroundColor: '#1565c0',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Send Notification
          </button>
        </form>
        {status && (
          <p style={{ marginTop: '1rem', textAlign: 'center', color: '#333', fontWeight: '500' }}>
            {status}
          </p>
        )}
      </div>
    </div>
  );
}

export default SendNotification;
