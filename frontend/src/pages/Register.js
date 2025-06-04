import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Nav from '../Nav';

const Register = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
    role: 'User'
  });

  const changeHandler = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/register', data)
      .then(res => {
        alert(res.data);
        setData({
          username: '',
          email: '',
          password: '',
          confirmpassword: '',
          role: 'User'
        });
      })
      .catch(err => alert("Registration failed. Please try again."));
  };

  return (
    <>
      <Nav />
      <div style={styles.container}>
        <form onSubmit={submitHandler} autoComplete="off" style={styles.form}>
          <h2 style={styles.title}>Create Account</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={changeHandler}
            value={data.username}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={changeHandler}
            value={data.email}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={changeHandler}
            value={data.password}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            onChange={changeHandler}
            value={data.confirmpassword}
            required
            style={styles.input}
          />
          <select
            name="role"
            value={data.role}
            onChange={changeHandler}
            style={styles.select}
          >
            <option value="User">User</option>
            <option value="ServiceProvider">Service Provider</option>
            <option value="Admin">Admin</option>
          </select>
          <button type="submit" style={styles.button}>Register</button>
          <p style={styles.linkText}>
            Already have an account? <Link to="/login" style={styles.link}>Login</Link>
          </p>
        </form>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url("https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1950&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '1rem',
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '2.5rem',
    borderRadius: '16px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  title: {
    color: '#2e7d32',
    textAlign: 'center',
    fontSize: '1.8rem',
    marginBottom: '0.5rem',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    transition: 'border-color 0.3s',
  },
  select: {
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#2e7d32',
    color: 'white',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
  linkText: {
    textAlign: 'center',
    marginTop: '1rem',
    fontSize: '0.9rem',
  },
  link: {
    color: '#2e7d32',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Register;
