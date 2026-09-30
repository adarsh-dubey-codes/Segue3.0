import React from 'react';
import ReactBitsBackground from './ReactBitsBackground';
import SakhiHeaderBrand from './SakhiHeaderBrand';

export default function AuthLayout({ children }) {
  return (
    <div className="sakhi-auth-viewport">
      {/* Dynamic ReactBits Canvas & Pitch UI Noise Background */}
      <ReactBitsBackground />

      <style>{`
        .sakhi-auth-viewport {
          position: relative;
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 16px;
          overflow-x: hidden;
          background-color: #FFF7F8;
          font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
        }

        .sakhi-auth-card {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 480px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: cardSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes cardSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .sakhi-input-box:focus-within {
          border-color: #EC738F !important;
          box-shadow: 0 0 0 3px rgba(236, 115, 143, 0.18), inset 0 1px 3px rgba(140, 53, 88, 0.03) !important;
          background-color: #FFFFFF !important;
        }

        .sakhi-primary-btn:hover {
          background-color: #58203B !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(110, 44, 75, 0.35) !important;
        }

        .sakhi-primary-btn:active {
          transform: translateY(0);
        }

        .sakhi-guest-btn:hover {
          background-color: #FFF0F4 !important;
          border-color: #EC738F !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(236, 115, 143, 0.15) !important;
        }

        .sakhi-guest-btn:active {
          transform: translateY(0);
        }

        .sakhi-logo-emblem:hover {
          transform: scale(1.05) rotate(-1deg);
        }
      `}</style>

      {/* Main Centered Sign In / Sign Up Container */}
      <div className="sakhi-auth-card">
        {/* Exact Header Brand from Screenshot */}
        <SakhiHeaderBrand />

        {/* Form Content */}
        <div style={{ width: '100%' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
