import React, { useEffect, useState } from 'react';
import { getHistory } from '../api/api';
import { DownloadCloud, ArrowLeft, ShieldCheck, MailSearch, MessagesSquare, Link as LinkIcon, AlertTriangle, FileText, Calendar, Activity } from 'lucide-react';

export default function History() {
    const [history, setHistory] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        getHistory().then(setHistory).catch(console.error);
    }, []);

    const renderDiff = (text, foundKeywords = []) => {
        if (!foundKeywords || !foundKeywords.length) return text;

        const sortedKeywords = [...foundKeywords].sort((a, b) => b.keyword.length - a.keyword.length);
        let parts = [text];

        sortedKeywords.forEach(kw => {
            const keyword = kw.keyword;
            const newParts = [];

            parts.forEach(part => {
                if (typeof part !== 'string') {
                    newParts.push(part);
                    return;
                }

                const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
                const split = part.split(regex);

                split.forEach((s) => {
                    if (s.toLowerCase() === keyword.toLowerCase()) {
                        newParts.push(<span key={Math.random()} className="keyword-highlight" data-category={kw.category}>{s}</span>);
                    } else if (s) {
                        newParts.push(s);
                    }
                });
            });
            parts = newParts;
        });

        return parts;
    };

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
                <h1 className="header-title" style={{ margin: 0 }}>System History</h1>
                {selected && (
                    <button className="btn" style={{ background: 'var(--bg-surface)', color: 'var(--text-main)', border: '1px solid var(--glass-border)' }} onClick={() => setSelected(null)}>
                        <ArrowLeft size={18} /> Exit Report
                    </button>
                )}
            </div>

            {selected ? (
                <div className="glass-card" style={{ padding: '48px', borderLeft: `8px solid var(--${selected.status === 'Safe' ? 'success' : 'danger'})` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                <span className={`status-tag bg-${selected.status.toLowerCase().replace(' ', '-')}`}>
                                    {selected.status} Status
                                </span>
                                <span style={{ color: 'var(--text-dim)', fontSize: '13px', fontWeight: 600 }}>ID: {selected.id}</span>
                            </div>
                            <h2 style={{ fontSize: '36px', fontWeight: 900, letterSpacing: '-0.02em', margin: 0 }}>
                                {selected.type} Vector Report
                            </h2>
                            <p style={{ color: 'var(--text-dim)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Calendar size={14} /> {new Date(selected.date_analyzed).toLocaleString()}
                            </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '48px', fontWeight: 900 }}>{selected.risk_score}%</div>
                            <div style={{ color: 'var(--text-dim)', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase' }}>Threat Intensity</div>
                        </div>
                    </div>

                    <div className="dashboard-grid">
                        {/* THE DIFF REPRESENTATION SLOT */}
                        <div style={{ gridColumn: 'span 12' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <FileText size={20} color="var(--primary)" /> Source Highlight (Diff)
                            </h3>
                            <div className="glass-card diff-viewer" style={{ background: 'white', padding: '32px', border: '1px solid rgba(0,0,0,0.03)' }}>
                                {renderDiff(selected.content, selected.report_details.found_keywords)}
                            </div>
                        </div>

                        <div style={{ gridColumn: 'span 12', marginTop: '32px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Activity size={20} color="var(--secondary)" /> Analysis Telemetry
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                                <div className="glass-card" style={{ background: '#f8fafc', padding: '24px' }}>
                                    <h4 style={{ fontSize: '12px', fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '12px' }}>AI Reasoning</h4>
                                    <p style={{ fontSize: '14px', lineHeight: 1.6 }}>{selected.report_details.ai_analysis?.reasoning || "No AI feedback available for this entry."}</p>
                                </div>
                                <div className="glass-card" style={{ background: '#f8fafc', padding: '24px' }}>
                                    <h4 style={{ fontSize: '12px', fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '12px' }}>Flags Triggered</h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {selected.report_details.found_keywords?.map((k, i) => (
                                            <span key={i} style={{ padding: '4px 10px', background: 'white', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '8px', fontSize: '12px', fontWeight: 700 }}>
                                                {k.keyword}
                                            </span>
                                        )) || <span style={{ fontSize: '13px', color: 'var(--text-dim)' }}>None</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '48px', display: 'flex', gap: '16px' }}>
                        <button className="btn" style={{ background: 'var(--primary)' }} onClick={() => window.print()}>
                            <DownloadCloud size={20} /> Export Signal Report
                        </button>
                    </div>
                </div>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table className="fade-in">
                        <thead>
                            <tr>
                                <th>Vector Type</th>
                                <th>Timestamp</th>
                                <th>Risk Score</th>
                                <th>Security Status</th>
                                <th style={{ textAlign: 'right' }}>Telemetry</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map(item => {
                                const Icon = item.type === 'Email' ? MailSearch : item.type === 'SMS' ? MessagesSquare : LinkIcon;
                                const statusClass = item.status.toLowerCase().replace(' ', '-');
                                return (
                                    <tr key={item.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(item)}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 800 }}>
                                                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--bg-app)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                                                    <Icon size={18} />
                                                </div>
                                                {item.type}
                                            </div>
                                        </td>
                                        <td style={{ fontSize: '13px', fontWeight: 600 }}>{new Date(item.date_analyzed).toLocaleDateString()} at {new Date(item.date_analyzed).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                        <td style={{ fontSize: '18px', fontWeight: 900 }}>{item.risk_score}%</td>
                                        <td>
                                            <span className={`status-tag bg-${statusClass}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <button className="btn" style={{ padding: '10px 20px', fontSize: '12px', height: 'auto', borderRadius: '12px', background: 'var(--bg-app)', color: 'var(--text-main)' }}>
                                                Inspect Report
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            {history.length === 0 && (
                                <tr>
                                    <td colSpan="5" style={{ padding: '80px', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: 'var(--text-dim)' }}>
                                            <ShieldCheck size={48} opacity={0.2} />
                                            <span style={{ fontWeight: 600 }}>Zero activity logs found in decentralized repository.</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
