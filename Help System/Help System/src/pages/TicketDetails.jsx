import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StatusBadge } from '../components/StatusBadge';
import { PriorityBadge } from '../components/PriorityBadge';
import { formatDate } from '../utilis/ticketUtilis';
import { api } from '../services/api';

export const TicketDetails = ({ tickets, users, onUpdateTicket, currentUser }) => {
  const { id } = useParams();
  const ticket = tickets.find((t) => t.id === Number(id));

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (ticket) {
      api.getComments(ticket.id).then(setComments);
    }
  }, [ticket?.id]);

  if (!ticket) {
    return (
      <div style={{ padding: '24px' }}>
        Ticket not found. <Link to="/tickets">Back to list</Link>
      </div>
    );
  }

  const assignee = users.find((u) => u.id === ticket.assigned_to);
  const creator = users.find((u) => u.id === ticket.created_by);

  // Sirf support staff ticket update / resolve kar sakta hai
  const isSupport = currentUser?.role === 'support';

  const handleStatusChange = (newStatus) => {
    if (!isSupport) return;
    onUpdateTicket(ticket.id, { status: newStatus });
  };

  const handleAssigneeChange = (userId) => {
    if (!isSupport) return;
    onUpdateTicket(ticket.id, { assigned_to: userId ? Number(userId) : null });
  };

  const handleResolve = () => {
    if (!isSupport) return;
    onUpdateTicket(ticket.id, {
      status: 'Resolved',
      resolved_at: new Date().toISOString(),
    });
  };

  const handleReopen = () => {
    if (!isSupport) return;
    onUpdateTicket(ticket.id, { status: 'Open', resolved_at: null });
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const added = await api.addComment(ticket.id, currentUser?.id || 1, commentText);
    setComments((prev) => [...prev, added]);
    setCommentText('');
  };

  const isDone = ticket.status === 'Resolved' || ticket.status === 'Closed';

  return (
    <div style={{ maxWidth: '800px', margin: '24px auto', padding: '0 16px' }}>
      <Link to="/tickets" style={{ color: '#2563eb', textDecoration: 'none' }}>
        ← Back to Ticket List
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <h2 style={{ margin: 0 }}>
          {ticket.ticket_id}: {ticket.subject}
        </h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <PriorityBadge priority={ticket.priority} />
          <StatusBadge status={ticket.status} />
        </div>
      </div>

      <div style={{ background: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', marginTop: '16px' }}>
        <h4>Description</h4>
        <p style={{ marginTop: '8px', lineHeight: '1.5', color: '#374151' }}>{ticket.description}</p>
        <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '16px', borderTop: '1px solid #f3f4f6', paddingTop: '10px' }}>
          Raised by: <strong>{creator?.name || 'Employee'}</strong> | Assigned to: <strong>{assignee?.name || 'Unassigned'}</strong> | Created: {formatDate(ticket.created_at)} | Last Updated: {formatDate(ticket.updated_at)}
          {ticket.resolved_at && <> | Resolved: {formatDate(ticket.resolved_at)}</>}
        </div>
      </div>

      {/* Update Controls */}
      <div
        style={{
          display: 'flex',
          gap: '20px',
          background: '#fff',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          marginTop: '16px',
          alignItems: 'flex-end',
        }}
      >
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '4px' }}>
            Update Status
          </label>
          <select
            value={ticket.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={!isSupport}
            style={{ padding: '6px 10px' }}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '4px' }}>
            Assigned Employee
          </label>
          <select
            value={ticket.assigned_to || ''}
            onChange={(e) => handleAssigneeChange(e.target.value)}
            disabled={!isSupport}
            style={{ padding: '6px 10px' }}
          >
            <option value="">Unassigned</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.role})
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginLeft: 'auto' }}>
          {isSupport ? (
            isDone ? (
              <button
                onClick={handleReopen}
                style={{ padding: '8px 16px', background: '#f59e0b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Reopen Ticket
              </button>
            ) : (
              <button
                onClick={handleResolve}
                style={{ padding: '8px 16px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                ✓ Mark as Resolved
              </button>
            )
          ) : (
            <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
              Only support staff can update this ticket
            </span>
          )}
        </div>
      </div>

      {/* Comments Section */}
      <div style={{ background: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', marginTop: '16px' }}>
        <h4>Ticket Comments & Activity</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '14px 0' }}>
          {comments.map((c) => {
            const commenter = users.find((u) => u.id === c.user_id);
            return (
              <div key={c.id} style={{ background: '#f9fafb', borderLeft: '3px solid #2563eb', padding: '8px 12px' }}>
                <span style={{ fontWeight: '600' }}>{commenter?.name || 'Staff'}: </span>
                <span>{c.comment}</span>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '4px' }}>{formatDate(c.created_at)}</div>
              </div>
            );
          })}
          {comments.length === 0 && <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>No comments posted yet.</p>}
        </div>

        <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Add internal note or comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px' }}
          />
          <button type="submit" style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Post
          </button>
        </form>
      </div>
    </div>
  );
};