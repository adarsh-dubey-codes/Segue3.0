import React, { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import LoginForm from '../../components/auth/LoginForm';
import GuestAccessModal from '../../components/auth/GuestAccessModal';
import ForgotPasswordModal from '../../components/auth/ForgotPasswordModal';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const { login, continueAsGuest, authMode, isAuthenticated, isGuest } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [resetInitialEmail, setResetInitialEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState('');

  // If already authenticated or guest, redirect to target page or /cycle
  if (isAuthenticated || isGuest) {
    const from = location.state?.from?.pathname || '/cycle';
    return <Navigate to={from} replace />;
  }

  const handleLogin = async (credentials) => {
    setSubmitting(true);
    setLocalError('');
    const res = await login(credentials);
    setSubmitting(false);
    if (res.success) {
      const destination = location.state?.from?.pathname || '/cycle';
      navigate(destination, { replace: true });
    } else {
      setLocalError(res.error || 'Log in failed. Please check your credentials.');
    }
  };

  const handleGuestConfirm = async () => {
    setSubmitting(true);
    const res = await continueAsGuest();
    setSubmitting(false);
    setIsGuestModalOpen(false);
    if (res.success) {
      navigate('/cycle', { replace: true });
    }
  };

  const handleOpenForgot = (emailInput) => {
    setResetInitialEmail(emailInput || '');
    setIsForgotModalOpen(true);
  };

  return (
    <AuthLayout>
      <LoginForm
        onSubmit={handleLogin}
        onSwitchToSignup={() => navigate('/signup')}
        onOpenGuestModal={() => setIsGuestModalOpen(true)}
        onOpenForgotPassword={handleOpenForgot}
        isLoading={submitting}
        authError={localError}
      />

      <GuestAccessModal
        isOpen={isGuestModalOpen}
        onClose={() => setIsGuestModalOpen(false)}
        onConfirm={handleGuestConfirm}
        isLoading={submitting}
      />

      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        initialEmail={resetInitialEmail}
      />
    </AuthLayout>
  );
}
