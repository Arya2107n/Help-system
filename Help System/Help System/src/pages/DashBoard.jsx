import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TicketCard } from '../components/TicketCard';
import { TicketTable } from '../components/TicketTable';

export const Dashboard = ({ tickets, users, loading, error }) => {
  const stats = useMemo(() => {
    return {
      total: tickets.length,
      open: tickets.filter((t) => t.status === 'Open').length,
      inProgress: tickets.filter((t) => t.status === 'In Progress').length,
      resolved: tickets.filter((t) => t.status === 'Resolved').length,
      closed: tickets.filter((t) => t.status === 'Closed').length,
      highPriority: tickets.filter((t) => t.priority === 'High').length,
    };
  }, [tickets]);

  const recentTickets = useMemo(() => tickets.slice(0, 5), [tickets]);

  if (loading) return <div style={{ padding: '24px' }}>Loading Dashboard...</div>;
  if (error) return <div style={{ padding: '24px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ marginBottom: '20px' }}>Dashboard Overview</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <TicketCard title="Total Tickets" count={stats.total} />
        <TicketCard title="Open Tickets" count={stats.open} borderColor="#0284c7" textColor="#0284c7" />
        <TicketCard title="In Progress" count={stats.inProgress} borderColor="#d97706" textColor="#d97706" />
        <TicketCard title="Resolved" count={stats.resolved} borderColor="#16a34a" textColor="#16a34a" />
        <TicketCard title="Closed" count={stats.closed} borderColor="#6b7280" textColor="#6b7280" />
        <TicketCard title="High Priority" count={stats.highPriority} borderColor="#dc2626" textColor="#dc2626" />
      </div>

    
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 style={{ margin: 0 }}>Recent Tickets</h3>
        <Link to="/tickets" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}>
          View All Tickets →
        </Link>
      </div>

      <TicketTable tickets={recentTickets} users={users} />
    </div>
  );
};