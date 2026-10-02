import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiList, FiPlusSquare, FiLogOut } from 'react-icons/fi';

export const Sidebar = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <aside style={{ width: '240px', background: '#111827', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '24px 20px', borderBottom: '1px solid #1f2937' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>HelpDesk Pro</h3>
        <span style={{ fontSize: '0.72rem', background: '#2563eb', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>
          {currentUser?.role || 'User'}
        </span>
      </div>

      <nav style={{ flex: 1, padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <NavLink
          to="/dashboard"
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 20px',
            color: isActive ? '#fff' : '#9ca3af',
            background: isActive ? '#1f2937' : 'transparent',
            textDecoration: 'none',
          })}
        >
          <FiHome /> Dashboard
        </NavLink>
        <NavLink
          to="/tickets"
          end
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 20px',
            color: isActive ? '#fff' : '#9ca3af',
            background: isActive ? '#1f2937' : 'transparent',
            textDecoration: 'none',
          })}
        >
          <FiList /> Tickets
        </NavLink>
        <NavLink
          to="/tickets/create"
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 20px',
            color: isActive ? '#fff' : '#9ca3af',
            background: isActive ? '#1f2937' : 'transparent',
            textDecoration: 'none',
          })}
        >
          <FiPlusSquare /> Create Ticket
        </NavLink>
      </nav>

      <div style={{ padding: '16px', borderTop: '1px solid #1f2937' }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: '#dc2626',
            color: '#fff',
            border: 'none',
            padding: '8px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  );
};