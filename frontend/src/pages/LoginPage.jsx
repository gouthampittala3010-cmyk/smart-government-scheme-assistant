import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Lock, Mail, AlertCircle, Building2, UserCheck, ShieldCheck } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const userData = await login(email, password);
      if (userData.role === 'ROLE_ADMIN') {
        navigate('/admin');
      } else if (!userData.profileCompleted) {
        navigate('/profile');
      } else {
        navigate('/eligibility');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickLogin = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-10 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200/80 p-8">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto mb-3">
            <LogIn className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Sign In to GovScheme AI</h2>
          <p className="text-xs text-slate-500 mt-1">Access your personalized eligibility profile & scheme alerts</p>
        </div>

        {/* Demo Quick-Fill Buttons */}
        <div className="mb-6 p-3 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">
            Demo Test Accounts:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('citizen@example.com', 'citizen123')}
              className="px-2.5 py-1.5 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-xl text-left text-xs transition-colors flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="overflow-hidden">
                <p className="font-semibold text-slate-800 leading-tight truncate">Citizen User</p>
                <p className="text-[10px] text-slate-500 truncate">citizen@example.com</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('admin@gov.in', 'admin123')}
              className="px-2.5 py-1.5 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-xl text-left text-xs transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-700 shrink-0" />
              <div className="overflow-hidden">
                <p className="font-semibold text-slate-800 leading-tight truncate">Admin User</p>
                <p className="text-[10px] text-slate-500 truncate">admin@gov.in</p>
              </div>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. citizen@example.com"
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field pl-10"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full btn-primary py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mt-2"
          >
            <LogIn className="w-4 h-4" />
            <span>{submitting ? 'Signing In...' : 'Sign In'}</span>
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-800">
            Register as a Citizen
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
