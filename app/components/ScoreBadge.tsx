import React from 'react';

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let label = '';
  let colorClass = '';

  if (score >= 80) {
    label = 'Strong';
    colorClass = 'bg-green-100 text-green-700 border-green-200';
  } else if (score >= 60) {
    label = 'Good, Can Be Better';
    colorClass = 'bg-yellow-100 text-yellow-700 border-yellow-200';
  } else if (score >= 40) {
    label = 'Good Start';
    colorClass = 'bg-orange-100 text-orange-700 border-orange-200';
  } else {
    label = 'Needs Work';
    colorClass = 'bg-red-100 text-red-700 border-red-200';
  }

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${colorClass}`}>
      {label}
    </span>
  );
};

export default ScoreBadge;
