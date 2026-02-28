import React, { useEffect, useState } from 'react';
import { ShieldCheck, MailSearch, Link, MessagesSquare, Activity, AlertTriangle, Bot, Layers, Sparkles } from 'lucide-react';
import { getHistory } from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getHistory().then(setHistory).catch(console.error);
    }, []);

    const stats = {
        total: history.length,
        safe: history.filter(h => h.status === 'Safe').length,
        threats: history.filter(h => h.status !== 'Safe').length
    };

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
                <div>
                    <h1 className="header-title" style={{ margin: 0 }}>OmniShield Dashboard</h1>
                    <p style={{ color: 'var(--text-dim)', fontSize: '18px', marginTop: '8px', fontWeight: 500 }}>System Status: <span style={{ color: 'var(--success)', fontWeight: 800 }}>OPTIMIZED</span></p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div className="glass-card" style={{ padding: '12px 24px', borderRadius: '20px', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Sparkles size={16} color="var(--primary)" /> V2.4 AI Engine
                    </div>
                </div>
            </div>

            <div className="dashboard-grid">
                {/* 8-Column Main Feed */}
                <div className="bento-main glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '24px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Layers size={24} color="var(--primary)" /> Scan Activity
                        </h3>
                        <Activity size={20} color="var(--text-dim)" />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {history.length > 0 ? (
                            history.slice(0, 5).map((item, index) => {
                                const Icon = item.type === 'Email' ? MailSearch : item.type === 'SMS' ? MessagesSquare : Link;
                                const statusColor = item.status === 'Safe' ? 'var(--success)' : 'var(--danger)';
                                return (
                                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '24px', background: 'white', border: '1px solid rgba(0,0,0,0.03)', borderRadius: '28px', transition: 'all 0.3s' }} className="hover-lift">
                                        <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: `${statusColor}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Icon size={22} color={statusColor} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 800, fontSize: '16px' }}>{item.type} Scan <span style={{ color: 'var(--text-dim)', fontWeight: 400, fontSize: '13px' }}>• ID: {item.id.toString().slice(-4)}</span></div>
                                            <div style={{ fontSize: '13px', color: 'var(--text-dim)', marginTop: '4px' }}>{new Date(item.date_analyzed).toLocaleString()}</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '18px', fontWeight: '800', color: statusColor }}>{item.risk_score}%</div>
                                            <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-dim)' }}>Risk Score</div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div style={{ textAlign: 'center', padding: '80px', background: 'white', borderRadius: '32px' }}>
                                <Bot size={48} color="var(--text-dim)" />
                                <p style={{ marginTop: '16px', color: 'var(--text-dim)', fontWeight: 600 }}>Waiting for your first scan...</p>
                            </div>
                        )}
                    </div>

                    <button className="btn" style={{ background: 'var(--bg-app)', color: 'var(--text-main)', border: '1px solid rgba(0,0,0,0.05)' }} onClick={() => navigate('/history')}>
                        View Full History →
                    </button>
                </div>

                {/* 4-Column Sidebar Stats */}
                <div className="bento-stats">
                    <div className="glass-card" style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'linear-gradient(135deg, white, #eef2ff)' }}>
                        <div style={{ width: '50px', height: '50px', borderRadius: '15px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.03)' }}>
                            <Activity size={24} color="var(--primary)" />
                        </div>
                        <div>
                            <div style={{ fontSize: '42px', fontWeight: '800', letterSpacing: '-0.03em' }}>{stats.total}</div>
                            <div style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Total Scans</div>
                        </div>
                    </div>

                    <div className="glass-card" style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'linear-gradient(135deg, white, #f0fdf4)' }}>
                        <div style={{ width: '50px', height: '50px', borderRadius: '15px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.03)' }}>
                            <ShieldCheck size={24} color="var(--success)" />
                        </div>
                        <div>
                            <div style={{ fontSize: '42px', fontWeight: '800', letterSpacing: '-0.03em' }}>{stats.safe}</div>
                            <div style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Safe Results</div>
                        </div>
                    </div>

                    <div className="glass-card" style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'linear-gradient(135deg, #fff1f2, white)' }}>
                        <div style={{ width: '50px', height: '50px', borderRadius: '15px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.03)' }}>
                            <AlertTriangle size={24} color="var(--danger)" />
                        </div>
                        <div>
                            <div style={{ fontSize: '42px', fontWeight: '800', letterSpacing: '-0.03em' }}>{stats.threats}</div>
                            <div style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Threats Detected</div>
                        </div>
                    </div>
                </div>

                {/* Bottom Row modules */}
                <div className="glass-card" style={{ gridColumn: 'span 12', display: 'flex', gap: '32px', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 800 }}>Start New Analysis</h3>
                        <p style={{ color: 'var(--text-dim)', marginTop: '4px' }}>Select a type below to start scanning.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <button onClick={() => navigate('/analyze/email')} className="btn" style={{ background: 'var(--primary)', color: 'white' }}>Scan Email</button>
                        <button onClick={() => navigate('/analyze/sms')} className="btn" style={{ background: 'var(--secondary)', color: 'white' }}>Scan SMS</button>
                        <button onClick={() => navigate('/analyze/url')} className="btn" style={{ background: 'var(--accent)', color: 'white' }}>Scan URL</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
