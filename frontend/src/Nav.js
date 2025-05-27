import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Store } from './App';

const Nav = () => {
  const { token, setToken } = useContext(Store);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.brand}>RoleBasedApp</Link>
        <div style={styles.links}>
          {!token ? (
            <>
              <Link to="/register" style={styles.link}>Register</Link>
              <Link to="/login" style={styles.link}>Login</Link>
            </>
          ) : (
            <>
              <Link to="/myprofile" style={styles.link}>My Profile</Link>
              <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#f2f2f2',
    padding: '1rem 2rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    textDecoration: 'none',
  },
  links: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  link: {
    color: '#333',
    textDecoration: 'none',
    fontWeight: '500',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    transition: 'background-color 0.2s',
  },
  logoutButton: {
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
  },
};

export default Nav;
