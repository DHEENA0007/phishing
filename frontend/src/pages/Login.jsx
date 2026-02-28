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
            <div style={{ background: 'linear-gradient(135deg, var(--secondary), var(--primary))', padding: '16px', borderRadius: '24px', display: 'inline-block', boxShadow: '0 8px 20px rgba(249, 115, 22, 0.3)', marginBottom: '16px' }}>
                <Droplets size={48} color="white" />
            </div>
            <h1 className="header-title" style={{ fontSize: '36px', marginBottom: '8px' }}>OctoGuard</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Login safely and securely</p>

            {error && <div className="bg-danger text-danger" style={{ padding: '12px', borderRadius: '20px', marginBottom: '24px' }}>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="input-label">Email Address</label>
                    <input
                        type="email"
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group" style={{ marginBottom: '32px' }}>
                    <label className="input-label">Password</label>
                    <input
                        type="password"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Login to Dashboard
                </button>
            </form>

            <div style={{ marginTop: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                <div style={{ marginBottom: '12px' }}>
                    <Link to="/forgot-password" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Forgot Password?</Link>
                </div>
                Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Register here</Link>
            </div>
        </div>
    );
}
