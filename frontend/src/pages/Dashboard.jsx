import React, { useEffect, useState } from 'react';
import { ShieldCheck, MailSearch, Link, MessagesSquare, Activity, AlertTriangle, Bot } from 'lucide-react';
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

    const stats = {
        total: history.length,
        safe: safeCount,
        highRisk: threatCount
    };

    return (
        <div className="fade-in">
            <h1 className="header-title">Nexus Control Center</h1>

            <div className="dashboard-grid">
                {/* Main Bento Slot: Intelligence Feed */}
                <div className="glass-card bento-main" style={{ display: 'flex', flexDirection: 'column', gap: '32px', minHeight: '600px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '12px', margin: 0 }}>
                            <Activity size={24} color="var(--primary)" /> Live Intelligence
                        </h2>
                        <div style={{ padding: '4px 12px', background: 'rgba(249,115,22,0.1)', borderRadius: '12px', color: 'var(--primary)', fontSize: '12px', fontWeight: '800' }}>ENC-V3 SECURE</div>
                    </div>

                    <div style={{ position: 'relative', flex: 1 }}>
                        <div style={{ position: 'absolute', left: '20px', top: '10px', bottom: '10px', width: '2px', background: 'linear-gradient(to bottom, var(--primary), var(--secondary), transparent)', borderRadius: '1px', opacity: 0.15 }}></div>

                        {history.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {history.slice(0, 6).map((item, index) => {
                                    const Icon = item.type === 'Email' ? MailSearch : item.type === 'SMS' ? MessagesSquare : Link;
                                    const statusColor = item.status === 'Safe' ? 'var(--success)' : item.status === 'Suspicious' ? 'var(--warning)' : 'var(--danger)';
                                    return (
                                        <div key={item.id} style={{ display: 'flex', gap: '20px', padding: '16px 0', opacity: 1 - (index * 0.15), transform: `scale(${1 - (index * 0.02)})` }}>
                                            <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${statusColor}30`, flexShrink: 0, boxShadow: `0 0 15px ${statusColor}10` }}>
                                                <Icon size={20} color={statusColor} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                                    <span style={{ fontWeight: '700', fontSize: '16px', color: 'var(--text-main)' }}>{item.type} Node</span>
                                                    <span style={{ fontSize: '12px', color: 'var(--text-dim)', fontStyle: 'italic' }}>{new Date(item.date_analyzed).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                                                        <div style={{ width: `${item.risk_score}%`, height: '100%', background: statusColor, boxShadow: `0 0 10px ${statusColor}40` }} />
                                                    </div>
                                                    <span style={{ fontSize: '12px', fontWeight: '800', color: statusColor, width: '35px' }}>{item.risk_score}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-dim)' }}>Awaiting telemetry link...</div>
                        )}
                    </div>

                    <button className="btn" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', boxShadow: 'none', border: '1px solid var(--glass-border)', color: 'var(--text-dim)' }} onClick={() => navigate('/history')}>
                        FULL REPOSITORY ACCESS
                    </button>
                </div>

                {/* Stat Bento Slots */}
                <div className="glass-card bento-stat" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: 'rgba(249,115,22,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', boxShadow: '0 0 20px rgba(249,115,22,0.1)' }}>
                        <Activity size={28} />
                    </div>
                    <div>
                        <div style={{ color: 'var(--text-dim)', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>TELEMETRY</div>
                        <div style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-0.02em' }}>{stats.total}</div>
                    </div>
                </div>

                <div className="glass-card bento-stat" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)', boxShadow: '0 0 20px rgba(16,185,129,0.1)' }}>
                        <ShieldCheck size={28} />
                    </div>
                    <div>
                        <div style={{ color: 'var(--text-dim)', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>SECURED</div>
                        <div style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-0.02em' }}>{stats.safe}</div>
                    </div>
                </div>

                {/* Large Action Bento */}
                <div className="glass-card" style={{ gridColumn: '2 / 4', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800' }}>Active Analysis Modules</h3>
                        <Activity size={16} color="var(--primary)" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                        <button onClick={() => navigate('/analyze/email')} className="btn" style={{ flexDirection: 'column', padding: '24px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', boxShadow: 'none' }}>
                            <MailSearch size={28} color="var(--primary)" />
                            <span style={{ fontSize: '13px', marginTop: '8px' }}>EMAIL</span>
                        </button>
                        <button onClick={() => navigate('/analyze/sms')} className="btn" style={{ flexDirection: 'column', padding: '24px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', boxShadow: 'none' }}>
                            <MessagesSquare size={28} color="var(--secondary)" />
                            <span style={{ fontSize: '13px', marginTop: '8px' }}>SMS</span>
                        </button>
                        <button onClick={() => navigate('/analyze/url')} className="btn" style={{ flexDirection: 'column', padding: '24px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', boxShadow: 'none' }}>
                            <Link size={28} color="var(--accent)" />
                            <span style={{ fontSize: '13px', marginTop: '8px' }}>URL</span>
                        </button>
                    </div>
                </div>

                {/* Threat Banner Bento */}
                <div className="glass-card" style={{ gridColumn: '2 / 4', background: 'linear-gradient(135deg, rgba(239,68,68,0.1), transparent)', borderColor: 'rgba(239,68,68,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <AlertTriangle size={32} color="var(--danger)" />
                        <div>
                            <div style={{ fontSize: '20px', fontWeight: '800' }}>{stats.highRisk} Threats Isolated</div>
                            <div style={{ color: 'var(--text-dim)', fontSize: '14px' }}>Critical anomalies detected and neutralized in real-time.</div>
                        </div>
                    </div>
                    <div style={{ padding: '8px 16px', borderRadius: '12px', border: '1px solid var(--danger)', color: 'var(--danger)', fontWeight: '800', fontSize: '12px' }}>SYSTEM SHIELD ACTIVE</div>
                </div>
            </div>
        </div>
    );
}
