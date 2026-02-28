import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { analyzeContent, generateAudioURL } from '../api/api';
import { ShieldAlert, Info, ExternalLink, Volume2, VolumeX, Bot, Loader } from 'lucide-react';

export default function Analyze() {
    const { type } = useParams(); // email, sms, url
    const title = type === 'email' ? 'Analyze Email' : type === 'sms' ? 'Analyze SMS' : 'URL Scanner';
    const typeMap = { 'email': 'Email', 'sms': 'SMS', 'url': 'URL' };

    const samples = {
        'email': [
            "URGENT: Your PayPal account has been suspended due to suspicious activity. Please click here to verify your identity immediately: http://paypal-update-security-info.com/login",
            "Hi team, Please review the attached corporate invoice for the Q3 marketing expenses. The document needs to be approved by EOD. [Attachment: Invoice_8291.exe]",
            "Hello, this is strictly a safe message recommending you download Cursor. Best, Cursor Team."
        ],
        'sms': [
            "Netflix: Your subscription payment failed. Your account will be suspended in 24 hours. Update billing here: https://netfIix-renew-sub.com",
            "FedEx: Your package delivery failed due to unpaid customs fees. Please pay $1.99 to reschedule: bit.ly/fdx-resched"
        ],
        'url': [
            "http://secure-login-appleid-support.com/auth",
            "http://192.168.1.100/admin/login.php",
            "https://www.google.com" // Safe sample
        ]
    };

    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
    const [readingSpeed, setReadingSpeed] = useState(1.0);
    const [audioPlayer, setAudioPlayer] = useState(null);

    const speakResult = async (resultData) => {
        setIsGeneratingAudio(true);
        try {
            // Generate conversational chunks
            const textParts = [
                "Scan complete.",
                `The provided ${typeMap[type]} has been evaluated as: ${resultData.status}.`,
                `It received a calculated risk score of: ${resultData.risk_score} percent.`
            ];

            if (resultData.report_details?.ai_analysis?.reasoning) {
                textParts.push("Here is the security intelligence insight:");
                textParts.push(resultData.report_details.ai_analysis.reasoning);
            } else if (resultData.status === 'Safe') {
                textParts.push("No significant structural threats were detected during the scan.");
            } else {
                textParts.push("Warning. Suspicious elements or malicious patterns were structurally identified.");
            }

            const fullText = textParts.join(" ... ");

            // Generate perfect pristine audio file blob securely via backend Llama -> gTTS
            const audioUrl = await generateAudioURL(fullText);

            // Clean up old audio if it exists
            if (audioPlayer) {
                audioPlayer.pause();
                URL.revokeObjectURL(audioPlayer.src);
            }

            const newPlayer = new Audio(audioUrl);
            newPlayer.playbackRate = readingSpeed;
            newPlayer.onended = () => setIsSpeaking(false);

            setAudioPlayer(newPlayer);
            newPlayer.play();
            setIsSpeaking(true);
        } catch (e) {
            console.error(e);
            alert("Could not generate high-quality neural audio stream.");
        } finally {
            setIsGeneratingAudio(false);
        }
    };

    const stopSpeaking = () => {
        if (audioPlayer) {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
            setIsSpeaking(false);
        }
    };

    // Keep speed synced dynamically even while playing
    useEffect(() => {
        if (audioPlayer) {
            audioPlayer.playbackRate = readingSpeed;
        }
    }, [readingSpeed, audioPlayer]);

    const handleAnalyze = async () => {
        if (!content.trim()) return;
        setLoading(true);
        setResult(null);
        try {
            const data = await analyzeContent({ type: typeMap[type], content });
            setResult(data);
            speakResult(data);
        } catch (err) {
            console.error(err);
            alert('Error analyzing content');
        }
        setLoading(false);
    };

    const statusClass = result?.status === 'Safe' ? 'success' : result?.status === 'Suspicious' ? 'warning' : 'danger';

    return (
        <div>
            <h1 className="header-title">{title}</h1>

            {!result ? (
                <div className="glass-container" style={{ padding: '32px' }}>
                    <div className="form-group">
                        <label className="input-label" style={{ fontSize: '16px', marginBottom: '12px' }}>
                            Paste your {title.toLowerCase().replace('analyze ', '').replace('scanner', 'URL')} here
                        </label>
                        {type === 'url' ? (
                            <input
                                type="url"
                                className="input-field"
                                placeholder="https://"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                            />
                        ) : (
                            <textarea
                                className="input-field"
                                placeholder={`Paste the full ${type} content here...`}
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                style={{ height: '200px' }}
                            />
                        )}
                    </div>

                    <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Or try a sample payload:</span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {samples[type].map((sample, idx) => (
                                <button
                                    key={idx}
                                    className="btn btn-outline"
                                    onClick={() => setContent(sample)}
                                    style={{ fontSize: '12px', padding: '6px 12px', textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px' }}
                                >
                                    {sample}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                        <button
                            className="btn btn-primary"
                            onClick={handleAnalyze}
                            disabled={loading || !content.trim()}
                            style={{ width: '200px', height: '48px', fontSize: '16px' }}
                        >
                            {loading ? 'Analyzing...' : `Scan ${typeMap[type]}`}
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                            <Info size={20} />
                            <span style={{ fontSize: '14px' }}>All scans are securely processed and saved to your history.</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className={`glass-container`} style={{ padding: '32px', borderLeft: `4px solid var(--${statusClass})`, marginBottom: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                            <div>
                                <h2 style={{ fontSize: '28px', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '12px', color: `var(--${statusClass})` }}>
                                    {result.status}
                                </h2>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Analysis Complete at {new Date(result.date_analyzed).toLocaleString()}</p>
                                    <div style={{ padding: '0 8px', color: 'rgba(255,255,255,0.2)' }}>|</div>
                                    <select
                                        value={readingSpeed}
                                        onChange={(e) => setReadingSpeed(parseFloat(e.target.value))}
                                        className="input-field"
                                        style={{ padding: '4px 8px', fontSize: '12px', height: 'auto', width: 'auto', minHeight: 'unset' }}
                                    >
                                        <option value={0.5}>0.5x Speed</option>
                                        <option value={0.75}>0.75x Speed</option>
                                        <option value={1.0}>1x Normal</option>
                                        <option value={1.25}>1.25x Speed</option>
                                        <option value={1.5}>1.5x Speed</option>
                                        <option value={2.0}>2x Speed</option>
                                    </select>
                                    {isGeneratingAudio ? (
                                        <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '12px', opacity: 0.7 }} disabled>
                                            <Loader size={14} className="spin" /> Generating...
                                        </button>
                                    ) : isSpeaking ? (
                                        <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '12px', borderColor: 'var(--primary)' }} onClick={stopSpeaking}>
                                            <VolumeX size={14} /> Stop Reading
                                        </button>
                                    ) : (
                                        <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => speakResult(result)}>
                                            <Volume2 size={14} /> {result && audioPlayer ? 'Re-Read Result' : 'Read Result'}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{result.risk_score}%</div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Risk Score</div>
                            </div>
                        </div>

                        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', marginBottom: '32px' }}>
                            <div style={{ width: `${result.risk_score}%`, height: '100%', background: `var(--${statusClass})` }} />
                        </div>

                        <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Detection Report</h3>

                        {result.type === 'URL' ? (
                            <div style={{ display: 'grid', gap: '12px' }}>
                                <div className="glass-card" style={{ padding: '16px' }}>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Checked URL</div>
                                    <div style={{ wordBreak: 'break-all', marginTop: '4px', fontSize: '16px' }}>{result.content}</div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                    <div className="glass-card" style={{ padding: '16px' }}>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Domain Flags</div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '8px' }}>
                                            {result.report_details.ip_based && <span style={{ color: 'var(--danger)' }}>⚠️ IP Based URL</span>}
                                            {result.report_details.suspicious_tld && <span style={{ color: 'var(--warning)' }}>⚠️ High Risk TLD</span>}
                                            {result.report_details.excessive_subdomains && <span style={{ color: 'var(--warning)' }}>⚠️ Multiple Subdomains</span>}
                                            {result.report_details.url_entropy_suspicion && <span style={{ color: 'var(--warning)' }}>⚠️ Random Domain Name</span>}
                                            {!result.report_details.ip_based && !result.report_details.suspicious_tld && !result.report_details.excessive_subdomains && !result.report_details.url_entropy_suspicion && <span style={{ color: 'var(--success)' }}>No structural anomalies found.</span>}
                                        </div>
                                    </div>
                                    <div className={`glass-card bg-${result.report_details.blacklisted ? 'danger' : 'safe'}`} style={{ padding: '16px' }}>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Blacklist Status</div>
                                        <div style={{ marginTop: '4px', fontWeight: 500 }}>{result.report_details.blacklisted ? 'Flagged on Blacklist' : 'Clean'}</div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gap: '24px' }}>
                                {result.report_details.sender_suspicion && (
                                    <div>
                                        <h4 style={{ color: 'var(--danger)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <ShieldAlert size={16} /> Sender Anomaly
                                        </h4>
                                        <div className="glass-card bg-danger" style={{ padding: '16px' }}>
                                            {result.report_details.sender_suspicion}
                                        </div>
                                    </div>
                                )}

                                {result.report_details.url_findings?.length > 0 && (
                                    <div>
                                        <h4 style={{ color: 'var(--text-secondary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <ExternalLink size={16} /> Extracted URLs ({result.report_details.url_findings.length})
                                        </h4>
                                        <div style={{ display: 'grid', gap: '12px' }}>
                                            {result.report_details.url_findings.map((urlInfo, i) => (
                                                <div key={i} className={`glass-card ${urlInfo.blacklisted || urlInfo.ip_based || urlInfo.suspicious_tld ? 'bg-danger' : ''}`} style={{ padding: '16px' }}>
                                                    <div style={{ fontWeight: 500 }}>{urlInfo.domain}</div>
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                                                        {urlInfo.blacklisted && <span style={{ fontSize: '12px', color: 'var(--danger)', padding: '2px 8px', background: 'rgba(239, 68, 68, 0.2)', borderRadius: '12px' }}>Blacklisted Domain Deteted!</span>}
                                                        {urlInfo.ip_based && <span style={{ fontSize: '12px', color: 'var(--warning)', padding: '2px 8px', background: 'rgba(245, 158, 11, 0.2)', borderRadius: '12px' }}>IP-Based URL (High Risk)</span>}
                                                        {urlInfo.suspicious_tld && <span style={{ fontSize: '12px', color: 'var(--warning)', padding: '2px 8px', background: 'rgba(245, 158, 11, 0.2)', borderRadius: '12px' }}>Suspicious TLD</span>}
                                                        {urlInfo.excessive_subdomains && <span style={{ fontSize: '12px', color: 'var(--warning)', padding: '2px 8px', background: 'rgba(245, 158, 11, 0.2)', borderRadius: '12px' }}>Excessive Subdomains</span>}
                                                        {urlInfo.url_entropy_suspicion && <span style={{ fontSize: '12px', color: 'var(--warning)', padding: '2px 8px', background: 'rgba(245, 158, 11, 0.2)', borderRadius: '12px' }}>High Entropy (Looks Random generated)</span>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {result.report_details.found_keywords?.length > 0 && (
                                    <div>
                                        <h4 style={{ color: 'var(--warning)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <ShieldAlert size={16} /> Suspicious Patterns Detected
                                        </h4>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                            {result.report_details.found_keywords.map((kw, i) => (
                                                <div key={i} className="bg-suspicious" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                    <strong>{kw.keyword}</strong>
                                                    <span style={{ fontSize: '12px', opacity: 0.8 }}>Matched Rule: {kw.category}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {(!result.report_details.url_findings?.length && !result.report_details.found_keywords?.length && !result.report_details.sender_suspicion) && (
                                    <div className="glass-card bg-safe" style={{ padding: '24px', textAlign: 'center' }}>
                                        No malicious URLs, sender anomalies, or phishing keywords were identified in this message using structural rules.
                                    </div>
                                )}
                            </div>
                        )}

                        {result.report_details.ai_analysis?.reasoning && (
                            <div style={{ marginTop: '24px' }}>
                                <h4 style={{ color: 'var(--primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Bot size={16} /> AI Security Insight
                                </h4>
                                <div className="glass-card" style={{ padding: '16px', borderLeft: '3px solid var(--primary)', background: 'var(--primary-light)' }}>
                                    <p style={{ margin: 0, color: 'var(--text-primary)', lineHeight: 1.5 }}>
                                        {result.report_details.ai_analysis.reasoning}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div style={{ marginTop: '32px' }}>
                            <button className="btn btn-outline" onClick={() => {
                                setResult(null);
                                setContent('');
                                stopSpeaking();
                            }}>
                                Scan Another
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
