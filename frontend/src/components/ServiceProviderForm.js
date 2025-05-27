import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Store } from '../App';

const ServiceProviderForm = () => {
  const { token } = useContext(Store);

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    address: '',
    gender: '',
    work: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/service-provider-details', formData, {
        headers: { 'x-token': token }
      });
      alert('Details submitted successfully');
      setFormData({
        fullName: '',
        mobileNumber: '',
        address: '',
        gender: '',
        work: '',
      });
    } catch (error) {
      console.error(error);
      alert('Failed to submit details');
    }
  };

  const styles = {
    container: {
      backgroundColor: '#f0f0f0',
      padding: '2rem',
      borderRadius: '10px',
      width: '350px',
      margin: '2rem auto',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    heading: {
      textAlign: 'center',
      color: '#2e7d32',
      marginBottom: '1.5rem',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    input: {
      padding: '0.7rem',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '1rem',
      backgroundColor: '#fff',
    },
    button: {
      padding: '0.8rem',
      backgroundColor: '#2e7d32',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '1rem',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#1b5e20',
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Enter Your Details</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required style={styles.input} />
        <input name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="Mobile Number" required style={styles.input} />
        <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" required style={styles.input} />
        <input name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" required style={styles.input} />
        <input name="work" value={formData.work} onChange={handleChange} placeholder="Work" required style={styles.input} />
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

export default ServiceProviderForm;
