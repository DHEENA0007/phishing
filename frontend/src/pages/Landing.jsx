import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ShieldCheck,
    Bot,
    Globe,
    ArrowRight,
    ShieldAlert,
    Layout,
    Sparkles,
    MousePointer2,
    Search,
    Cpu,
    Lock,
    Eye,
    Zap,
    History as HistoryIcon,
    Terminal,
    Fingerprint,
    Microscope,
    UserCircle2,
    CheckCircle
} from 'lucide-react';

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="fade-in" style={{ backgroundColor: 'white', position: 'relative', zIndex: 1 }}>
            {/* STICKY HEADER */}
            <header style={{
                padding: '16px 60px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                backgroundColor: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(30px)',
                zIndex: 1000,
                borderBottom: '1px solid rgba(0,0,0,0.04)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px', fontWeight: 900, color: 'var(--text-main)' }}>
                    <ShieldCheck size={28} color="var(--primary)" />
                    OmniShield
                </div>
                <nav style={{ display: 'flex', gap: '40px' }}>
                    {['Operation', 'Vectors', 'Intelligence', 'Security'].map(item => (
                        <a key={item} href={`#${item.toLowerCase()}`} style={{ textDecoration: 'none', color: 'var(--text-dim)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item}</a>
                    ))}
                    <button className="btn" style={{ height: '44px', padding: '0 24px', borderRadius: '14px', fontSize: '13px', background: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => navigate('/login')}>
                        Console Login <ArrowRight size={14} />
                    </button>
                </nav>
            </header>

            {/* HERO SECTION */}
            <section style={{
                padding: '160px 20px 100px 20px',
                textAlign: 'center',
                backgroundImage: 'radial-gradient(circle at center, rgba(99,102,241,0.03) 0%, transparent 70%)'
            }}>
                <div className="hero-tag" style={{ margin: '0 auto 32px auto' }}>
                    <Fingerprint size={16} /> Advanced Behavioral Identity Shield
                </div>
                <h1 style={{
                    fontFamily: 'Outfit',
                    fontSize: 'clamp(48px, 8vw, 100px)',
                    fontWeight: 900,
                    letterSpacing: '-0.04em',
                    lineHeight: 0.85,
                    marginBottom: '40px',
                    color: 'var(--text-main)'
                }}>
                    Neural Protection<br />
                    <span style={{ color: 'var(--primary)' }}>against Digital Fraud.</span>
                </h1>
                <p style={{
                    fontSize: '20px',
                    color: 'var(--text-dim)',
                    maxWidth: '800px',
                    margin: '0 auto 60px auto',
                    lineHeight: 1.6
                }}>
                    OmniShield uses deep-learning behavioral models to identify, neutralize, and explain phishing threads on Email, SMS, and Web vectors in less than 2 seconds.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <button className="btn btn-landing-primary" style={{ padding: '0 48px' }} onClick={() => navigate('/register')}>
                        Deploy My Shield
                    </button>
                    <button className="btn btn-landing-secondary" style={{ padding: '0 48px' }} onClick={() => navigate('/login')}>
                        Console Preview
                    </button>
                </div>

                {/* TECHNICAL TERMINAL MOCKUP (By Use Code) */}
                <div style={{ marginTop: '120px', position: 'relative' }}>
                    <div className="glass-card" style={{ maxWidth: '1100px', margin: '0 auto', padding: '16px', borderRadius: '40px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 80px 160px -20px rgba(0,0,0,0.3)' }}>
                        {/* Terminal Header */}
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
                            <div style={{ marginLeft: '12px', color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: 700, fontFamily: 'monospace' }}>OmniShield-Terminal — zsh — 1440×900</div>
                        </div>

                        {/* Coded Simulation */}
                        <div style={{
                            textAlign: 'left',
                            fontFamily: '"Fira Code", monospace',
                            fontSize: '15px',
                            lineHeight: 1.6,
                            color: '#94a3b8',
                            padding: '0 20px 20px 20px'
                        }}>
                            <div><span style={{ color: '#2dd4bf' }}>➜</span> <span style={{ color: '#6366f1' }}>~</span> curl -X POST https://api.omnishield.net/v4/analyze \</div>
                            <div style={{ paddingLeft: '24px' }}>-H <span style={{ color: '#eab308' }}>"Authorization: Bearer agent_auth_token"</span> \</div>
                            <div style={{ paddingLeft: '24px' }}>-d <span style={{ color: '#eab308' }}>{"'{\"type\": \"Email\", \"content\": \"...\"}'"}</span></div>

                            <div style={{ marginTop: '32px', color: '#64748b' }}>// System: Processing vector DNA via Groq-V3...</div>
                            <div style={{ color: '#64748b' }}>// System: Cross-referencing decentralized blacklists...</div>

                            <div style={{ marginTop: '32px' }}>
                                <span style={{ color: 'white', fontWeight: 700 }}>{'{'}</span>
                                <div style={{ paddingLeft: '24px' }}>
                                    <span style={{ color: '#94a3b8' }}>"status":</span> <span style={{ color: 'var(--danger)' }}>"Phishing Detected"</span>, <br />
                                    <span style={{ color: '#94a3b8' }}>"risk_score":</span> <span style={{ color: '#f43f5e' }}>89.4</span>, <br />
                                    <span style={{ color: '#94a3b8' }}>"analysis":</span> <span style={{ color: 'white' }}>{'{'}</span> <br />
                                    <div style={{ paddingLeft: '24px' }}>
                                        <span style={{ color: '#94a3b8' }}>"motive":</span> <span style={{ color: '#2dd4bf' }}>"Urgency, Financial Spoofing"</span>, <br />
                                        <span style={{ color: '#94a3b8' }}>"reasoning":</span> <span style={{ color: '#2dd4bf' }}>"Structural pressure detected in header 4; spoofed SMTP origin matched known patterns."</span>
                                    </div>
                                    <span style={{ color: 'white' }}>{'}'}</span>
                                </div>
                                <span style={{ color: 'white', fontWeight: 700 }}>{'}'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Floating Tech Badges */}
                    <div className="glass-card" style={{ position: 'absolute', top: '10%', right: '-40px', padding: '24px', background: 'white', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <div style={{ width: '48px', height: '48px', background: 'rgba(99,102,241,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                                <Zap size={24} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 900, fontSize: '18px' }}>&lt; 150ms</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-dim)', fontWeight: 700 }}>Analysis Latency</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRUST BAR */}
            <section style={{ padding: '100px 40px', borderTop: '1px solid rgba(0,0,0,0.04)', textAlign: 'center' }}>
                <p style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '48px', color: 'var(--text-dim)' }}>Powered by Industry Standard AI Core</p>
                <div className="trust-badge-row">
                    <span style={{ fontSize: '24px', fontWeight: 900 }}>GROQ ENGINE</span>
                    <span style={{ fontSize: '24px', fontWeight: 900 }}>LLM V3</span>
                    <span style={{ fontSize: '24px', fontWeight: 900 }}>DEEP NEURAL</span>
                    <span style={{ fontSize: '24px', fontWeight: 900 }}>STABLE VOICE</span>
                    <span style={{ fontSize: '24px', fontWeight: 900 }}>CRYSTAL V2</span>
                </div>
            </section>

            {/* OPERATION SECTION (THE PROTOCOL) */}
            <section id="operation" style={{ backgroundColor: '#f9fbff', padding: '160px 40px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '100px' }}>
                        <h2 style={{ fontSize: '56px', fontWeight: 900, marginBottom: '24px', letterSpacing: '-0.02em' }}>The Inspection Protocol</h2>
                        <p style={{ color: 'var(--text-dim)', fontSize: '20px', maxWidth: '700px', margin: '0 auto' }}>OmniShield runs a multi-layered analysis pipeline to deconstruct digital threats.</p>
                    </div>

                    <div className="how-grid">
                        {[
                            { icon: Microscope, title: 'DNA Inspection', desc: 'We ingest raw suspicious strings and deconstruct the linguistic markers of fraud.' },
                            { icon: Cpu, title: 'Neural Compute', desc: 'AI Behavioral Engines simulate the psychological intent of the message contents.' },
                            { icon: Search, title: 'Global Intel', desc: 'Real-time cross-referencing against trillions of decentralized threat signals.' },
                            { icon: Zap, title: 'Neural Voice Report', desc: 'Get a natural voice summary and a detailed "Threat Diff" of all findings.' }
                        ].map((step, i) => (
                            <div key={i} className="step-card">
                                <div className="step-number" style={{ background: 'white' }}>{i + 1}</div>
                                <div style={{ color: 'var(--primary)', marginBottom: '32px', display: 'flex', justifyContent: 'center' }}>
                                    <step.icon size={48} strokeWidth={1.5} />
                                </div>
                                <h4 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '16px' }}>{step.title}</h4>
                                <p style={{ fontSize: '15px', color: 'var(--text-dim)', lineHeight: 1.7 }}>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* VECTORS SECTION */}
            <section id="vectors" style={{ padding: '160px 40px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                        <div className="glass-card" style={{ background: 'white', padding: '60px', borderRadius: '48px', boxShadow: '0 40px 80px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)', textAlign: 'center' }}>
                            <div style={{ marginBottom: '32px', color: 'var(--primary)' }}>
                                <ShieldCheck size={80} strokeWidth={1} />
                            </div>
                            <h3 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '16px' }}>Zero-Day Resilience</h3>
                            <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>Our engine doesn't wait for "known virus lists". It identifies threats based on behavioral intent and social engineering patterns.</p>
                            <div style={{ marginTop: '40px', display: 'block' }}>
                                <div className="stat-pill" style={{ display: 'inline-block' }}>Accuracy Rate: 99.8%</div>
                            </div>
                        </div>
                        {/* Accents */}
                        <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '100px', height: '100px', background: 'var(--primary)', opacity: 0.1, borderRadius: '24px', zIndex: -1 }}></div>
                    </div>

                    <div>
                        <h2 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '32px', lineHeight: 1.1 }}>One Console.<br />All Threat Vectors.</h2>
                        <p style={{ fontSize: '18px', color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: '48px' }}> attackers follow you everywhere. OmniShield ensures your digital perimeter is covered no matter where the threat originates.</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            {[
                                { title: 'Email Analysis', desc: 'Securely deconstructs corporate emails for spoofing and high-pressure motives.', color: 'var(--primary)' },
                                { title: 'SMS / Smishing', desc: 'Real-time analysis of localized mobile SMS scams and malicious SMS links.', color: 'var(--secondary)' },
                                { title: 'URL Inspections', desc: 'Scans the structural integrity of domains to find visual and behavioral fraud.', color: 'var(--accent)' }
                            ].map((v, i) => (
                                <div key={i} style={{ display: 'flex', gap: '24px' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: v.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.1 }}>
                                        <CheckCircle size={20} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>{v.title}</h4>
                                        <p style={{ fontSize: '14px', color: 'var(--text-dim)' }}>{v.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* INTELLIGENCE SECTION (DARK THEME EMPHASIS) */}
            <section id="intelligence" style={{ padding: '0 40px' }}>
                <div style={{
                    background: 'var(--text-main)',
                    color: 'white',
                    borderRadius: '60px',
                    padding: '120px 80px',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translate(-50%, 0)', width: '600px', height: '300px', background: 'var(--primary)', filter: 'blur(150px)', opacity: 0.2 }}></div>

                    <h2 style={{ fontSize: '56px', fontWeight: 900, marginBottom: '24px', position: 'relative' }}>Pure Intelligence.</h2>
                    <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.6)', maxWidth: '700px', margin: '0 auto 100px auto', position: 'relative' }}>
                        Behind the interface is a massively parallel neural compute engine designed for ultra-low latency security reporting.
                    </p>

                    <div className="landing-grid" style={{ padding: 0 }}>
                        {[
                            { icon: Bot, title: 'Contextual LLM', desc: 'Understands sarcasm, fear-based motives, and spoofed corporate identities.' },
                            { icon: Globe, title: 'Regional Optimization', desc: 'Specialized for English and Tamil dialects used in targeted regional scams.' },
                            { icon: Eye, title: 'Threat Diff™', desc: 'Highlights the specific keywords and structural markers that triggered our alerts.' },
                            { icon: Zap, title: 'Neural Voice', desc: 'Industry-standard text-to-speech engine provides clear security debriefings.' },
                            { icon: HistoryIcon, title: 'Telemetry Archive', desc: 'Personalized logs of every signal ever analyzed for future reference.' },
                            { icon: Lock, title: 'Privacy First', desc: 'Metadata is analyzed without storing sensitive user identities on our main buffer.' }
                        ].map((f, i) => (
                            <div key={i} className="feature-card" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
                                <div className="feature-icon" style={{ background: 'var(--primary)', color: 'white' }}>
                                    <f.icon size={24} />
                                </div>
                                <h4 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '16px' }}>{f.title}</h4>
                                <p style={{ fontSize: '14px', lineHeight: 1.6, opacity: 0.6 }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECURITY/AUTH SECTION (CTA) */}
            <section id="security" style={{ padding: '160px 40px', textAlign: 'center' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '64px', fontWeight: 900, marginBottom: '40px', letterSpacing: '-0.03em' }}>Ready to deploy?</h2>
                    <p style={{ fontSize: '20px', color: 'var(--text-dim)', marginBottom: '60px' }}>Join over 10,000 security-conscious individuals using OmniShield to secure their digital perimeter.</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                        <button className="btn btn-landing-primary" style={{ padding: '0 60px', height: '80px', fontSize: '18px' }} onClick={() => navigate('/register')}>
                            Create Shield Account <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer-minimal" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', padding: '100px 40px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: '24px', fontWeight: 900, marginBottom: '8px' }}>OmniShield</div>
                        <p style={{ opacity: 0.5, fontSize: '14px' }}>© 2025 Global Security Network. All Rights Reserved.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '40px' }}>
                        <a href="#" style={{ color: 'var(--text-main)', fontWeight: 700, textDecoration: 'none', fontSize: '14px' }}>Privacy Policy</a>
                        <a href="#" style={{ color: 'var(--text-main)', fontWeight: 700, textDecoration: 'none', fontSize: '14px' }}>Terminal API</a>
                        <a href="#" style={{ color: 'var(--text-main)', fontWeight: 700, textDecoration: 'none', fontSize: '14px' }}>Contact Intelligence</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
