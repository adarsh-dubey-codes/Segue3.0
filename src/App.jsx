import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { CycleProvider } from './context/CycleContext';
import { RewardsProvider } from './context/RewardsContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

import Navbar from './components/layout/Navbar';
import MobileNav from './components/layout/MobileNav';
import Footer from './components/layout/Footer';
import BoloSakhiMicCircle from './components/BoloSakhiMicCircle';
import ChatWithSakhiButton from './components/ai/ChatWithSakhiButton';

import HomePage from './pages/Home/HomePage';
import CyclePage from './pages/Cycle/CyclePage';
import AIPage from './pages/AI/AIPage';
import LifestylePage from './pages/Lifestyle/LifestylePage';
import ProductsPage from './pages/Products/ProductsPage';
import DoctorsPage from './pages/Doctors/DoctorsPage';
import ForumPage from './pages/Forum/ForumPage';
import BuddyPage from './pages/Buddy/BuddyPage';
import VibesPage from './pages/Vibes/VibesPage';
import PayablesPage from './pages/Payables/PayablesPage';
import SakhiPlayPage from './pages/Play/SakhiPlayPage';
import SakhiVideosPage from './pages/Videos/SakhiVideosPage';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';

import PartnerPortalPage from './pages/Partner/PartnerPortalPage';
import FieldWorkerTrainingPage from './pages/Partner/FieldWorkerTrainingPage';
import EmbedWidgetPage from './pages/Partner/EmbedWidgetPage';
import PartnerApiDocPage from './pages/Partner/PartnerApiDocPage';

function AppLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
      <MobileNav />
      <ChatWithSakhiButton />
      <BoloSakhiMicCircle />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CycleProvider>
          <RewardsProvider>
            <BrowserRouter>
              <Routes>
                {/* Auth Experience Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Protected Main Application Shell Routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute allowGuest={true}>
                      <AppLayout>
                        <HomePage />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/cycle"
                  element={
                    <ProtectedRoute allowGuest={true}>
                      <AppLayout>
                        <CyclePage />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/track"
                  element={<Navigate to="/cycle" replace />}
                />
                <Route
                  path="/chat"
                  element={
                    <ProtectedRoute allowGuest={true}>
                      <AppLayout>
                        <AIPage />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/lifestyle"
                  element={
                    <ProtectedRoute allowGuest={true}>
                      <AppLayout>
                        <LifestylePage />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/products"
                  element={
                    <ProtectedRoute allowGuest={true}>
                      <AppLayout>
                        <ProductsPage />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/doctors"
                  element={
                    <ProtectedRoute allowGuest={true}>
                      <AppLayout>
                        <DoctorsPage />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/forum"
                  element={
                    <ProtectedRoute allowGuest={true}>
                      <AppLayout>
                        <ForumPage />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/buddy"
                  element={
                    <ProtectedRoute allowGuest={true}>
                      <AppLayout>
                        <BuddyPage />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/vibes"
                  element={
                    <ProtectedRoute allowGuest={true}>
                      <AppLayout>
                        <VibesPage />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/payables"
                  element={
                    <ProtectedRoute allowGuest={true}>
                      <AppLayout>
                        <PayablesPage />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/play"
                  element={
                    <ProtectedRoute allowGuest={true}>
                      <AppLayout>
                        <SakhiPlayPage />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/videos"
                  element={
                    <ProtectedRoute allowGuest={true}>
                      <AppLayout>
                        <SakhiVideosPage />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />

                {/* Partner Layer Routes */}
                <Route
                  path="/partner"
                  element={
                    <ProtectedRoute allowGuest={true}>
                      <AppLayout>
                        <PartnerPortalPage />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/partner/training"
                  element={
                    <ProtectedRoute allowGuest={true}>
                      <AppLayout>
                        <FieldWorkerTrainingPage />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/partner/api-docs"
                  element={
                    <ProtectedRoute allowGuest={true}>
                      <AppLayout>
                        <PartnerApiDocPage />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                {/* Embeddable Educational Widget (Standalone, no header/footer layout) */}
                <Route
                  path="/partner/embed"
                  element={<EmbedWidgetPage />}
                />

                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </RewardsProvider>
        </CycleProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
