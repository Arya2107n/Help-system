import React from 'react';

export const StatusBadge = ({ status }) => {
  const colorMap = {
    Open: { bg: '#e0f2fe', color: '#0369a1' },
    'In Progress': { bg: '#fef3c7', color: '#b45309' },
    Resolved: { bg: '#dcfce7', color: '#15803d' },
    Closed: { bg: '#f3f4f6', color: '#4b5563' },
  };

  const current = colorMap[status] || colorMap.Closed;

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
      {status}
    </span>
  );
};