import React, { useEffect, useState } from 'react';
import { ShieldAlert, ShieldCheck, MailSearch, Link, MessagesSquare, Activity, AlertTriangle } from 'lucide-react';
import { getHistory } from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getHistory().then(setHistory).catch(console.error);
    }, []);

    const safeCount = history.filter(h => h.status === 'Safe').length;
    const threatCount = history.filter(h => h.status !== 'Safe').length;

    // Derived stats for the new dashboard layout
    const stats = {
        total: history.length,
        safe: safeCount,
        highRisk: threatCount // Assuming 'threatCount' maps to 'highRisk'
    };

    const recentScans = history.slice(0, 5); // For the recent activity stream

    return (
        <div className="fade-in">
            <h1 className="header-title">Security Dashboard</h1>

            <div className="dashboard-grid">
                <div className="glass-card stat-card" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
                    <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--primary-light)', color: 'var(--primary)', boxShadow: 'var(--shadow-inner)' }}>
                        <Activity size={32} />
                    </div>
                    <div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px', fontWeight: 600 }}>Total Scans</div>
                        <div style={{ fontSize: '32px', fontWeight: '800' }}>{stats.total}</div>
                    </div>
                </div>

                <div className="glass-card stat-card" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
                    <div style={{ padding: '16px', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', boxShadow: 'var(--shadow-inner)' }}>
                        <ShieldCheck size={32} />
                    </div>
                    <div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px', fontWeight: 600 }}>Safe Items</div>
                        <div style={{ fontSize: '32px', fontWeight: '800' }}>{stats.safe}</div>
                    </div>
                </div>

                <div className="glass-card stat-card" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
                    <div style={{ padding: '16px', borderRadius: '16px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', boxShadow: 'var(--shadow-inner)' }}>
                        <AlertTriangle size={32} />
                    </div>
                    <div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px', fontWeight: 600 }}>High Risk Flags</div>
                        <div style={{ fontSize: '32px', fontWeight: '800' }}>{stats.highRisk}</div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                <div className="glass-card">
                    <h2 style={{ fontSize: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Activity size={20} className="text-secondary" /> Recent Activity Stream
                    </h2>
                    {recentScans.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {recentScans.map((scan) => (
                                <div key={scan.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                                    <div>
                                        <div style={{ fontWeight: 600, marginBottom: '4px' }}>{scan.type} Scan</div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                            {new Date(scan.date_analyzed).toLocaleString()}
                                        </div>
                                    </div>
                                    <div className={`bg-${scan.status === 'Safe' ? 'safe' : scan.status === 'Suspicious' ? 'suspicious' : 'danger'}`} style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 600 }}>
                                        {scan.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '20px' }}>No recent activity to display.</p>
                    )}
                </div>
            </div>

            <h2 style={{ fontSize: '20px', marginBottom: '20px', marginTop: '40px' }}>Quick Actions</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '40px' }}>
                <button onClick={() => navigate('/analyze/email')} className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer', border: 'none', color: 'var(--text-primary)' }}>
                    <MailSearch size={40} color="var(--primary)" />
                    <span>Analyze Email</span>
                </button>
                <button onClick={() => navigate('/analyze/sms')} className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer', border: 'none', color: 'var(--text-primary)' }}>
                    <MessagesSquare size={40} color="#a855f7" />
                    <span>Analyze SMS</span>
                </button>
                <button onClick={() => navigate('/analyze/url')} className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer', border: 'none', color: 'var(--text-primary)' }}>
                    <Link size={40} color="var(--success)" />
                    <span>Check URL</span>
                </button>
            </div>

            <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Recent Activity</h2>
            <div className="glass-container" style={{ overflow: 'hidden', padding: '10px' }}>
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Risk Score</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.slice(0, 5).map(item => (
                            <tr key={item.id}>
                                <td>{item.type}</td>
                                <td style={{ color: 'var(--text-secondary)' }}>{new Date(item.date_analyzed).toLocaleString()}</td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ flex: 1, background: 'rgba(0,0,0,0.05)', height: '8px', borderRadius: '4px', overflow: 'hidden', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }}>
                                            <div style={{
                                                width: `${item.risk_score}%`,
                                                height: '100%',
                                                background: item.status === 'Safe' ? 'var(--success)' : item.status === 'Suspicious' ? 'var(--warning)' : 'var(--danger)',
                                                borderRadius: '4px'
                                            }} />
                                        </div>
                                        <span style={{ fontSize: '13px', fontWeight: '600' }}>{item.risk_score}%</span>
                                    </div>
                                </td>
                                <td>
                                    <span className={`bg-${item.status.toLowerCase().replace(' ', '-')}`} style={{ padding: '6px 16px', borderRadius: '16px', fontSize: '13px', fontWeight: 600 }}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {history.length === 0 && (
                            <tr>
                                <td colSpan="4" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>No analysis records found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
