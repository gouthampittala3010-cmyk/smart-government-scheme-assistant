import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AiChatWidget from './components/AiChatWidget';
import SchemeDetailModal from './components/SchemeDetailModal';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import SchemesPage from './pages/SchemesPage';
import EligibilityCheckerPage from './pages/EligibilityCheckerPage';
import CitizenProfilePage from './pages/CitizenProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [activeModalScheme, setActiveModalScheme] = useState(null);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
          <Navbar />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/schemes" element={<SchemesPage />} />
              <Route path="/eligibility" element={<EligibilityCheckerPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Authenticated Citizen Route */}
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <CitizenProfilePage />
                  </ProtectedRoute>
                } 
              />

              {/* Protected Administrator Route */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminDashboardPage />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>

          <Footer />

          {/* Global AI Assistant Floating Widget */}
          <AiChatWidget onSelectScheme={(scheme) => setActiveModalScheme(scheme)} />

          {/* Global Detail Modal (for AI recommended schemes) */}
          {activeModalScheme && (
            <SchemeDetailModal
              scheme={activeModalScheme}
              onClose={() => setActiveModalScheme(null)}
            />
          )}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
