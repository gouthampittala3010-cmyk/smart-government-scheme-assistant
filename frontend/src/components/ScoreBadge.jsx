import React from 'react';
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

const ScoreBadge = ({ score, status, size = 'md' }) => {
  let colorStyles = '';
  let Icon = CheckCircle2;
  let label = 'Eligible';

  if (score >= 100 || status === 'FULLY_ELIGIBLE') {
    colorStyles = 'bg-emerald-50 text-emerald-700 border-emerald-300';
    Icon = CheckCircle2;
    label = '100% Eligible';
  } else if (score >= 60 || status === 'PARTIALLY_ELIGIBLE') {
    colorStyles = 'bg-amber-50 text-amber-700 border-amber-300';
    Icon = AlertCircle;
    label = `${score}% Partially Eligible`;
  } else {
    colorStyles = 'bg-rose-50 text-rose-700 border-rose-300';
    Icon = XCircle;
    label = `${score}% Ineligible`;
  }

  const sizeClasses = size === 'sm' 
    ? 'text-xs px-2.5 py-1 gap-1' 
    : size === 'lg' 
      ? 'text-base px-4 py-2 gap-2 font-bold' 
      : 'text-sm px-3 py-1.5 gap-1.5 font-semibold';

  return (
    <span className={`inline-flex items-center rounded-full border shadow-sm ${colorStyles} ${sizeClasses}`}>
      <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
      <span>{label}</span>
    </span>
  );
};

export default ScoreBadge;
