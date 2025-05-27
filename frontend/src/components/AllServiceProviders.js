import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Store } from '../App';
import { useNavigate } from 'react-router-dom';

const AllServiceProviders = () => {
  const { token } = useContext(Store);
  const [providers, setProviders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/all-service-providers', {
          headers: { 'x-token': token }
        });
        setProviders(response.data);
      } catch (err) {
        console.error('Error fetching service providers:', err);
        alert('Failed to load service providers');
      }
    };

    fetchProviders();
  }, [token]);

  const containerStyle = {
    backgroundColor: '#f5f7f6',  // light grey background for container
    padding: '2rem',
    minHeight: '100vh',
  };

  const cardStyle = {
    backgroundColor: 'white',   // white cards
    border: '1px solid #d6d8d9', // light grey border
    borderRadius: '8px',
  };

  const cardTitleStyle = {
    color: '#2e7d32',  // green color for provider name
    fontWeight: '700',
  };

  const labelStyle = {
    fontWeight: '600',
    color: '#555',
  };

  const buttonStyle = {
    backgroundColor: '#2e7d32', // green button
    borderColor: '#2e7d32',
  };

  return (
    <div className="container mt-4" style={containerStyle}>
      <h3 className="text-center mb-4" style={{ color: '#2e7d32' }}>All Service Providers</h3>
      <div className="row">
        {providers.map((provider) => (
          <div className="col-md-4 mb-4" key={provider._id}>
            <div className="card h-100 shadow-sm" style={cardStyle}>
              <div className="card-body">
                <h5 className="card-title" style={cardTitleStyle}>{provider.fullName}</h5>
                <p className="card-text">
                  <span style={labelStyle}>Mobile:</span> {provider.mobileNumber}
                </p>
                <p className="card-text">
                  <span style={labelStyle}>Address:</span> {provider.address}
                </p>
                <p className="card-text">
                  <span style={labelStyle}>Gender:</span> {provider.gender}
                </p>
                <p className="card-text">
                  <span style={labelStyle}>Work:</span> {provider.work}
                </p>
                <button
                  className="btn mt-3"
                  style={buttonStyle}
                  onClick={() => navigate(`/buy-service/${provider.userId._id}`)}
                >
                  Book Service
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllServiceProviders;
