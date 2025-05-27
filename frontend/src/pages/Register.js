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
          <h3 style={styles.title}>Register</h3>
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
          <select name="role" value={data.role} onChange={changeHandler} style={styles.select}>
            <option value="User">User</option>
            <option value="ServiceProvider">Service Provider</option>
            <option value="Admin">Admin</option>
          </select>
          <button type="submit" style={styles.button}>Register</button>
        </form>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem',
  },
  form: {
    backgroundColor: '#f2f2f2',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '300px',
  },
  title: {
    color: 'green',
    textAlign: 'center',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
    fontSize: '1rem',
  },
  select: {
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: 'green',
    color: 'white',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
};

export default Register;
