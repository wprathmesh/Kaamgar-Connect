import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';

// Import Pages
import Home from './pages/Home';
import About from './pages/About';
import Creator from './pages/Creator';
import Login from './pages/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole') || '');

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    localStorage.clear();
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      {/* 🧭 Clean Navigation Bar */}
      <nav style={styles.navBar}>
        <div style={styles.navContainer}>
          <div style={styles.logo}>
            👷 Kamgaar Connect
          </div>
          
          <div style={styles.navLinks}>
            <NavLink 
              to="/" 
              style={({ isActive }) => ({
                ...styles.link,
                borderBottom: isActive ? '3px solid #1e293b' : '3px solid transparent',
                color: isActive ? '#1e293b' : '#64748b'
              })}
            >
              Home
            </NavLink>

            <NavLink 
              to="/about" 
              style={({ isActive }) => ({
                ...styles.link,
                borderBottom: isActive ? '3px solid #1e293b' : '3px solid transparent',
                color: isActive ? '#1e293b' : '#64748b'
              })}
            >
              About
            </NavLink>

            <NavLink 
              to="/creator" 
              style={({ isActive }) => ({
                ...styles.link,
                borderBottom: isActive ? '3px solid #1e293b' : '3px solid transparent',
                color: isActive ? '#1e293b' : '#64748b'
              })}
            >
              Dev
            </NavLink>

            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* 🛑 Clean Page Wrapper (No Flexbox forcing things to the left) */}
      <div style={styles.pageWrapper}>
        <Routes>
          <Route path="/" element={<Home role={userRole} />} />
          <Route path="/about" element={<About />} />
          <Route path="/creator" element={<Creator />} />
          
          {/* Catch-all redirects back to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  navBar: {
    background: '#ffffff',
    padding: '0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
  },
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    height: '70px'
  },
  logo: {
    fontWeight: '800',
    color: '#1e293b',
    fontSize: '1.25rem',
    letterSpacing: '-0.5px'
  },
  navLinks: {
    display: 'flex',
    gap: '25px',
    alignItems: 'center',
    height: '100%'
  },
  link: {
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '0.95rem',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0 5px',
    transition: 'color 0.2s ease'
  },
  logoutBtn: {
    background: '#1e293b',
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '50px',
    fontWeight: '700',
    cursor: 'pointer',
    marginLeft: '10px',
    transition: '0.2s ease'
  },
  pageWrapper: {
    width: '100%',
    minHeight: 'calc(100vh - 70px)' 
  }
};

export default App;