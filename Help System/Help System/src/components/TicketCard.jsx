import React from 'react';

export const TicketCard = ({ title, count, borderColor, textColor }) => {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        borderTop: borderColor ? `4px solid ${borderColor}` : '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}
    >
      <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '500' }}>
        {title}
      </span>
      <h3 style={{ fontSize: '1.8rem', marginTop: '6px', color: textColor || '#11192b', margin: 0 }}>
        {count}
      </h3>
    </div>
  );
};