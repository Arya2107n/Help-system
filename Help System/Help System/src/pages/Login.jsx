import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('support@company.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await api.login(email, password);
      onLoginSuccess(user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid Credentials');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6' }}>
      <div style={{ background: '#fff', padding: '32px', borderRadius: '8px', width: '100%', maxWidth: '380px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>Desk Login</h2>
        <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.9rem', marginBottom: '20px' }}>
          Enter credentials or click demo roles below
        </p>

        {error && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '8px', borderRadius: '4px', fontSize: '0.85rem', marginBottom: '14px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '4px', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '4px', boxSizing: 'border-box' }}
            />
          </div>

          <button
            type="submit"
            style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' }}
          >
            Sign In
          </button>
        </form>

        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #e5e7eb', fontSize: '0.85rem' }}>
          <span>Demo autofill:</span>
          <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
            <button
              type="button"
              onClick={() => { setEmail('rahul@company.com'); setPassword('123456'); }}
              style={{ padding: '4px 8px', cursor: 'pointer' }}
            >
              Support
            </button>
            <button
              type="button"
              onClick={() => { setEmail('amit@company.com'); setPassword('123456'); }}
              style={{ padding: '4px 8px', cursor: 'pointer' }}
            >
              Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};