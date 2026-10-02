import React from 'react';

export const PriorityBadge = ({ priority }) => {
  const colorMap = {
    High: { bg: '#fee2e2', color: '#b91c1c' },
    Medium: { bg: '#ffedd5', color: '#c2410c' },
    Low: { bg: '#ecfdf5', color: '#047857' },
  };

  const current = colorMap[priority] || colorMap.Low;

  return (
    <span
      style={{
        backgroundColor: current.bg,
        color: current.color,
        padding: '3px 8px',
        borderRadius: '12px',
        fontSize: '0.75rem',
        fontWeight: '600',
        display: 'inline-block',
      }}
    >
      {priority}
    </span>
  );
};