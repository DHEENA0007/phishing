import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MailSearch, MessageSquareWarning, Link as LinkIcon, History, BookOpen, LogOut, User, Settings, ShieldAlert } from 'lucide-react';

export default function Sidebar({ onLogout }) {
    return (
        <div className="sidebar">
            <div style={{ padding: '32px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '12px' }}>
                    <div style={{ background: 'linear-gradient(135deg, var(--primary), #818cf8)', padding: '8px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)' }}>
                        <ShieldAlert size={28} color="white" />
                    </div>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, fontFamily: 'Outfit, sans-serif' }}>PhishGuard</h2>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                    <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        <LayoutDashboard size={20} /> Dashboard
                    </NavLink>

                    <div style={{ margin: '24px 0 8px 16px', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Scanners</div>

                    <NavLink to="/analyze/email" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        <MailSearch size={20} /> Check Email
                    </NavLink>
                    <NavLink to="/analyze/sms" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        <MessageSquareWarning size={20} /> Check SMS
                    </NavLink>
                    <NavLink to="/analyze/url" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        <LinkIcon size={20} /> Check URL
                    </NavLink>

                    <div style={{ margin: '24px 0 8px 16px', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Analytics</div>
                    <NavLink to="/history" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        <History size={20} /> History
                    </NavLink>
                    <NavLink to="/education" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        <BookOpen size={20} /> Education
                    </NavLink>
                </nav>

                <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
                    <div style={{ margin: '0 0 16px 16px', fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Account</div>
                    <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        <User size={20} /> Profile
                    </NavLink>
                    <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        <Settings size={20} /> Settings
                    </NavLink>
                    <button onClick={onLogout} className="nav-link" style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', color: 'var(--danger)', marginTop: '8px' }}>
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
