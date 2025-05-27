import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Store } from '../App';

const MyRequests = () => {
  const { token } = useContext(Store);
  const [requests, setRequests] = useState([]);
  const [reviewData, setReviewData] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('http://localhost:5000/my-requests', {
          headers: { 'x-token': token },
        });
        setRequests(res.data);
      } catch (err) {
        console.error('Fetch error:', err.response?.data || err.message);
      }
    };

    fetchRequests();
  }, [token, refresh]);

  const submitReview = async (bookingId) => {
    const { rating, comment } = reviewData[bookingId] || {};
    if (!rating) {
      alert('Please select a rating before submitting.');
      return;
    }
    try {
      await axios.post(
        'http://localhost:5000/submit-review',
        { bookingId, rating: parseInt(rating), comment },
        { headers: { 'x-token': token } }
      );
      alert('Review submitted!');
      setReviewData((prev) => ({
        ...prev,
        [bookingId]: { rating: '', comment: '' },
      }));
    } catch (err) {
      alert('Error: ' + (err.response?.data || err.message));
    }
  };

  const handleRatingChange = (bookingId, value) => {
    setReviewData((prev) => ({
      ...prev,
      [bookingId]: { ...prev[bookingId], rating: parseInt(value) },
    }));
  };

  const handleCommentChange = (bookingId, value) => {
    setReviewData((prev) => ({
      ...prev,
      [bookingId]: { ...prev[bookingId], comment: value },
    }));
  };

  const markAsCompleted = async (bookingId) => {
    try {
      await axios.patch(
        `http://localhost:5000/complete-booking/${bookingId}`,
        {},
        { headers: { 'x-token': token } }
      );
      alert('Booking marked as completed');
      setRefresh(!refresh);
    } catch (err) {
      console.error('Failed to mark as completed:', err);
      alert('Failed to complete the booking');
    }
  };

  // Styles
  const containerStyle = {
    padding: '24px',
    backgroundColor: '#f5f7f6',
    minHeight: '100vh',
  };

  const cardStyle = {
    backgroundColor: 'white',
    border: '1px solid #cbd5d9',
    borderRadius: '10px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  };

  const infoTextStyle = {
    color: '#4a4a4a',
    marginBottom: '8px',
    fontSize: '1rem',
  };

  const statusTextStyle = {
    fontWeight: '700',
    color: '#2e7d32',
  };

  const reviewSectionStyle = {
    marginTop: '24px',
    backgroundColor: '#e8f5e9',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #a5d6a7',
  };

  const reviewLabelStyle = {
    fontWeight: '600',
    color: '#2e7d32',
  };

  const ratingLabelStyle = {
    marginRight: '18px',
    cursor: 'pointer',
    color: '#2e7d32',
    fontWeight: '600',
  };

  const textareaStyle = {
    width: '100%',
    padding: '8px',
    border: '1px solid #cbd5d9',
    borderRadius: '6px',
    marginTop: '8px',
    fontSize: '1rem',
    resize: 'vertical',
    color: '#4a4a4a',
  };

  const btnSubmitStyle = {
    marginTop: '12px',
    backgroundColor: '#2e7d32',
    color: 'white',
    padding: '8px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
  };

  const btnCompleteStyle = {
    marginTop: '12px',
    marginLeft: '16px',
    backgroundColor: '#388e3c',
    color: 'white',
    padding: '8px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
  };

  return (
    <div style={containerStyle}>
      <h2> My Requests</h2>
      {requests.map((req) => (
        <div key={req._id} style={cardStyle}>
          <p style={infoTextStyle}>
            <strong>Date of Joining:</strong>{' '}
            {new Date(req.dateOfJoining).toLocaleDateString()}
          </p>
          <p style={infoTextStyle}>
            <strong>Address:</strong> {req.address}
          </p>
          <p style={infoTextStyle}>
            <strong>Contact:</strong> {req.contact}
          </p>
          <p style={{ ...infoTextStyle, ...statusTextStyle }}>
            <strong>Status:</strong> {req.status || 'pending'}
          </p>

          {req.status === 'accepted' && (
            <div style={reviewSectionStyle}>
              <label style={reviewLabelStyle}>
                <strong>Rate this service:</strong>
              </label>
              <div>
                {[1, 2, 3, 4, 5].map((num) => (
                  <label key={num} style={ratingLabelStyle}>
                    <input
                      type="radio"
                      name={`rating-${req._id}`}
                      value={num}
                      checked={reviewData[req._id]?.rating === num}
                      onChange={(e) => handleRatingChange(req._id, e.target.value)}
                    />
                    {num}⭐
                  </label>
                ))}
              </div>

              <textarea
                style={textareaStyle}
                placeholder="Add a comment (optional)"
                value={reviewData[req._id]?.comment || ''}
                onChange={(e) => handleCommentChange(req._id, e.target.value)}
              />

              <button
                style={btnSubmitStyle}
                onClick={() => submitReview(req._id)}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#276127')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#2e7d32')}
              >
                Submit Review
              </button>

              <button
                style={btnCompleteStyle}
                onClick={() => markAsCompleted(req._id)}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#2e7d32')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#388e3c')}
              >
                Mark as Completed
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyRequests;
