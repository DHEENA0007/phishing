import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register as registerApi } from '../api/api';
import { UserPlus } from 'lucide-react';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerApi({ email, password, fullName });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--secondary), var(--primary))', padding: '16px', borderRadius: '24px', display: 'inline-block', boxShadow: '0 8px 20px rgba(249, 115, 22, 0.3)', marginBottom: '16px' }}>
                <UserPlus size={48} color="white" />
            </div>
            <h1 className="header-title" style={{ fontSize: '36px', marginBottom: '8px' }}>Create Account</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Join OmniShield to protect your digital life</p>

            {error && <div className="bg-danger text-danger" style={{ padding: '12px', borderRadius: '20px', marginBottom: '24px' }}>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="input-label">Full Name</label>
                    <input
                        type="text"
                        className="input-field"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
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
                    Register Now
                </button>
            </form>

            <div style={{ marginTop: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                Already have an account? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Login</Link>
            </div>
        </div>
    );
}
