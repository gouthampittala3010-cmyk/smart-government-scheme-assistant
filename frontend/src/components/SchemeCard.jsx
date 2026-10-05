import React from 'react';
import { Building2, Award, ChevronRight, CheckCircle2 } from 'lucide-react';
import ScoreBadge from './ScoreBadge';

const SchemeCard = ({ scheme, eligibilityResult, onViewDetails, onCheckEligibility }) => {
  const score = eligibilityResult?.score;
  const matchStatus = eligibilityResult?.matchStatus;

  return (
    <div className="card-scheme flex flex-col justify-between">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
            {scheme.category}
          </span>
          <span className="text-xs font-medium text-slate-500">
            {scheme.level || 'Central'} • {scheme.applicableState || 'All India'}
          </span>
        </div>

        {/* Scheme Name & Ministry */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug mb-1">
          {scheme.name}
        </h3>
        <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
          <Building2 className="w-3.5 h-3.5 text-slate-400" />
          {scheme.ministry}
        </p>

        {/* Financial Benefit Callout */}
        {scheme.financialAidAmount > 0 && (
          <div className="flex items-center gap-2 mb-3 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-semibold">
            <Award className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Aid up to ₹{scheme.financialAidAmount.toLocaleString('en-IN')}</span>
          </div>
        )}

        {/* Description snippet */}
        <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
          {scheme.briefDescription || 'Empowering citizens through targeted government assistance and welfare benefits.'}
        </p>
      </div>

      <div>
        {/* Eligibility score pill if available */}
        {score !== undefined && (
          <div className="mb-3 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Eligibility Match:</span>
            <ScoreBadge score={score} status={matchStatus} size="sm" />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => onViewDetails(scheme, eligibilityResult)}
            className="btn-primary flex-1 text-xs py-2 px-3 flex items-center justify-center gap-1"
          >
            <span>View Details & Apply</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SchemeCard;
