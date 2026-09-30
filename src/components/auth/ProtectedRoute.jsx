import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SakhiLogo from '../Brand/SakhiLogo';

export default function ProtectedRoute({ children, allowGuest = true }) {
  const { authMode, isLoading, isAuthenticated, isGuest } = useAuth();
  const location = useLocation();

  // Show a clean, calm splash screen while checking session
  if (isLoading) {
    return (
      <div 
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--background)',
          gap: '20px'
        }}
      >
        <SakhiLogo size="large" />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)' }}>
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="var(--rose)" 
            strokeWidth="2.5" 
            style={{ animation: 'spin 1s linear infinite' }}
          >
            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
            <path d="M12 2 a 10 10 0 0 1 10 10" />
          </svg>
          <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Opening your private space...</span>
        </div>
      </div>
    );
  }

  const hasAccess = isAuthenticated || (allowGuest && isGuest);

  if (!hasAccess) {
    // Preserve intended destination path in location state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
