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

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
      {data ? (
        <div className="card" style={{ width: "22rem", padding: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <div className="card-body">
            <h5 className="card-title">Welcome: {data.username}</h5>
            <p className="card-text"><strong>Email:</strong> {data.email}</p>
            <p className="card-text"><strong>Role:</strong> {data.role}</p>
            {provider && (
              <>
                <hr />
                <p className="card-text"><strong>Full Name:</strong> {provider.fullName}</p>
                <p className="card-text"><strong>Work:</strong> {provider.work}</p>
                <p className="card-text"><strong>Availability:</strong> {provider.availability}</p>
              </>
            )}
            <button className="btn btn-primary" onClick={() => setToken(null)}>Logout</button>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default MyProfile;
