import React from 'react';
import { 
  X, 
  ExternalLink, 
  PhoneCall, 
  FileText, 
  ListOrdered, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Building,
  Award,
  Layers
} from 'lucide-react';
import ScoreBadge from './ScoreBadge';

const SchemeDetailModal = ({ scheme, eligibilityResult, onClose }) => {
  if (!scheme) return null;

  // Documents array
  const rawDocs = scheme.requiredDocuments || '';
  const documents = rawDocs.split(/[\r\n]+/).map(d => d.trim()).filter(Boolean);

  // Steps array
  const rawSteps = scheme.applicationProcedure || '';
  const steps = rawSteps.split(/[\r\n]+/).map(s => s.trim()).filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-fadeIn">
        {/* Modal Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex justify-between items-start gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800">
                {scheme.code}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-200 text-slate-700">
                {scheme.category}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-amber-100 text-amber-800">
                {scheme.level || 'Central'} Scheme
              </span>
              {eligibilityResult && (
                <ScoreBadge score={eligibilityResult.score} status={eligibilityResult.matchStatus} size="sm" />
              )}
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug">
              {scheme.name}
            </h2>
            <p className="text-sm text-slate-600 mt-1 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-slate-400" />
              {scheme.ministry}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Financial Benefit Callout */}
          {scheme.financialAidAmount > 0 && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Estimated Financial Assistance</p>
                <p className="text-2xl font-bold text-emerald-950">₹{scheme.financialAidAmount.toLocaleString('en-IN')}</p>
              </div>
              <Award className="w-10 h-10 text-emerald-600 opacity-80" />
            </div>
          )}

          {/* Scheme Description */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" /> Scheme Overview & Purpose
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {scheme.briefDescription || 'No description provided.'}
            </p>
          </div>

          {/* Scheme Benefits */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" /> Benefits & Subsidies
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
              {scheme.benefits || 'Financial, material, and institutional welfare benefits.'}
            </p>
          </div>

          {/* ELIGIBILITY ANALYSIS SECTION (if result provided) */}
          {eligibilityResult && (
            <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-indigo-950 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-indigo-600" /> Personal Eligibility Audit & Matching
                </h3>
                <ScoreBadge score={eligibilityResult.score} status={eligibilityResult.matchStatus} size="md" />
              </div>

              {/* Why Eligible */}
              {eligibilityResult.whyEligibleReasons?.length > 0 && (
                <div className="bg-white p-4 rounded-xl border border-emerald-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" /> Why You Are Eligible
                  </h4>
                  <ul className="space-y-1.5 text-sm text-slate-700">
                    {eligibilityResult.whyEligibleReasons.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Why Not Eligible & Missing Requirements */}
              {eligibilityResult.whyNotEligibleReasons?.length > 0 && (
                <div className="bg-white p-4 rounded-xl border border-rose-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 mb-2 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-600" /> Unmet Criteria
                  </h4>
                  <ul className="space-y-1.5 text-sm text-slate-700 mb-3">
                    {eligibilityResult.whyNotEligibleReasons.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-600 font-bold">✗</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Missing requirements callout */}
                  {eligibilityResult.missingRequirements?.length > 0 && (
                    <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <p className="text-xs font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600" /> Missing Eligibility Requirements:
                      </p>
                      <ul className="space-y-1 text-xs text-amber-800 list-disc list-inside">
                        {eligibilityResult.missingRequirements.map((req, idx) => (
                          <li key={idx}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Granular Rules Table */}
              {eligibilityResult.criteriaChecks?.length > 0 && (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <div className="px-4 py-2.5 bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Detailed Rule Breakdown ({eligibilityResult.passedCriteriaCount} / {eligibilityResult.totalCriteriaCount} Rules Passed)
                  </div>
                  <div className="divide-y divide-slate-100 text-xs">
                    {eligibilityResult.criteriaChecks.map((chk, i) => (
                      <div key={i} className="p-3 flex items-start justify-between gap-3">
                        <div className="space-y-0.5">
                          <p className="font-semibold text-slate-900">{chk.criterionName}</p>
                          <p className="text-slate-500">Scheme Requirement: <strong>{chk.requiredRule}</strong></p>
                          <p className="text-slate-500">Your Detail: <strong>{chk.citizenValue || 'N/A'}</strong></p>
                          <p className="text-slate-600 italic">{chk.reason}</p>
                        </div>
                        <div>
                          {chk.passed ? (
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold">Passed</span>
                          ) : (
                            <span className="px-2 py-0.5 bg-rose-100 text-rose-800 rounded font-semibold">Failed</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* REQUIRED DOCUMENTS SECTION */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" /> Required Documents
            </h3>
            {documents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                {documents.map((doc, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/60 shadow-xs">
                    <FileText className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-lg">Aadhaar Card, Active Bank Passbook, Address & Income proof.</p>
            )}
          </div>

          {/* APPLICATION PROCEDURE SECTION */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <ListOrdered className="w-4 h-4 text-emerald-600" /> Step-by-Step Application Procedure
            </h3>
            {steps.length > 0 ? (
              <div className="space-y-2.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-800 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-lg">Apply directly via official government portal or local district administrative office.</p>
            )}
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            {scheme.helplineNumber && (
              <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                <PhoneCall className="w-3.5 h-3.5 text-indigo-600" />
                Helpline: <strong>{scheme.helplineNumber}</strong>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={onClose} className="btn-secondary text-xs py-2 px-4">
              Close
            </button>
            {scheme.officialWebsite && (
              <a 
                href={scheme.officialWebsite} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
              >
                <span>Visit Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetailModal;
