import React, { useState, useEffect } from 'react';
import { User, ShieldAlert, Key, Trash2 } from 'lucide-react';
import { getCurrentUser, updateUser, changePassword, deleteAccount, getHistory } from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [history, setHistory] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        getCurrentUser().then(data => {
            setUser(data);
            setFirstName(data.first_name || '');
            setEmail(data.email || '');
        }).catch(console.error);

        getHistory().then(setHistory).catch(console.error);
    }, []);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const updatedUser = await updateUser({ first_name: firstName, email: email });
            setUser(updatedUser);
            setMessage('Profile updated successfully');
            localStorage.setItem('user', JSON.stringify(updatedUser)); // Keep synced
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to update profile');
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            await changePassword({ old_password: oldPassword, new_password: newPassword });
            setMessage('Password changed successfully');
            setOldPassword('');
            setNewPassword('');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to change password');
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                await deleteAccount();
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.location.href = '/login';
            } catch (err) {
                setError('Failed to delete account');
            }
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="header-title" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <User size={28} /> Account Profile
            </h1>

            {message && <div className="bg-safe text-safe" style={{ padding: '12px', borderRadius: '8px', marginBottom: '24px' }}>{message}</div>}
            {error && <div className="bg-danger text-danger" style={{ padding: '12px', borderRadius: '8px', marginBottom: '24px' }}>{error}</div>}

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '32px' }}>

                {/* Profile Details */}
                <div className="glass-container" style={{ padding: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                        <div style={{ background: 'var(--primary)', color: 'white', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold' }}>
                            {user.first_name ? user.first_name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 style={{ fontSize: '20px', margin: '0 0 4px 0' }}>{user.first_name || 'User'}</h2>
                            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{user.email}</p>
                        </div>
                    </div>

                    <form onSubmit={handleUpdateProfile}>
                        <div className="form-group">
                            <label className="input-label">Full Name</label>
                            <input type="text" className="input-field" value={firstName} onChange={e => setFirstName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="input-label">Email Address</label>
                            <input type="email" className="input-field" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ marginTop: '12px' }}>Update Profile</button>
                    </form>
                </div>

                {/* Account Stats & Security */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                    <div className="glass-container" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <h3 style={{ fontSize: '18px', margin: '0 0 4px 0', color: 'var(--text-secondary)' }}>Total Scans Conducted</h3>
                            <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>{history.length}</p>
                        </div>
                        <ShieldAlert size={48} color="rgba(255,255,255,0.1)" />
                    </div>

                    <div className="glass-container" style={{ padding: '32px' }}>
                        <h3 style={{ fontSize: '18px', marginBottom: '20px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <Key size={18} /> Change Password
                        </h3>
                        <form onSubmit={handleChangePassword}>
                            <div className="form-group">
                                <label className="input-label">Current Password</label>
                                <input type="password" className="input-field" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label className="input-label">New Password</label>
                                <input type="password" className="input-field" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn btn-outline" style={{ marginTop: '12px' }}>Change Password</button>
                        </form>
                    </div>

                </div>
            </div>

            <div className="glass-container" style={{ padding: '32px', marginTop: '32px', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.05)' }}>
                <h3 style={{ fontSize: '18px', color: 'var(--danger)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Trash2 size={20} /> Danger Zone
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                    Once you delete your account, there is no going back. All your scan history and preferences will be permanently erased.
                </p>
                <button className="btn" style={{ background: 'var(--danger)', color: 'white' }} onClick={handleDeleteAccount}>
                    Delete Account
                </button>
            </div>

        </div>
    );
}
