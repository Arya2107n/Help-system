import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTickets } from './hooks/useTickets';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Login } from './pages/Login';
import { Dashboard } from './pages/DashBoard';
import { Tickets } from './pages/Tickets';
import { CreateTicket } from './pages/CreateTicket';
import { TicketDetails } from './pages/TicketDetails';

export default function App() {
  const { tickets, users, loading, error, addTicket, updateTicket } = useTickets();
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('desk_active_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('desk_active_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('desk_active_user');
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          currentUser ? <Navigate to="/dashboard" replace /> : <Login onLoginSuccess={handleLoginSuccess} />
        }
      />

      {/* Protected Routes */}
      <Route
        path="/*"
        element={
          !currentUser ? (
            <Navigate to="/login" replace />
          ) : (
            <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
              <Sidebar currentUser={currentUser} onLogout={handleLogout} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Header currentUser={currentUser} />
                <main style={{ flex: 1 }}>
                  <Routes>
                    <Route
                      path="dashboard"
                      element={<Dashboard tickets={tickets} users={users} loading={loading} error={error} />}
                    />
                    <Route
                      path="tickets"
                      element={<Tickets tickets={tickets} users={users} loading={loading} error={error} />}
                    />
                    <Route
                      path="tickets/create"
                      element={<CreateTicket onAddTicket={addTicket} users={users} currentUser={currentUser} />}
                    />
                    <Route
                      path="tickets/:id"
                      element={<TicketDetails tickets={tickets} users={users} onUpdateTicket={updateTicket} currentUser={currentUser} />}
                    />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </main>
              </div>
            </div>
          )
        }
      />
    </Routes>
  );
}