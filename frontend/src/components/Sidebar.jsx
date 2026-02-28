import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MailSearch, MessageSquareWarning, Link as LinkIcon, History, BookOpen, LogOut, User, Settings, ShieldCheck } from 'lucide-react';

export default function Sidebar({ onLogout }) {
    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <ShieldCheck size={28} />
            </div>

            <div className="sidebar-content">
                <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <LayoutDashboard size={22} /> <span>Dashboard</span>
                </NavLink>

                <NavLink to="/analyze/email" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <MailSearch size={22} /> <span>Email Analyze</span>
                </NavLink>

                <NavLink to="/analyze/sms" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <MessageSquareWarning size={22} /> <span>SMS Analyze</span>
                </NavLink>

                <NavLink to="/analyze/url" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <LinkIcon size={22} /> <span>URL Scan</span>
                </NavLink>

                <NavLink to="/history" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <History size={22} /> <span>History</span>
                </NavLink>

                <div style={{ width: '1px', height: '32px', background: 'rgba(0,0,0,0.05)', margin: '0 8px' }}></div>

                <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <User size={22} /> <span>Profile</span>
                </NavLink>

                <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <Settings size={22} /> <span>Settings</span>
                </NavLink>

                <button onClick={onLogout} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger)' }}>
                    <LogOut size={22} /> <span>Sign Out</span>
                </button>
            </div>
        </div>
    );
}
