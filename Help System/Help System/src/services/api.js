import initialData from '../data/mockData.json';

const STORAGE_KEY = 'desk_app_db';

const getDB = () => {
  const db = localStorage.getItem(STORAGE_KEY);
  if (!db) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(db);
};

const saveDB = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const api = {
 // Aa  Login mat Function che
  login: async (email, password) => {
    const { users } = getDB();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) throw new Error('Invalid email or password');
    localStorage.setItem('auth_user', JSON.stringify(user));
    return user;
  },

  getCurrentUser: () => {
    const saved = localStorage.getItem('auth_user');
    return saved ? JSON.parse(saved) : null;
  },

  logout: async () => {
    localStorage.removeItem('auth_user');
  },

// users no data Feth karva mate ane get karva mate

  getUsers: async () => {
    const { users } = getDB();
    return users;
  },

  // Ticktes get karva mate aa function
  getTickets: async () => {
    const { tickets } = getDB();
    return tickets;
  },

  // new Ticket generate karva mate nu Function
  createTicket: async (ticketData) => {
    const db = getDB();
    const newTicket = {
      id: Date.now(),
      ticket_id: ticketData.ticket_id,
      subject: ticketData.subject,
      description: ticketData.description,
      priority: ticketData.priority,
      status: 'Open',
      assigned_to: ticketData.assigned_to ? Number(ticketData.assigned_to) : null,
      created_by: ticketData.created_by || 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    db.tickets.unshift(newTicket);
    saveDB(db);
    return newTicket;
  },

 // Tickets na Searching mate //
  getTicketById: async (id) => {
    const { tickets } = getDB();
    const ticket = tickets.find(t => t.id === Number(id));
    if (!ticket) throw new Error('Ticket not found');
    return ticket;
  },

  // Tickets ne Update karva mate 
  updateTicket: async (id, updates) => {
    const db = getDB();
    const index = db.tickets.findIndex(t => t.id === Number(id));
    if (index === -1) throw new Error('Ticket not found');
    
    db.tickets[index] = {
      ...db.tickets[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    saveDB(db);
    return db.tickets[index];
  },

 
  getComments: async (ticketId) => {
    const { comments } = getDB();
    return (comments || []).filter(c => c.ticket_id === Number(ticketId));
  },

 
  addComment: async (ticketId, userId, comment) => {
    const db = getDB();
    if (!db.comments) db.comments = [];
    const newComment = {
      id: Date.now(),
      ticket_id: Number(ticketId),
      user_id: Number(userId),
      comment,
      created_at: new Date().toISOString()
    };
    db.comments.push(newComment);
    saveDB(db);
    return newComment;
  }
};