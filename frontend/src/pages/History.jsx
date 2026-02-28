import React, { useEffect, useState } from 'react';
import { getHistory } from '../api/api';
import { DownloadCloud, ExternalLink } from 'lucide-react';

export default function History() {
    const [history, setHistory] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        getHistory().then(setHistory).catch(console.error);
    }, []);

    return (
        <div>
            <h1 className="header-title">Scan History</h1>

            {selected ? (
                <div className="glass-container" style={{ padding: '32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--border-color)' }}>
                        <div>
                            <h2 style={{ fontSize: '24px', margin: '0 0 8px 0', color: selected.status === 'Safe' ? 'var(--success)' : selected.status === 'Suspicious' ? 'var(--warning)' : 'var(--danger)' }}>
                                {selected.status} ({selected.risk_score}%)
                            </h2>
                            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{selected.type} scanned on {new Date(selected.date_analyzed).toLocaleString()}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button className="btn btn-outline" onClick={() => window.print()} title="Export Report as PDF">
                                <DownloadCloud size={20} /> PDF
                            </button>
                            <button className="btn btn-outline" onClick={() => setSelected(null)}>
                                Back
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gap: '24px' }}>
                        <div>
                            <h3 style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Input Content</h3>
                            <div className="glass-card" style={{ padding: '16px', wordBreak: 'break-all', fontFamily: 'monospace', fontSize: '14px' }}>
                                {selected.content}
                            </div>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Analysis Details</h3>
                            <pre className="glass-card" style={{ padding: '16px', overflowX: 'auto', background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
                                {JSON.stringify(selected.report_details, null, 2)}
                            </pre>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="glass-container" style={{ padding: '10px' }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Risk Score</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map(item => (
                                <tr key={item.id}>
                                    <td>{item.type}</td>
                                    <td style={{ color: 'var(--text-secondary)' }}>{new Date(item.date_analyzed).toLocaleString()}</td>
                                    <td style={{ fontWeight: 600 }}>{item.risk_score}%</td>
                                    <td>
                                        <span className={`bg-${item.status.toLowerCase().replace(' ', '-')}`} style={{ padding: '6px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 600 }}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '13px' }} onClick={() => setSelected(item)}>
                                            View Report
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {history.length === 0 && (
                                <tr>
                                    <td colSpan="5" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>No analysis records found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
