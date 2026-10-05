import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, 
  UserCheck, 
  CheckCircle2, 
  Search, 
  ShieldCheck, 
  LogOut, 
  LogIn, 
  UserPlus, 
  Sparkles 
} from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar-container">
      {/* Top Government Banner */}
      <div className="top-tricolor-bar">
        <div className="container-custom flex justify-between items-center text-xs py-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-emerald-800">राष्ट्रीय सेवा पोर्टल | National Citizen Assistance Portal</span>
          </div>
          <div className="flex items-center gap-4 text-slate-600">
            <span>Toll-Free Helpline: <strong>1800-11-2026</strong></span>
            <span>Language: English</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="main-nav">
        <div className="container-custom flex items-center justify-between py-3">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 to-indigo-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900">GovScheme</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-indigo-100 text-indigo-800 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-600" /> AI
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Citizen Eligibility & Assistance System</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 md:gap-2">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}
            >
              Home
            </Link>

            <Link 
              to="/schemes" 
              className={`nav-link ${isActive('/schemes') ? 'nav-link-active' : ''}`}
            >
              <Search className="w-4 h-4 inline mr-1" />
              Schemes
            </Link>

            <Link 
              to="/eligibility" 
              className={`nav-link ${isActive('/eligibility') ? 'nav-link-active' : ''}`}
            >
              <CheckCircle2 className="w-4 h-4 inline mr-1 text-emerald-600" />
              Eligibility Checker
            </Link>

            {isAuthenticated && !isAdmin && (
              <Link 
                to="/profile" 
                className={`nav-link ${isActive('/profile') ? 'nav-link-active' : ''}`}
              >
                <UserCheck className="w-4 h-4 inline mr-1 text-indigo-600" />
                Citizen Profile
              </Link>
            )}

            {isAdmin && (
              <Link 
                to="/admin" 
                className={`nav-link text-indigo-700 font-semibold ${isActive('/admin') ? 'nav-link-active' : ''}`}
              >
                <ShieldCheck className="w-4 h-4 inline mr-1 text-indigo-700" />
                Admin Dashboard
              </Link>
            )}
          </div>

          {/* Auth Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-slate-800 leading-tight">{user?.fullName}</p>
                  <p className="text-xs text-indigo-600 font-medium">
                    {isAdmin ? 'System Administrator' : 'Verified Citizen'}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn-outline-danger flex items-center gap-1.5 py-1.5 px-3 text-xs"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-secondary py-1.5 px-3 text-xs flex items-center gap-1.5">
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>
                <Link to="/register" className="btn-primary py-1.5 px-3 text-xs flex items-center gap-1.5">
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
