import React, { useState, useContext } from 'react';
import MyProfile from '../../pages/Myprofile';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../../App';

const ServiceProviderDashboard = () => {
  const { setToken } = useContext(Store);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate('/login');
  };

  const serviceExamples = [
    {
      title: 'Home Cleaning',
      description: 'Our professionals provide deep home cleaning services to keep your living space spotless and sanitized.',
      image: 'https://img.freepik.com/premium-photo/human-showing-service-concept-business_220873-7592.jpg',
    },
    {
      title: 'Plumbing',
      description: 'Certified plumbers ready to fix leaks, install fixtures, and maintain pipelines efficiently.',
      image: 'https://st2.depositphotos.com/1907633/8862/i/450/depositphotos_88629422-stock-photo-waves-of-blue-light-and.jpg',
    },
    {
      title: 'Electrician Services',
      description: 'Our expert electricians handle repairs, wiring, and installations safely and quickly.',
      image: 'https://c0.wallpaperflare.com/preview/560/693/69/business-background-illustration-people.jpg',
    },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Service Provider Dashboard</h2>

      <div style={styles.linksContainer}>
        <button
          style={styles.button}
          onClick={() => setShowProfile(prev => !prev)}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1b5e20')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#2e7d32')}
        >
          My Profile
        </button>

        <Link
          to='/serviceproviderdashboard/spform'
          style={styles.link}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1b5e20')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#2e7d32')}
        >
          Complete Your Profile
        </Link>

        <Link
          to='/serviceproviderdashboard/requests'
          style={styles.link}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1b5e20')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#2e7d32')}
        >
          Requests
        </Link>

        <Link
          to='/serviceproviderdashboard/notifications'
          style={styles.link}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1b5e20')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#2e7d32')}
        >
          Notifications
        </Link>

        <button
          style={styles.button}
          onClick={handleLogout}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#a52714')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#2e7d32')}
        >
          Logout
        </button>
      </div>

      {showProfile && (
        <div style={{ marginTop: '2rem' }}>
          <MyProfile />
        </div>
      )}

      {/* Static Service Info */}
      <h3 style={styles.sectionHeading}>Services We Offer</h3>
      <div style={styles.servicesContainer}>
        {serviceExamples.map((service, index) => (
          <div key={index} style={styles.serviceCard}>
            <img src={service.image} alt={service.title} style={styles.serviceImage} />
            <h4 style={styles.cardTitle}>{service.title}</h4>
            <p style={styles.cardDescription}>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 1000,
    margin: '2rem auto',
    padding: '1rem 2rem',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
  },
  heading: {
    color: '#2e7d32',
    fontSize: '2.5rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  sectionHeading: {
    textAlign: 'center',
    marginTop: '3rem',
    marginBottom: '1rem',
    fontSize: '1.8rem',
    color: '#1b5e20',
  },
  linksContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '1.2rem',
    marginTop: '2rem',
  },
  link: {
    backgroundColor: '#2e7d32',
    color: 'white',
    padding: '0.6rem 1.2rem',
    borderRadius: 6,
    textDecoration: 'none',
    fontWeight: '600',
    boxShadow: '0 2px 6px rgba(46,125,50,0.5)',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
  },
  button: {
    backgroundColor: '#2e7d32',
    color: 'white',
    padding: '0.6rem 1.2rem',
    borderRadius: 6,
    border: 'none',
    fontWeight: '600',
    boxShadow: '0 2px 6px rgba(46,125,50,0.5)',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  servicesContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem',
  },
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    padding: '1rem',
    textAlign: 'center',
  },
  serviceImage: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: '1.2rem',
    margin: '0.8rem 0 0.4rem 0',
    color: '#2e7d32',
  },
  cardDescription: {
    fontSize: '0.95rem',
    color: '#555',
  },
};

export default ServiceProviderDashboard;
