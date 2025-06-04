import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../App';

const BuyService = () => {
  const { token } = useContext(Store);
  const { id } = useParams();

  const [formData, setFormData] = useState({
    dateOfJoining: '',
    address: '',
    contact: '',
  }); 

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/book-service/${id}`, formData, {
        headers: { 'x-token': token },
      });
      alert('Service booked successfully!');
      setSubmitted(true);
    } catch (err) {
      console.error('Booking failed:', err?.response?.data || err.message);
      alert(`Booking failed: ${err?.response?.data || 'Unknown error'}`);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Book a Service</h3>

      {!submitted ? (
        <div className="card mx-auto" style={{ maxWidth: '500px' }}>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="dateOfJoining" className="form-label">Date of Joining</label>
                <input
                  type="date"
                  id="dateOfJoining"
                  name="dateOfJoining"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="contact" className="form-label">Contact</label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-success w-100">Submit</button>
            </form>
          </div>
        </div>
      ) : (
        <div className="alert alert-success text-center">Service booked successfully!</div>
      )}
    </div>
  );
};

export default BuyService;