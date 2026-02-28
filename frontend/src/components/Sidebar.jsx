import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MailSearch, MessageSquareWarning, Link as LinkIcon, History, BookOpen, LogOut, User, Settings, Droplets } from 'lucide-react';

export default function Sidebar({ onLogout }) {
    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <Droplets size={28} />
            </div>

            <div className="sidebar-content">
                <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <LayoutDashboard size={20} /> <span>Dashboard</span>
                </NavLink>

                <NavLink to="/analyze/email" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <MailSearch size={20} /> <span>Check Email</span>
                </NavLink>
                <NavLink to="/analyze/sms" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <MessageSquareWarning size={20} /> <span>Check SMS</span>
                </NavLink>
                <NavLink to="/analyze/url" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <LinkIcon size={20} /> <span>Check URL</span>
                </NavLink>

                <NavLink to="/history" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <History size={20} /> <span>History</span>
                </NavLink>
                <NavLink to="/education" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <BookOpen size={20} /> <span>Education</span>
                </NavLink>

                <div style={{ marginTop: 'auto', width: '100%' }}>
                    <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        <User size={20} /> <span>Profile</span>
                    </NavLink>
                    <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        <Settings size={20} /> <span>Settings</span>
                    </NavLink>
                    <button onClick={onLogout} className="nav-link" style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', color: 'var(--danger)' }}>
                        <LogOut size={20} /> <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
