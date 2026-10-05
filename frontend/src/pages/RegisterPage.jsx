import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, User, Mail, Lock, Phone, AlertCircle, Shield } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    role: 'ROLE_CITIZEN',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setSubmitting(true);
    try {
      const newUser = await register({
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        role: formData.role,
      });

      if (newUser.role === 'ROLE_ADMIN') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. An account with this email may already exist.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl border border-slate-200/80 p-8">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto mb-3">
            <UserPlus className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Create Citizen Account</h2>
          <p className="text-xs text-slate-500 mt-1">Register to check scheme eligibility and get personalized guidance</p>
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
              Full Legal Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Ramesh Kumar"
                className="input-field pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ramesh@example.com"
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+91-9876543210"
                  className="input-field pl-10"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min 6 characters"
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-type password"
                  className="input-field pl-10"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Account Type / Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-colors ${
                formData.role === 'ROLE_CITIZEN' ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-semibold' : 'border-slate-200'
              }`}>
                <input
                  type="radio"
                  name="role"
                  value="ROLE_CITIZEN"
                  checked={formData.role === 'ROLE_CITIZEN'}
                  onChange={handleChange}
                  className="hidden"
                />
                <User className="w-4 h-4 text-indigo-600" />
                <span className="text-xs">Citizen (Applicant)</span>
              </label>

              <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-colors ${
                formData.role === 'ROLE_ADMIN' ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-semibold' : 'border-slate-200'
              }`}>
                <input
                  type="radio"
                  name="role"
                  value="ROLE_ADMIN"
                  checked={formData.role === 'ROLE_ADMIN'}
                  onChange={handleChange}
                  className="hidden"
                />
                <Shield className="w-4 h-4 text-indigo-600" />
                <span className="text-xs">Administrator</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full btn-primary py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mt-4"
          >
            <UserPlus className="w-4 h-4" />
            <span>{submitting ? 'Creating Account...' : 'Complete Registration'}</span>
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-800">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
