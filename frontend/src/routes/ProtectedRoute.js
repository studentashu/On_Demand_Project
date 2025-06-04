import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Store } from '../App';

const ProtectedRoute = ({ allowedRoles }) => {
  const { token, role } = useContext(Store); // Correct object destructuring

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
