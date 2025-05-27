import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

export const Store = createContext();

const App = () => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  return (
    <Store.Provider value={{ token, setToken, role, setRole }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Nav />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* USER DASHBOARD */}
          <Route element={<ProtectedRoute allowedRoles={['User']} />}>
         <Route path="/userdashboard" element={<UserDashboard />} />
  <Route path="/myprofile" element={<MyProfile />} />
  <Route path="/myrequests" element={<MyRequests/>} />
  <Route path="/allserviceproviders" element={<AllServiceProviders/>} />
  <Route path="/buy-service/:id" element={<BuyService />} />
          </Route>

          {/* ADMIN DASHBOARD */}
          <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
            <Route path="/admindashboard" element={<AdminDashboard />} />
             
          </Route>

          {/* SERVICE PROVIDER DASHBOARD */}
          <Route element={<ProtectedRoute allowedRoles={['ServiceProvider']} />}>
            <Route path="/serviceproviderdashboard" element={<ServiceProviderDashboard />} />
            <Route path="/serviceproviderdashboard/spform" element={<ServiceProviderForm />} />
            <Route path="/serviceproviderdashboard/requests" element={<Requests />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Store.Provider>
  );
};

export default App;
