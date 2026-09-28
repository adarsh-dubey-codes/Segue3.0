import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CycleProvider } from './context/CycleContext';

import Navbar from './components/layout/Navbar';
import MobileNav from './components/layout/MobileNav';
import Footer from './components/layout/Footer';

import HomePage from './pages/Home/HomePage';
import CyclePage from './pages/Cycle/CyclePage';
import AIPage from './pages/AI/AIPage';
import LifestylePage from './pages/Lifestyle/LifestylePage';
import ProductsPage from './pages/Products/ProductsPage';
import DoctorsPage from './pages/Doctors/DoctorsPage';
import ForumPage from './pages/Forum/ForumPage';
import BuddyPage from './pages/Buddy/BuddyPage';
import VibesPage from './pages/Vibes/VibesPage';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';

function AppLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
      <MobileNav />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CycleProvider>
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Main Application Shell Routes */}
            <Route
              path="/"
              element={
                <AppLayout>
                  <HomePage />
                </AppLayout>
              }
            />
            <Route
              path="/cycle"
              element={
                <AppLayout>
                  <CyclePage />
                </AppLayout>
              }
            />
            <Route
              path="/track"
              element={<Navigate to="/cycle" replace />}
            />
            <Route
              path="/chat"
              element={
                <AppLayout>
                  <AIPage />
                </AppLayout>
              }
            />
            <Route
              path="/lifestyle"
              element={
                <AppLayout>
                  <LifestylePage />
                </AppLayout>
              }
            />
            <Route
              path="/products"
              element={
                <AppLayout>
                  <ProductsPage />
                </AppLayout>
              }
            />
            <Route
              path="/doctors"
              element={
                <AppLayout>
                  <DoctorsPage />
                </AppLayout>
              }
            />
            <Route
              path="/forum"
              element={
                <AppLayout>
                  <ForumPage />
                </AppLayout>
              }
            />
            <Route
              path="/buddy"
              element={
                <AppLayout>
                  <BuddyPage />
                </AppLayout>
              }
            />
            <Route
              path="/vibes"
              element={
                <AppLayout>
                  <VibesPage />
                </AppLayout>
              }
            />
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </CycleProvider>
    </AuthProvider>
  );
}
