import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { generateTicketId } from '../utilis/ticketUtilis';

export const useTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [ticketsData, usersData] = await Promise.all([
        api.getTickets(),
        api.getUsers(),
      ]);
      setTickets(ticketsData);
      setUsers(usersData);
      setError(null);
    } catch (err) {
      setError("🚫Unable to load tickets🚫");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addTicket = async ({ subject, description, priority, assigned_to, created_by }) => {
    const newId = Date.now();
    const ticket_id = generateTicketId(tickets);
    const now = new Date().toISOString();

    const newTicket = {
      id: newId,
      ticket_id,
      subject,
      description,
      priority,
      status: 'Open',
      assigned_to: assigned_to ? Number(assigned_to) : null,
      created_by: created_by ? Number(created_by) : 3,
      created_at: now,
      updated_at: now,
    };

    const saved = await api.createTicket(newTicket);
    setTickets((prev) => [saved, ...prev]);
    return saved;
  };

  const updateTicket = async (id, updates) => {
    const updated = await api.updateTicket(id, updates);
    setTickets((prev) => prev.map((t) => (t.id === Number(id) ? updated : t)));
    return updated;
  };

  return {
    tickets,
    users,
    loading,
    error,
    refreshTickets: fetchData,
    addTicket,
    updateTicket,
  };
};