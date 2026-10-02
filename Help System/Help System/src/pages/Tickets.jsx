import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TicketTable } from '../components/TicketTable';

export const Tickets = ({ tickets, users, loading, error }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('');

  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      const matchSearch =
        t.ticket_id.toLowerCase().includes(search.toLowerCase()) ||
        t.subject.toLowerCase().includes(search.toLowerCase());

      const matchStatus = statusFilter ? t.status === statusFilter : true;
      const matchPriority = priorityFilter ? t.priority === priorityFilter : true;
      const matchAssignee = assigneeFilter ? String(t.assigned_to) === assigneeFilter : true;

      return matchSearch && matchStatus && matchPriority && matchAssignee;
    });
  }, [tickets, search, statusFilter, priorityFilter, assigneeFilter]);

  if (loading) return <div style={{ padding: '24px' }}>Loading Tickets...</div>;
  if (error) return <div style={{ padding: '24px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ margin: 0 }}>All Support Tickets</h2>
        <Link
          to="/tickets/create"
          style={{ background: '#2563eb', color: '#fff', padding: '8px 16px', borderRadius: '4px', textDecoration: 'none', fontWeight: '500' }}
        >
          + Create Ticket
        </Link>
      </div>

      {/* Multi-Filters and Search Controls (Section 4.3) */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by Ticket ID or Subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '8px 12px', minWidth: '240px', borderRadius: '4px', border: '1px solid #d1d5db' }}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
        >
          <option value="">Filter by Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
        >
          <option value="">Filter by Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={assigneeFilter}
          onChange={(e) => setAssigneeFilter(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
        >
          <option value="">Filter by Assignee</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name} ({u.role})
            </option>
          ))}
        </select>
      </div>

      <TicketTable tickets={filteredTickets} users={users} />
    </div>
  );
};