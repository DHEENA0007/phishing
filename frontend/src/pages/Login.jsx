import React, { useState } from 'react';
import { login } from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Droplets, ArrowRight } from 'lucide-react';

export default function Login({ setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login({ email, password });
            localStorage.setItem('token', data.token);
            setUser(data.user);
            navigate('/');
        } catch (err) {
            setError('Access Denied: Please check your credentials');
        }
    };

    return (
        <div className="auth-layout">
            <div className="glass-card auth-card" style={{ background: 'white' }}>
                <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', width: '80px', height: '80px', borderRadius: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px auto', boxShadow: 'var(--shadow-btn)', color: 'white' }}>
                    <ShieldCheck size={42} />
                </div>

                <h1 className="header-title" style={{ fontSize: '48px', marginBottom: '8px', textAlign: 'center' }}>OmniShield</h1>
                <p style={{ color: 'var(--text-dim)', fontSize: '18px', marginBottom: '48px', fontWeight: 500 }}>Secure Access Port</p>

                {error && <div style={{ background: 'rgba(239, 68, 68, 0.05)', color: 'var(--danger)', padding: '16px', borderRadius: '24px', marginBottom: '32px', fontSize: '14px', fontWeight: '700', border: '1px solid rgba(239, 68, 68, 0.1)' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginLeft: '12px', marginBottom: '8px', display: 'block' }}>Email Address</label>
                        <input
                            type="email"
                            className="input-field"
                            placeholder="user@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginLeft: '12px', marginBottom: '8px', display: 'block' }}>Password</label>
                        <input
                            type="password"
                            className="input-field"
                            placeholder="••••••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn" style={{ width: '100%', marginTop: '16px', borderRadius: '24px', height: '72px', fontSize: '18px' }}>
                        Secure Login <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                    </button>
                </form>

                <div style={{ marginTop: '40px', color: 'var(--text-dim)', fontWeight: 600 }}>
                    New user? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 800 }}>Sign Up →</Link>
                </div>
            </div>
        </div>
    );
}
