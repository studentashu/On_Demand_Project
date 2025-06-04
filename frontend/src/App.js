import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import AdminDashboard from './dashboard/Admin/AdminDashboard';
import Nav from './Nav';
import Login from './pages/Login';
import MyProfile from './pages/Myprofile';
import ServiceProviderDashboard from './dashboard/ServiceProvider/ServiceProviderDashboard';
import UserDashboard from './dashboard/User/UserDashboard';
import Register from './pages/Register';
import ProtectedRoute from './routes/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';
import ServiceProviderForm from './components/ServiceProviderForm';
import BuyService from './components/BuyService';
import Requests from './dashboard/ServiceProvider/Requests';
import MyRequests from './components/MyRequests';
import AllServiceProviders from './components/AllServiceProviders';
import SendNotificationForm from './components/SendNotificationForm';
import NotificationList from './components/NotificationList';

export const Store = createContext();

const App = () => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  return (
    <Store.Provider value={{ token, setToken, role, setRole }}>
      <BrowserRouter>
        <Routes>
          {/* Redirect root based on login & role */}
          <Route
            path="/"
            element={
              token ? (
                role === 'Admin' ? (
                  <Navigate to="/admindashboard" />
                ) : role === 'User' ? (
                  <Navigate to="/userdashboard" />
                ) : role === 'ServiceProvider' ? (
                  <Navigate to="/serviceproviderdashboard" />
                ) : (
                  <Navigate to="/unauthorized" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Nav can be shown on all pages, so better place it outside Routes or inside layouts */}
          {/* If you want Nav always visible, consider placing it above Routes */}

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected routes for User */}
          <Route element={<ProtectedRoute allowedRoles={['User']} />}>
            <Route path="/userdashboard" element={<UserDashboard />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/myrequests" element={<MyRequests />} />
            <Route path="/allserviceproviders" element={<AllServiceProviders />} />
            <Route path="/buy-service/:id" element={<BuyService />} />
          </Route>

          {/* Protected routes for Admin */}
          <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/send-notification" element={<SendNotificationForm />} />
          </Route>

          {/* Protected routes for Service Provider */}
          <Route element={<ProtectedRoute allowedRoles={['ServiceProvider']} />}>
            <Route path="/serviceproviderdashboard" element={<ServiceProviderDashboard />} />
            <Route path="/serviceproviderdashboard/spform" element={<ServiceProviderForm />} />
            <Route path="/serviceproviderdashboard/requests" element={<Requests />} />
            <Route path='/serviceproviderdashboard/notifications' element={<NotificationList/>}/>
          </Route>

          {/* Catch all unmatched routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Store.Provider>
  );
};

export default App;
