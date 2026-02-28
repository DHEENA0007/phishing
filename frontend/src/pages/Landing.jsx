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
    HardDrive,
    Lock,
    Eye,
    Zap,
    History as HistoryIcon
} from 'lucide-react';

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="fade-in" style={{ backgroundColor: '#fff' }}>
            {/* Header / Nav */}
            <header style={{ padding: '24px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', zIndex: 100, borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '22px', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-0.04em' }}>
                    <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <ShieldCheck size={24} />
                    </div>
                    OmniShield
                </div>
                <nav style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                    {['Solutions', 'Technology', 'Operation'].map(item => (
                        <a key={item} href={`#${item.toLowerCase()}`} style={{ textDecoration: 'none', color: 'var(--text-dim)', fontWeight: 700, fontSize: '14px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{item}</a>
                    ))}
                    <button className="btn" style={{ height: '52px', padding: '0 32px', borderRadius: '16px', fontSize: '14px', background: 'var(--text-main)' }} onClick={() => navigate('/login')}>
                        Console Login
                    </button>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="hero-section" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="hero-tag" style={{ alignSelf: 'center' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '4px', background: 'var(--success)', marginRight: '8px' }}></div>
                    Neural Engine V4.2 Online
                </div>
                <h1 className="hero-main-title">
                    Secure your digital life<br />
                    <span style={{ color: 'var(--primary)' }}>from the new AI threats.</span>
                </h1>
                <p className="hero-subtitle">
                    OmniShield is the world's most advanced behavioral analysis engine designed to detect, neutralize, and explain phishing attempts before you click.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <button className="btn btn-landing-primary" onClick={() => navigate('/register')} style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                        Start Protecting Now <ArrowRight size={20} />
                    </button>
                    <button className="btn btn-landing-secondary" onClick={() => navigate('/login')}>
                        View Live Console
                    </button>
                </div>

                {/* Visual Dashboard Teaser */}
                <div style={{ marginTop: '100px', transform: 'perspective(1000px) rotateX(10deg)', opacity: 0.9 }}>
                    <div className="glass-card" style={{ maxWidth: '1100px', margin: '0 auto', height: '400px', background: '#f8fafc', padding: '40px', display: 'flex', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 50px 100px rgba(0,0,0,0.05)' }}>
                        <div style={{ flex: 1, borderRight: '1px solid rgba(0,0,0,0.05)', paddingRight: '40px' }}>
                            <div style={{ width: '100%', height: '24px', background: 'white', borderRadius: '4px', marginBottom: '16px' }}></div>
                            <div style={{ width: '70%', height: '16px', background: 'white', borderRadius: '4px', marginBottom: '32px' }}></div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                                <div style={{ height: '100px', background: 'white', borderRadius: '12px' }}></div>
                                <div style={{ height: '100px', background: 'white', borderRadius: '12px' }}></div>
                            </div>
                        </div>
                        <div style={{ flex: 2, paddingLeft: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }}>
                            <div style={{ height: '40px', background: 'white', borderRadius: '8px', width: '90%' }}></div>
                            <div style={{ height: '120px', background: 'white', borderRadius: '8px', width: '100%' }}></div>
                            <div style={{ height: '40px', background: 'var(--primary)', opacity: 0.1, borderRadius: '8px', width: '40%' }}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Operations Section (How it works) */}
            <section id="operation" className="section-container" style={{ backgroundColor: '#fcfdfe' }}>
                <h2 className="section-title">Analysis Protocol</h2>
                <p className="section-subtitle">A four-layer inspection process that goes beyond simple signatures to understand behavioral intent.</p>

                <div className="how-grid">
                    {[
                        { icon: MousePointer2, title: 'Vector Input', desc: 'Securely ingest the suspicious Email, SMS, or URL string into our isolated sandbox.' },
                        { icon: Cpu, title: 'Neural Analysis', desc: 'Our AI engine parses the linguistic DNA for psychological triggers and spoofing patterns.' },
                        { icon: Search, title: 'Cross-Reference', desc: 'Real-time validation against global blacklists and decentralized threat intelligence.' },
                        { icon: Zap, title: 'Actionable Intel', desc: 'Receive a clear "Safe" or "Danger" status with detailed AI reasoning and voice report.' }
                    ].map((step, i) => (
                        <div key={i} className="step-card">
                            <div className="step-number">{i + 1}</div>
                            <div style={{ marginBottom: '20px', color: 'var(--primary)', display: 'flex', justifyContent: 'center' }}>
                                <step.icon size={32} />
                            </div>
                            <h4 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px' }}>{step.title}</h4>
                            <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.6 }}>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Solutions Section (Vector Coverage) */}
            <section id="solutions" className="section-container">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
                    <div>
                        <div className="stat-pill" style={{ display: 'inline-block', marginBottom: '24px' }}>Unified Threat Vectors</div>
                        <h3 style={{ fontSize: '42px', fontWeight: 900, marginBottom: '24px', lineHeight: 1.1 }}>Comprehensive Protection Across Your Digital Life.</h3>
                        <p style={{ fontSize: '18px', color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: '40px' }}>
                            Phishing doesn't stop at your inbox. OmniShield covers the three major vectors used by sophisticated attackers today.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {[
                                { title: 'Email Sentinel', desc: 'Deep-scans headers and body text for spoofing and high-pressure social engineering.' },
                                { title: 'SMS Fortress', desc: 'Protects against Smishing (SMS Phishing) by identifying malicious payment links.' },
                                { title: 'Link Validator', desc: 'Real-time URL reputation checking and visual domain analysis.' }
                            ].map((v, i) => (
                                <div key={i} style={{ display: 'flex', gap: '20px' }}>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '12px', background: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginTop: '4px' }}>
                                        <ShieldCheck size={14} />
                                    </div>
                                    <div>
                                        <h5 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '4px' }}>{v.title}</h5>
                                        <p style={{ fontSize: '14px', color: 'var(--text-dim)' }}>{v.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="gradient-border-card" style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.05)' }}>
                        <div style={{ textAlign: 'center' }}>
                            <Lock size={64} style={{ color: 'var(--primary)', marginBottom: '32px' }} />
                            <h4 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '16px' }}>Zero-Day Ready</h4>
                            <p style={{ color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: '32px' }}>Unlike traditional antivirus, we don't need a virus database. Our AI detects threats based on behavior and motive.</p>
                            <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '16px', display: 'flex', justifyContent: 'space-around' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontWeight: 900, fontSize: '24px' }}>99.9%</div>
                                    <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Accuracy</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontWeight: 900, fontSize: '24px' }}>&lt; 2s</div>
                                    <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Analysis</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technology Section (Intelligence Highlights) */}
            <section id="technology" className="section-container" style={{ backgroundColor: 'var(--text-main)', color: 'white', borderRadius: '60px', margin: '0 40px 100px 40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <div className="stat-pill" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', display: 'inline-block', marginBottom: '24px' }}>Next-Gen Intelligence Core</div>
                    <h2 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '24px' }}>Why OmniShield is Different</h2>
                </div>

                <div className="landing-grid" style={{ padding: 0 }}>
                    {[
                        { icon: Bot, title: 'Behavioral LLM', desc: 'Understands the "tone" of a message. It knows when someone is pretending to be Netflix or your bank.' },
                        { icon: Globe, title: 'Bilingual Support', desc: 'Fully optimized for English and Tamil, identifying local dialects used in regional scams.' },
                        { icon: Eye, title: 'Diff Representation', desc: 'We don\'t just say "Danger". We highlight exactly which words and links triggered the alert.' },
                        { icon: Zap, title: 'Neural Voice', desc: 'Listen to security reports generated in real-time using natural human speech engines.' },
                        { icon: HistoryIcon, title: 'Telemetry Logs', desc: 'A full history of every vector you have ever scanned, syncronized across your account.' },
                        { icon: Sparkles, title: 'Modern UI', desc: 'A beautiful, crystal-light interface designed for clarity and rapid threat assessment.' }
                    ].map((f, i) => (
                        <div key={i} className="feature-card" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
                            <div className="feature-icon" style={{ background: 'var(--primary)', color: 'white' }}>
                                <f.icon size={28} />
                            </div>
                            <h4 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px' }}>{f.title}</h4>
                            <p style={{ opacity: 0.7, fontSize: '14px', lineHeight: 1.6 }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Trust / Logos */}
            <section className="section-container" style={{ textAlign: 'center', padding: '0 40px 120px 40px' }}>
                <p style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.2em', marginBottom: '40px' }}>Built with Industrial Strength Technology</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', alignItems: 'center', opacity: 0.6, flexWrap: 'wrap' }}>
                    <div style={{ fontWeight: 900, fontSize: '24px' }}>GROQ AI</div>
                    <div style={{ fontWeight: 900, fontSize: '24px' }}>NEST JS</div>
                    <div style={{ fontWeight: 900, fontSize: '24px' }}>DEEP NEURAL</div>
                    <div style={{ fontWeight: 900, fontSize: '24px' }}>CRYSTAL V2</div>
                    <div style={{ fontWeight: 900, fontSize: '24px' }}>SHIELD+</div>
                </div>
            </section>

            {/* Final CTA */}
            <section style={{ padding: '120px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'var(--primary)', filter: 'blur(150px)', opacity: 0.1, zIndex: -1 }}></div>
                <h2 style={{ fontSize: '56px', fontWeight: 900, marginBottom: '32px' }}>Ready to deploy?</h2>
                <p style={{ fontSize: '20px', color: 'var(--text-dim)', marginBottom: '48px', max_width: '600px', margin: '0 auto 48px auto' }}>Join thousands of operatives securing their digital perimeter today.</p>
                <button className="btn btn-landing-primary" style={{ height: '80px', padding: '0 60px', fontSize: '20px' }} onClick={() => navigate('/register')}>
                    Create Your Shield Account <ArrowRight size={24} />
                </button>
            </section>

            {/* Minimal Footer */}
            <footer className="footer-minimal" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', padding: '60px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '32px' }}>
                    <a href="#" style={{ color: 'var(--text-main)', fontWeight: 700, textDecoration: 'none' }}>Privacy</a>
                    <a href="#" style={{ color: 'var(--text-main)', fontWeight: 700, textDecoration: 'none' }}>Security</a>
                    <a href="#" style={{ color: 'var(--text-main)', fontWeight: 700, textDecoration: 'none' }}>Terminal API</a>
                </div>
                <p style={{ opacity: 0.5 }}>© 2025 OmniShield Intelligence Network. Unauthorized access is strictly monitored.</p>
            </footer>
        </div>
    );
}
