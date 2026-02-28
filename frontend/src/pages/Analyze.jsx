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
    const [ttsLanguage, setTtsLanguage] = useState('en');
    const [audioPlayer, setAudioPlayer] = useState(null);

    const translations = {
        en: {
            scanComplete: "Scan complete.",
            evaluatedAs: (type, status) => `The provided ${type} has been evaluated as: ${status}.`,
            riskScore: (score) => `It received a calculated risk score of: ${score} percent.`,
            insight: "Here is the security analysis insight:",
            noThreats: "No significant structural threats were detected during the scan.",
            warning: "Warning. Suspicious elements or malicious patterns were structurally identified.",
            statusMap: { 'Safe': 'Safe', 'Suspicious': 'Suspicious', 'Phishing': 'Phishing', 'Malicious': 'Malicious' },
            typeMap: { 'Email': 'Email', 'SMS': 'SMS', 'URL': 'URL' }
        },
        ta: {
            scanComplete: "ஸ்கேன் முடிந்தது.",
            evaluatedAs: (type, status) => `வழங்கப்பட்ட ${type} ${status} என மதிப்பிடப்பட்டுள்ளது.`,
            riskScore: (score) => `இதன் அபாய மதிப்பீடு: ${score} சதவீதம்.`,
            insight: "பாதுகாப்பு நுண்ணறிவு விவரம் இதோ:",
            noThreats: "இந்த ஸ்கேனில் குறிப்பிடத்தக்க பாதுகாப்பு அச்சுறுத்தல்கள் எதுவும் கண்டறியப்படவில்லை.",
            warning: "எச்சரிக்கை. சந்தேகத்திற்கிடமான கூறுகள் அல்லது தீங்கிழைக்கும் வடிவங்கள் கண்டறியப்பட்டுள்ளன.",
            statusMap: { 'Safe': 'பாதுகாப்பானது', 'Suspicious': 'சந்தேகத்திற்குரியது', 'Phishing': 'மோசடியானது', 'Malicious': 'ஆபத்தானது' },
            typeMap: { 'Email': 'மின்னஞ்சல்', 'SMS': 'குறுஞ்செய்தி', 'URL': 'இணையதளம்' }
        }
    };

    const speakResult = async (resultData) => {
        setIsGeneratingAudio(true);
        try {
            const lang = ttsLanguage;
            const t = translations[lang];

            // Build text parts based on language
            const textParts = [
                t.scanComplete,
                t.evaluatedAs(t.typeMap[typeMap[type]], t.statusMap[resultData.status] || resultData.status),
                t.riskScore(resultData.risk_score)
            ];

            if (resultData.report_details?.ai_analysis?.reasoning) {
                textParts.push(t.insight);
                textParts.push(resultData.report_details.ai_analysis.reasoning);
            } else if (resultData.status === 'Safe') {
                textParts.push(t.noThreats);
            } else {
                textParts.push(t.warning);
            }

            const fullText = textParts.join(" ... ");

            // Generate audio via backend with language parameter
            const audioUrl = await generateAudioURL(fullText, lang);

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
            alert("Could not generate audio report.");
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
            const data = await analyzeContent({ type: typeMap[type], content, lang: ttsLanguage });
            setResult(data);
            speakResult(data);
        } catch (err) {
            console.error(err);
            alert('Error analyzing content');
        }
        setLoading(false);
    };

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

    const statusClass = result?.status === 'Safe' ? 'success' : result?.status === 'Suspicious' ? 'warning' : 'danger';

    return (
        <div>
            <h1 className="header-title">{title}</h1>

            {!result ? (
                <div className="glass-card" style={{ padding: '48px' }}>
                    <div className="form-group">
                        <label className="input-label" style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px', display: 'block' }}>
                            {title.replace('Analyze ', '').replace('Scanner', 'URL')} Content
                        </label>
                        {type === 'url' ? (
                            <input
                                type="url"
                                className="input-field"
                                placeholder="https://secure-node.ai/verify"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                            />
                        ) : (
                            <textarea
                                className="input-field"
                                placeholder={`Paste the ${type} content here...`}
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                style={{ height: '240px', lineHeight: 1.6 }}
                            />
                        )}
                    </div>

                    <div style={{ marginTop: '48px' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Bot size={24} color="var(--primary)" />
                            Example Scans
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                            {samples[type].map((sample, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setContent(sample)}
                                    className="glass-card"
                                    style={{
                                        padding: '24px',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        border: content === sample ? '2px solid var(--primary)' : '1px solid rgba(0,0,0,0.05)',
                                        background: content === sample ? '#f5f3ff' : 'white',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '16px',
                                        boxShadow: content === sample ? '0 10px 20px rgba(99,102,241,0.1)' : '0 4px 6px rgba(0,0,0,0.02)'
                                    }}
                                >
                                    <div style={{
                                        fontSize: '10px',
                                        fontWeight: '900',
                                        textTransform: 'uppercase',
                                        color: idx === 2 && type !== 'sms' ? 'var(--success)' : 'var(--danger)',
                                        letterSpacing: '0.1em'
                                    }}>
                                        {idx === 2 && type !== 'sms' ? '🛡️ Safe Example' : '⚠️ Potential Threat'}
                                    </div>
                                    <div style={{
                                        fontSize: '14px',
                                        color: 'var(--text-dim)',
                                        display: '-webkit-box',
                                        WebkitLineClamp: '3',
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        lineHeight: '1.6',
                                    }}>
                                        "{sample}"
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '24px', marginTop: '56px', alignItems: 'center' }}>
                        <button
                            className="btn"
                            onClick={handleAnalyze}
                            disabled={loading || !content.trim()}
                            style={{ minWidth: '240px', height: '64px', fontSize: '18px', background: 'var(--primary)' }}
                        >
                            {loading ? <Loader size={20} className="spin" /> : <>Start Analysis</>}
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-dim)', fontSize: '14px', fontWeight: 600 }}>
                            <Info size={18} />
                            AI V2 Core Active
                        </div>
                    </div>
                </div>
            ) : (
                <div className="fade-in">
                    <div className="glass-card" style={{ borderLeft: `8px solid var(--${statusClass})`, padding: '48px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                            <div>
                                <h2 style={{ fontSize: '42px', fontWeight: 900, margin: 0, color: `var(--${statusClass})`, letterSpacing: '-0.03em' }}>
                                    {result.status}
                                </h2>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px' }}>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <select
                                            value={readingSpeed}
                                            onChange={(e) => setReadingSpeed(parseFloat(e.target.value))}
                                            className="input-field"
                                            style={{ padding: '8px 12px', fontSize: '13px', height: '36px', width: 'auto', borderRadius: '12px' }}
                                        >
                                            <option value={0.5}>0.5x Speed</option>
                                            <option value={1.0}>1x Normal</option>
                                            <option value={1.5}>1.5x Speed</option>
                                            <option value={2.0}>2x Speed</option>
                                        </select>
                                        <select
                                            value={ttsLanguage}
                                            onChange={(e) => setTtsLanguage(e.target.value)}
                                            className="input-field"
                                            style={{ padding: '8px 12px', fontSize: '13px', height: '36px', width: 'auto', borderRadius: '12px', border: '1px solid var(--primary-glow)' }}
                                        >
                                            <option value="en">English</option>
                                            <option value="ta">Tamil</option>
                                        </select>
                                    </div>
                                    {isGeneratingAudio ? (
                                        <div style={{ fontSize: '13px', color: 'var(--text-dim)', fontWeight: 700 }}><Loader size={14} className="spin" /> Generating Audio...</div>
                                    ) : isSpeaking ? (
                                        <button className="btn" style={{ padding: '8px 16px', height: '36px', fontSize: '12px', background: 'var(--danger)', borderRadius: '12px' }} onClick={stopSpeaking}>
                                            <VolumeX size={14} /> Stop
                                        </button>
                                    ) : (
                                        <button className="btn" style={{ padding: '8px 16px', height: '36px', fontSize: '12px', background: 'var(--primary)', borderRadius: '12px' }} onClick={() => speakResult(result)}>
                                            <Volume2 size={14} /> Listen to Report
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '56px', fontWeight: '900', color: 'var(--text-main)', lineHeight: 1 }}>{result.risk_score}%</div>
                                <div style={{ color: 'var(--text-dim)', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>Risk Score</div>
                            </div>
                        </div>

                        <div style={{ width: '100%', height: '16px', background: '#f1f5f9', borderRadius: '8px', overflow: 'hidden', marginBottom: '48px' }}>
                            <div style={{ width: `${result.risk_score}%`, height: '100%', background: `var(--${statusClass})`, borderRadius: '8px', transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)' }} />
                        </div>

                        <div className="dashboard-grid">
                            <div style={{ gridColumn: 'span 12' }}>
                                <div className="glass-card" style={{ background: '#f8fafc', padding: '32px', border: '1px solid rgba(0,0,0,0.03)' }}>
                                    <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Bot size={20} color="var(--primary)" /> AI Analysis Details
                                    </h4>
                                    <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--text-main)' }}>
                                        {result.report_details.ai_analysis?.reasoning || "System analyzed the provided content. No suspicious patterns were detected."}
                                    </p>
                                </div>
                            </div>

                            <div style={{ gridColumn: 'span 12', marginTop: '32px' }}>
                                <div className="glass-card" style={{ background: 'white', padding: '32px', border: '1px solid rgba(0,0,0,0.03)' }}>
                                    <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <ShieldAlert size={20} color="var(--danger)" /> Analysis Findings
                                    </h4>
                                    <div className="diff-viewer">
                                        {renderDiff(result.content, result.report_details.found_keywords)}
                                    </div>
                                </div>
                            </div>

                            {result.report_details.url_findings?.length > 0 && (
                                <div style={{ gridColumn: 'span 12', marginTop: '24px' }}>
                                    <h4 style={{ marginBottom: '16px', fontWeight: 800, color: 'var(--text-dim)' }}>Detected Risks ({result.report_details.url_findings.length})</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                                        {result.report_details.url_findings.map((url, i) => (
                                            <div key={i} className="glass-card" style={{ padding: '24px', background: 'white' }}>
                                                <div style={{ fontWeight: 800, color: 'var(--text-main)' }}>{url.domain}</div>
                                                <div style={{ fontSize: '12px', color: 'var(--danger)', marginTop: '8px', fontWeight: 700 }}>{url.blacklisted ? '⚠️ BLACKLISTED' : ''}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button className="btn" style={{ marginTop: '48px', background: 'var(--bg-app)', color: 'var(--text-main)' }} onClick={() => {
                            setResult(null);
                            setContent('');
                            stopSpeaking();
                        }}>
                            Clear & New Scan
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
