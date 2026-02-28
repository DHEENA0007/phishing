import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, KeyRound, ArrowLeft } from 'lucide-react';
import { forgotPassword } from '../api/api';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);
        try {
            await forgotPassword({ email });
            setMessage('If an account exists with this email, a reset link will be sent shortly.');
        } catch (err) {
            setError('An error occurred. Please try again later.');
        }
        setLoading(false);
    };

    return (
        <div className="bg-animated" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="glass-container" style={{ width: '100%', maxWidth: '480px', padding: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <KeyRound size={48} color="var(--primary)" style={{ marginBottom: '16px' }} />
                    <h1 className="header-title" style={{ fontSize: '32px', marginBottom: '8px' }}>Reset Password</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Enter your email to receive a reset link</p>
                </div>

                {error && <div className="bg-danger text-danger" style={{ padding: '12px', borderRadius: '8px', marginBottom: '24px', textAlign: 'center' }}>{error}</div>}
                {message && <div className="bg-safe text-safe" style={{ padding: '12px', borderRadius: '8px', marginBottom: '24px', textAlign: 'center' }}>{message}</div>}

                {!message ? (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group" style={{ marginBottom: '24px' }}>
                            <label className="input-label">Registered Email Address</label>
                            <input
                                type="email"
                                className="input-field"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }} disabled={loading}>
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>
                ) : (
                    <button className="btn btn-primary" style={{ width: '100%', padding: '12px' }} onClick={() => setMessage(null)}>
                        Send Another Link
                    </button>
                )}

                <div style={{ marginTop: '24px', textAlign: 'center' }}>
                    <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <ArrowLeft size={16} /> Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
