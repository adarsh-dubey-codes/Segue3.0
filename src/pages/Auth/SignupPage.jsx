import React, { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import SignupForm from '../../components/auth/SignupForm';
import GuestAccessModal from '../../components/auth/GuestAccessModal';
import { useAuth } from '../../context/AuthContext';

export default function SignupPage() {
  const { signup, continueAsGuest, isAuthenticated, isGuest } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState('');

  // If already authenticated or in guest mode, redirect
  if (isAuthenticated || isGuest) {
    const from = location.state?.from?.pathname || '/cycle';
    return <Navigate to={from} replace />;
  }

  const handleSignup = async (credentials) => {
    setSubmitting(true);
    setLocalError('');
    const res = await signup(credentials);
    setSubmitting(false);
    if (res.success) {
      const destination = location.state?.from?.pathname || '/cycle';
      navigate(destination, { replace: true });
    } else {
      setLocalError(res.error || 'Account creation failed. Please try again.');
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

  return (
    <AuthLayout>
      <SignupForm
        onSubmit={handleSignup}
        onSwitchToLogin={() => navigate('/login')}
        onOpenGuestModal={() => setIsGuestModalOpen(true)}
        isLoading={submitting}
        authError={localError}
      />

      <GuestAccessModal
        isOpen={isGuestModalOpen}
        onClose={() => setIsGuestModalOpen(false)}
        onConfirm={handleGuestConfirm}
        isLoading={submitting}
      />
    </AuthLayout>
  );
}
