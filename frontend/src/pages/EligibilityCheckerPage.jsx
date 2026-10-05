import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eligibilityApi } from '../api';
import { useAuth } from '../context/AuthContext';
import ScoreBadge from '../components/ScoreBadge';
import SchemeDetailModal from '../components/SchemeDetailModal';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  FileText, 
  ListOrdered, 
  ExternalLink, 
  ArrowRight, 
  RefreshCw, 
  Filter, 
  UserCheck,
  Building2,
  Award,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';

const EligibilityCheckerPage = () => {
  const { isAuthenticated, user } = useAuth();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('ALL'); // ALL, FULLY_ELIGIBLE, PARTIALLY_ELIGIBLE, NOT_ELIGIBLE
  const [selectedResult, setSelectedResult] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});

  // Anonymous quick-test profile state
  const [anonymousProfile, setAnonymousProfile] = useState({
    age: 26,
    gender: 'Male',
    state: 'Karnataka',
    annualIncome: 180000,
    occupation: 'Farmer',
    category: 'OBC',
    education: '10th Pass',
    hasLand: true,
    bplCardHolder: true,
    ruralUrban: 'Rural',
    disability: false,
    minority: false,
  });

  const runEligibilityCheck = async () => {
    setLoading(true);
    try {
      if (isAuthenticated) {
        const res = await eligibilityApi.checkUserEligibility();
        setResults(res.data);
      } else {
        const res = await eligibilityApi.checkAnonymous(anonymousProfile);
        setResults(res.data);
      }
    } catch (err) {
      console.error('Failed to run eligibility check:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runEligibilityCheck();
  }, [isAuthenticated]);

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredResults = results.filter((item) => {
    if (filterStatus === 'FULLY_ELIGIBLE') return item.score === 100 || item.matchStatus === 'FULLY_ELIGIBLE';
    if (filterStatus === 'PARTIALLY_ELIGIBLE') return item.score >= 60 && item.score < 100;
    if (filterStatus === 'NOT_ELIGIBLE') return item.score < 60;
    return true;
  });

  const fullyEligibleCount = results.filter((r) => r.score === 100 || r.matchStatus === 'FULLY_ELIGIBLE').length;
  const partialCount = results.filter((r) => r.score >= 60 && r.score < 100).length;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Automated Matching & Rule Audit Engine</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">Scheme Eligibility Calculator</h1>
          <p className="text-xs md:text-sm text-indigo-200 mt-1 max-w-2xl leading-relaxed">
            Every scheme is audited against 12 demographic and financial rules. Review your score, reasons for eligibility, unmet requirements, and required documents.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          {isAuthenticated && (
            <Link
              to="/profile"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold border border-white/20 transition-colors flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Edit My Profile</span>
            </Link>
          )}

          <button
            onClick={runEligibilityCheck}
            disabled={loading}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-md flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Re-calculate Scores</span>
          </button>
        </div>
      </div>

      {/* Guest Mode Demographics Bar */}
      {!isAuthenticated && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-sm">Guest Quick-Evaluation Mode</h3>
            </div>
            <Link to="/login" className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
              Sign In to save permanently →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Age</label>
              <input
                type="number"
                value={anonymousProfile.age}
                onChange={(e) => setAnonymousProfile({ ...anonymousProfile, age: parseInt(e.target.value) || 0 })}
                className="input-field text-xs py-1.5"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Gender</label>
              <select
                value={anonymousProfile.gender}
                onChange={(e) => setAnonymousProfile({ ...anonymousProfile, gender: e.target.value })}
                className="input-field text-xs py-1.5"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">State</label>
              <input
                type="text"
                value={anonymousProfile.state}
                onChange={(e) => setAnonymousProfile({ ...anonymousProfile, state: e.target.value })}
                className="input-field text-xs py-1.5"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Annual Income (₹)</label>
              <input
                type="number"
                value={anonymousProfile.annualIncome}
                onChange={(e) => setAnonymousProfile({ ...anonymousProfile, annualIncome: parseFloat(e.target.value) || 0 })}
                className="input-field text-xs py-1.5"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Occupation</label>
              <select
                value={anonymousProfile.occupation}
                onChange={(e) => setAnonymousProfile({ ...anonymousProfile, occupation: e.target.value })}
                className="input-field text-xs py-1.5"
              >
                <option value="Farmer">Farmer</option>
                <option value="Student">Student</option>
                <option value="Daily Wage / Laborer">Daily Wage</option>
                <option value="Self Employed / Entrepreneur">Self Employed</option>
                <option value="Unemployed">Unemployed</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Category</label>
              <select
                value={anonymousProfile.category}
                onChange={(e) => setAnonymousProfile({ ...anonymousProfile, category: e.target.value })}
                className="input-field text-xs py-1.5"
              >
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={runEligibilityCheck}
              className="btn-primary py-2 px-4 text-xs font-semibold flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Apply Filters & Re-evaluate</span>
            </button>
          </div>
        </div>
      )}

      {/* Stats Summary & Filter Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Metric Badges */}
        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{fullyEligibleCount} Fully Eligible (100%)</span>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>{partialCount} Partially Matched</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterStatus === 'ALL' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Schemes ({results.length})
          </button>
          <button
            onClick={() => setFilterStatus('FULLY_ELIGIBLE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterStatus === 'FULLY_ELIGIBLE' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            100% Eligible
          </button>
          <button
            onClick={() => setFilterStatus('PARTIALLY_ELIGIBLE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterStatus === 'PARTIALLY_ELIGIBLE' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Partial
          </button>
          <button
            onClick={() => setFilterStatus('NOT_ELIGIBLE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterStatus === 'NOT_ELIGIBLE' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ineligible
          </button>
        </div>
      </div>

      {/* Results List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-44 rounded-3xl bg-slate-100 animate-pulse"></div>
          ))}
        </div>
      ) : filteredResults.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No schemes found for this filter</h3>
          <p className="text-xs text-slate-500">Switch filter to 'All Schemes' to inspect all potential initiatives.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredResults.map((item) => {
            const isExpanded = !!expandedCards[item.scheme.id];
            const isFullyEligible = item.score === 100;

            return (
              <div
                key={item.scheme.id}
                className={`bg-white rounded-3xl border transition-all duration-200 overflow-hidden shadow-xs hover:shadow-md ${
                  isFullyEligible ? 'border-emerald-300 ring-1 ring-emerald-400/20' : 'border-slate-200'
                }`}
              >
                {/* Main Summary Header */}
                <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                        {item.scheme.code}
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        {item.scheme.category} • {item.scheme.ministry}
                      </span>
                    </div>

                    <h2 className="text-lg md:text-xl font-bold text-slate-900 leading-snug">
                      {item.scheme.name}
                    </h2>

                    {item.scheme.financialAidAmount > 0 && (
                      <p className="text-xs font-semibold text-emerald-700">
                        Direct Assistance: up to ₹{item.scheme.financialAidAmount.toLocaleString('en-IN')}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <ScoreBadge score={item.score} status={item.matchStatus} size="md" />

                    <button
                      onClick={() => toggleExpand(item.scheme.id)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                      title={isExpanded ? 'Collapse analysis' : 'Expand detailed analysis'}
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>

                    <button
                      onClick={() => setSelectedResult(item)}
                      className="btn-primary py-2 px-4 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Documents & Apply</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Quick Rule Snippets (Always visible preview) */}
                <div className="px-6 pb-4 pt-1 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600 border-t border-slate-50 bg-slate-50/40">
                  <span className="font-semibold text-slate-700">
                    Criteria Passed: <strong className="text-emerald-700">{item.passedCriteriaCount}</strong> / {item.totalCriteriaCount}
                  </span>

                  {item.whyEligibleReasons?.length > 0 && (
                    <span className="text-emerald-700 truncate max-w-md">
                      ✓ {item.whyEligibleReasons[0]}
                    </span>
                  )}

                  {item.missingRequirements?.length > 0 && (
                    <span className="text-rose-700 font-medium truncate max-w-md">
                      ✗ Missing: {item.missingRequirements[0]}
                    </span>
                  )}
                </div>

                {/* Collapsible Deep-Dive Audit Details */}
                {isExpanded && (
                  <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-5 animate-fadeIn">
                    {/* Why Eligible (Green) */}
                    {item.whyEligibleReasons?.length > 0 && (
                      <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200">
                        <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Why You Are Eligible:
                        </h4>
                        <ul className="space-y-1.5 text-xs text-emerald-950">
                          {item.whyEligibleReasons.map((reason, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-emerald-600 font-bold">✓</span>
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Why Not Eligible & Missing Requirements (Red & Amber) */}
                    {item.whyNotEligibleReasons?.length > 0 && (
                      <div className="p-4 bg-rose-50/80 rounded-2xl border border-rose-200 space-y-3">
                        <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                          <XCircle className="w-4 h-4 text-rose-600" />
                          Unmet Scheme Criteria:
                        </h4>
                        <ul className="space-y-1.5 text-xs text-rose-950">
                          {item.whyNotEligibleReasons.map((reason, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-rose-600 font-bold">✗</span>
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>

                        {item.missingRequirements?.length > 0 && (
                          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 mt-2">
                            <p className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1 mb-1">
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Missing Requirements to Qualify:
                            </p>
                            <ul className="list-disc list-inside space-y-0.5 text-xs text-amber-800">
                              {item.missingRequirements.map((req, rIdx) => (
                                <li key={rIdx}>{req}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Granular Rules Checklist Table */}
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                      <div className="px-4 py-2.5 bg-slate-100/80 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Rule-By-Rule Audit Comparison
                      </div>
                      <div className="divide-y divide-slate-100 text-xs">
                        {item.criteriaChecks?.map((chk, cIdx) => (
                          <div key={cIdx} className="p-3.5 flex items-start justify-between gap-4">
                            <div className="space-y-0.5">
                              <p className="font-bold text-slate-800">{chk.criterionName}</p>
                              <p className="text-slate-500">Scheme Requirement: <span className="font-semibold text-slate-700">{chk.requiredRule}</span></p>
                              <p className="text-slate-500">Your Detail: <span className="font-semibold text-slate-700">{chk.citizenValue}</span></p>
                              <p className="text-slate-600 italic text-[11px] pt-0.5">{chk.reason}</p>
                            </div>
                            <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] shrink-0 ${
                              chk.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {chk.passed ? '✓ Passed' : '✗ Failed'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons inside expanded audit */}
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => setSelectedResult(item)}
                        className="btn-primary py-2 px-5 text-xs font-bold flex items-center gap-1.5 shadow-sm"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View Required Documents & Application Steps</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Detailed Modal for documents & steps */}
      {selectedResult && (
        <SchemeDetailModal
          scheme={selectedResult.scheme}
          eligibilityResult={selectedResult}
          onClose={() => setSelectedResult(null)}
        />
      )}
    </div>
  );
};

export default EligibilityCheckerPage;
