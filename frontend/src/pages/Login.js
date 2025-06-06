import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Store } from '../App';
import { Navigate } from 'react-router-dom';
import Nav from '../Nav';

const Login = () => {
  const { token, setToken, role, setRole } = useContext(Store);
  const [data, setData] = useState({ email: '', password: '' });

  const changeHandler = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', data);
      setToken(res.data.token);
      const decoded = JSON.parse(atob(res.data.token.split('.')[1]));
      setRole(decoded.user.role);
      alert("Login successful");
    } catch (err) {
      alert(err.response?.data || "Login failed. Please try again.");
    }
  };

  if (token && role) {
    return <Navigate to={`/${role.toLowerCase()}dashboard`} replace />;
  }

  return (
    <>
      <Nav />
      <div style={styles.container}>
        <form onSubmit={submitHandler} autoComplete="off" style={styles.form}>
          <h2 style={styles.heading}>Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={changeHandler}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={changeHandler}
            required
            style={styles.input}
          />
          <input
            type="submit"
            value="Login"
            style={styles.button}
          />
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
    backgroundImage: 'url("https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1950&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    width: '320px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  heading: {
    marginBottom: '1rem',
    color: 'green',
    textAlign: 'center',
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  button: {
    padding: '10px',
    borderRadius: '6px',
    backgroundColor: 'green',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Login;
