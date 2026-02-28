import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Bell, Moon, Sun, ShieldCheck } from 'lucide-react';
import { getSettings, updateSettings } from '../api/api';

export default function Settings() {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        getSettings().then(data => {
            setSettings(data);
            setLoading(false);
        }).catch(console.error);
    }, []);

    const handleToggle = async (key) => {
        setMessage('');
        const newSettings = { ...settings, [key]: !settings[key] };
        setSettings(newSettings);
        try {
            await updateSettings(newSettings);
            setMessage('Settings updated automatically');
        } catch (err) {
            console.error(err);
            setMessage('Failed to update settings');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="header-title" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <SettingsIcon size={28} /> Preferences
            </h1>

            {message && <div className="bg-safe text-safe" style={{ padding: '12px', borderRadius: '8px', marginBottom: '24px' }}>{message}</div>}

            <div className="glass-container" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '24px', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ background: 'rgba(79, 70, 229, 0.1)', padding: '12px', borderRadius: '50%' }}>
                            <ShieldCheck size={24} color="var(--primary)" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '18px', margin: '0 0 4px 0' }}>High Risk Content Alerts</h3>
                            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Receive immediate email alerts when dangerous content is detected.</p>
                        </div>
                    </div>
                    <button
                        className={`btn ${settings.email_alerts ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => handleToggle('email_alerts')}
                    >
                        {settings.email_alerts ? 'Enabled' : 'Disabled'}
                    </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '24px', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '12px', borderRadius: '50%' }}>
                            {settings.dark_mode ? <Moon size={24} color="var(--warning)" /> : <Sun size={24} color="var(--warning)" />}
                        </div>
                        <div>
                            <h3 style={{ fontSize: '18px', margin: '0 0 4px 0' }}>Appearance</h3>
                            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Toggle between light and dark modes (Currently locked to Dark for MVP).</p>
                        </div>
                    </div>
                    <button
                        className={`btn ${settings.dark_mode ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => handleToggle('dark_mode')}
                    >
                        {settings.dark_mode ? 'Dark Mode' : 'Light Mode'}
                    </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: '50%' }}>
                            <Bell size={24} color="var(--success)" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '18px', margin: '0 0 4px 0' }}>News & Educational Content</h3>
                            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Get weekly email updates about new phishing trends.</p>
                        </div>
                    </div>
                    <button
                        className={`btn ${settings.notification_preferences ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => handleToggle('notification_preferences')}
                    >
                        {settings.notification_preferences ? 'Subscribed' : 'Unsubscribed'}
                    </button>
                </div>

            </div>
        </div>
    );
}
