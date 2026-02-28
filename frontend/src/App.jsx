import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Analyze from './pages/Analyze';
import History from './pages/History';
import Education from './pages/Education';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Landing from './pages/Landing';
import ForgotPassword from './pages/ForgotPassword';
import Sidebar from './components/Sidebar';
import { getCurrentUser } from './api/api';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const obj = localStorage.getItem('user');
    if (obj) {
      setUser(JSON.parse(obj));
    }
    setLoading(false);
  }, []);

  const handleLogin = (data) => {
    setUser(data.user);
    localStorage.setItem('user', JSON.stringify(data.user));
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="prism-bg">
          <div className="prism-orb orb-1"></div>
          <div className="prism-orb orb-2"></div>
          <div className="prism-orb orb-3"></div>
        </div>

        <div className="main-layout">
          {user && <Sidebar onLogout={handleLogout} />}
          <div className={user ? "main-content" : "full-viewport"}>
            <Routes>
              {user ? (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/analyze/:type" element={<Analyze />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/education" element={<Education />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<div className="auth-layout"><Login setUser={setUser} handleLogin={handleLogin} /></div>} />
                  <Route path="/register" element={<div className="auth-layout"><Register /></div>} />
                  <Route path="/forgot-password" element={<div className="auth-layout"><ForgotPassword /></div>} />
                  <Route path="*" element={<Navigate to="/" />} />
                </>
              )}
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
