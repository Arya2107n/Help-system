import React from 'react';

export const Header = ({ currentUser }) => {
  return (
    <header
      style={{
        background: '#fff',
        padding: '16px 24px',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <h4 style={{ margin: 0, color: '#374151' }}>🏥Support Ticket Management🏥</h4>
      <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
        Logged in as: <strong style={{ color: '#111827' }}>{currentUser?.name}</strong> ({currentUser?.email})
      </div>
    </header>
  );
};