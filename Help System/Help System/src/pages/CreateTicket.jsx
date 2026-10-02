import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateTicketForm } from '../utilis/validation';

export const CreateTicket = ({ onAddTicket, users, currentUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: 'Medium',
    assigned_to: '',
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateTicketForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      const created = await onAddTicket({
        ...formData,
        created_by: currentUser?.id || 3,
      });
      alert(`Success! Ticket ${created.ticket_id} created.`);
      navigate('/tickets');
    } catch (err) {
      alert("Failed to create ticket.");
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
      <h2 style={{ marginBottom: '16px' }}>Create Support Ticket</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '4px' }}>
            Subject *
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="e.g. Cannot access VPN"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
          {errors.subject && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.subject}</span>}
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '4px' }}>
            Description *
          </label>
          <textarea
            rows="4"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Details of the issue..."
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
          {errors.description && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.description}</span>}
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '4px' }}>
            Priority *
          </label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '4px' }}>
            Assigned To (Optional)
          </label>
          <select
            value={formData.assigned_to}
            onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })}
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="">-- Unassigned --</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.role})
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Submit Ticket
        </button>
      </form>
    </div>
  );
};