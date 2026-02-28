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

            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '32px', marginTop: '40px', color: 'var(--text-primary)' }}>Live Threat Intelligence Feed</h2>
            <div className="glass-card" style={{ padding: '40px', position: 'relative' }}>
                {history.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
                        {/* The Vertical Line */}
                        <div style={{ position: 'absolute', left: '20px', top: '10px', bottom: '10px', width: '3px', background: 'linear-gradient(to bottom, var(--primary), var(--secondary), transparent)', borderRadius: '3px', opacity: 0.3 }}></div>

                        {history.slice(0, 6).map((item, index) => {
                            const Icon = item.type === 'Email' ? MailSearch : item.type === 'SMS' ? MessagesSquare : Link;
                            const statusColor = item.status === 'Safe' ? 'var(--success)' : item.status === 'Suspicious' ? 'var(--warning)' : 'var(--danger)';

                            return (
                                <div key={item.id} className="timeline-item" style={{
                                    display: 'flex',
                                    gap: '24px',
                                    padding: '24px 0',
                                    position: 'relative',
                                    zIndex: 1,
                                    opacity: 1 - (index * 0.12), // Fade out older items
                                    transform: `scale(${1 - (index * 0.02)}) translateY(${index * -4}px)`
                                }}>
                                    {/* The Bubble */}
                                    <div style={{
                                        width: '44px',
                                        height: '44px',
                                        borderRadius: '16px',
                                        background: 'var(--surface)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: 'var(--shadow-float)',
                                        border: `2px solid ${statusColor}`,
                                        flexShrink: 0
                                    }}>
                                        <Icon size={20} color={statusColor} />
                                    </div>

                                    {/* The Content */}
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                            <div>
                                                <h4 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>{item.type} Scan Analyzed</h4>
                                                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                                                    {new Date(item.date_analyzed).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(item.date_analyzed).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div style={{
                                                background: `${statusColor}15`,
                                                color: statusColor,
                                                padding: '6px 16px',
                                                borderRadius: '20px',
                                                fontSize: '13px',
                                                fontWeight: '800',
                                                border: `1px solid ${statusColor}30`
                                            }}>
                                                {item.status.toUpperCase()}
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.3)', padding: '12px 20px', borderRadius: '20px' }}>
                                            <div style={{ flex: 1, height: '6px', background: 'rgba(0,0,0,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                                                <div style={{ width: `${item.risk_score}%`, height: '100%', background: statusColor, borderRadius: '3px' }} />
                                            </div>
                                            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', width: '40px' }}>{item.risk_score}%</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        <button
                            onClick={() => navigate('/history')}
                            style={{
                                marginTop: '24px',
                                padding: '16px',
                                background: 'none',
                                border: '2px dashed var(--border-color)',
                                borderRadius: '24px',
                                color: 'var(--text-secondary)',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                        >
                            View Full Intelligence Repository →
                        </button>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <Bot size={48} color="var(--border-color)" style={{ marginBottom: '16px' }} />
                        <p style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>No scans in your history yet. Start exploring above!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
