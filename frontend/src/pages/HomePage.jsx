import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  Building2, 
  FileText, 
  ArrowRight, 
  Users,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { schemeApi } from '../api';
import SchemeCard from '../components/SchemeCard';
import SchemeDetailModal from '../components/SchemeDetailModal';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const [featuredSchemes, setFeaturedSchemes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const res = await schemeApi.getAll();
        setFeaturedSchemes(res.data.slice(0, 6));
      } catch (err) {
        console.error('Failed to load schemes:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchemes();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/schemes?keyword=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/schemes');
    }
  };

  return (
    <div className="space-y-16 py-6">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white p-8 md:p-14 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Powered Government Benefit & Welfare Matching</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Discover Government Schemes Tailored to Your Profile
          </h1>

          <p className="text-sm md:text-base text-indigo-100/90 leading-relaxed">
            Never miss out on government assistance. Our intelligent eligibility engine analyzes your age, income, occupation, and demographics to identify benefits, verify missing criteria, and guide your application step by step.
          </p>

          {/* Quick Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-2 max-w-2xl bg-white/10 p-2 rounded-2xl backdrop-blur-md border border-white/20">
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60" />
              <input
                type="text"
                placeholder="Search schemes e.g. 'Farmer subsidy', 'PM Awas', 'Scholarship'..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/15 rounded-xl text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 border border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              to="/eligibility"
              className="px-6 py-3 rounded-xl bg-white text-indigo-900 font-bold text-sm hover:bg-indigo-50 transition-colors shadow-lg flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Check My Eligibility</span>
            </Link>

            {!isAuthenticated ? (
              <Link
                to="/register"
                className="px-6 py-3 rounded-xl bg-indigo-700/60 hover:bg-indigo-700 text-white font-semibold text-sm border border-indigo-400/40 transition-colors flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span>Create Citizen Account</span>
              </Link>
            ) : (
              <Link
                to="/profile"
                className="px-6 py-3 rounded-xl bg-indigo-700/60 hover:bg-indigo-700 text-white font-semibold text-sm border border-indigo-400/40 transition-colors flex items-center gap-2"
              >
                <span>Edit Demographic Profile</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">How GovScheme AI Works</h2>
          <p className="text-sm text-slate-600 mt-2">
            A comprehensive, citizen-first platform delivering transparency, accurate rule calculation, and step-by-step application guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">1. Citizen Profile</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enter your age, gender, state, income, caste category, occupation, and landholdings once securely.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">2. AI Eligibility Score</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our automated engine evaluates 12+ criteria to score your eligibility from 0% to 100% across all national programs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">3. Transparent Audit</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              See exactly why you qualify, what requirements are missing, and what documents are required before applying.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">4. Apply with Ease</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Follow simple numbered step-by-step procedures with direct links to official Central and State application portals.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Schemes Section */}
      <section className="container-custom">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Explore National Initiatives</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">Featured Government Schemes</h2>
          </div>
          <Link to="/schemes" className="btn-secondary text-xs flex items-center gap-1.5 py-2 px-4">
            <span>View All Schemes</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 rounded-2xl bg-slate-100 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                onViewDetails={(s) => setSelectedScheme(s)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Scheme Detail Modal */}
      {selectedScheme && (
        <SchemeDetailModal
          scheme={selectedScheme}
          onClose={() => setSelectedScheme(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
