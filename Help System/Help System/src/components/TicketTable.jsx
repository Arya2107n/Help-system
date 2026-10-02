import React from 'react';
import { Link } from 'react-router-dom';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { formatDate } from '../utilis/ticketUtilis';

export const TicketTable = ({ tickets, users }) => {
  return (
    <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb', color: '#4b5563', fontSize: '0.82rem' }}>
            <th style={{ padding: '12px 16px' }}>Ticket ID</th>
            <th style={{ padding: '12px 16px' }}>Subject</th>
            <th style={{ padding: '12px 16px' }}>Priority</th>
            <th style={{ padding: '12px 16px' }}>Status</th>
            <th style={{ padding: '12px 16px' }}>Assigned To</th>
            <th style={{ padding: '12px 16px' }}>Created Date</th>
            <th style={{ padding: '12px 16px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => {
            const assignee = users.find((u) => u.id === t.assigned_to);
            return (
              <tr key={t.id} style={{ borderBottom: '1px solid #f3f4f6', fontSize: '0.9rem' }}>
                <td style={{ padding: '12px 16px', fontWeight: '600' }}>{t.ticket_id}</td>
                <td style={{ padding: '12px 16px' }}>{t.subject}</td>
                <td style={{ padding: '12px 16px' }}>
                  <PriorityBadge priority={t.priority} />
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <StatusBadge status={t.status} />
                </td>
                <td style={{ padding: '12px 16px' }}>{assignee ? assignee.name : 'Unassigned'}</td>
                <td style={{ padding: '12px 16px', color: '#6b7280' }}>{formatDate(t.created_at)}</td>
                <td style={{ padding: '12px 16px' }}>
                  <Link to={`/tickets/${t.id}`} style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}>
                    View
                  </Link>
                </td>
              </tr>
            );
          })}
          {tickets.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', padding: '24px', color: '#6b7280' }}>
                No tickets available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};