import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/api';
import { Droplets } from 'lucide-react';

export default function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login({ email, password });
            onLogin(data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid credentials');
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ background: 'var(--primary)', padding: '16px', borderRadius: '24px', display: 'inline-block', boxShadow: '0 0 30px var(--primary-glow)', marginBottom: '16px' }}>
                <Droplets size={48} color="white" />
            </div>
            <h1 className="header-title" style={{ fontSize: '42px', marginBottom: '8px', textAlign: 'center' }}>OctoGuard</h1>
            <p style={{ color: 'var(--text-dim)', marginBottom: '40px', fontSize: '18px' }}>Secure Identity Verification</p>

            {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '16px', borderRadius: '16px', marginBottom: '24px', border: '1px solid rgba(239, 68, 68, 0.2)', fontSize: '14px', fontWeight: '600' }}>{error}</div>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ textAlign: 'left' }}>
                    <label style={{ color: 'var(--text-dim)', display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Access Protocol (Email)</label>
                    <input
                        type="email"
                        className="input-field"
                        placeholder="identity@nexus.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div style={{ textAlign: 'left' }}>
                    <label style={{ color: 'var(--text-dim)', display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Security Key (Password)</label>
                    <input
                        type="password"
                        className="input-field"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn" style={{ width: '100%', marginTop: '20px', height: '60px', fontSize: '18px' }}>
                    Authorize Access
                </button>
            </form>

            <div style={{ marginTop: '32px', textAlign: 'center', color: 'var(--text-dim)' }}>
                <div style={{ marginBottom: '12px' }}>
                    <Link to="/forgot-password" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Protocol Recovery?</Link>
                </div>
                New Entity? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Register Node</Link>
            </div>
        </div>
    );
}
