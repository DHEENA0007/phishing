import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Zap, Bot, Globe, ArrowRight, ShieldAlert, CheckCircle2, Layout, Sparkles } from 'lucide-react';

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="fade-in">
            {/* Nav */}
            <div style={{ padding: '32px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '24px', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-0.03em' }}>
                    <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <ShieldCheck size={24} />
                    </div>
                    OmniShield
                </div>
                <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                    <a href="#features" style={{ textDecoration: 'none', color: 'var(--text-dim)', fontWeight: 700, fontSize: '15px' }}>Features</a>
                    <a href="#tech" style={{ textDecoration: 'none', color: 'var(--text-dim)', fontWeight: 700, fontSize: '15px' }}>Technology</a>
                    <button className="btn" style={{ height: '48px', padding: '0 24px', borderRadius: '16px', fontSize: '14px', background: 'var(--text-main)' }} onClick={() => navigate('/login')}>
                        Agent Login
                    </button>
                </div>
            </div>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-tag">
                    <Sparkles size={16} /> 2025 Security Standard
                </div>
                <h1 className="hero-main-title">
                    Digital Defense<br />
                    <span style={{ background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Defined by AI.
                    </span>
                </h1>
                <p className="hero-subtitle">
                    Protect your digital perimeter. Real-time phishing analysis across Email, SMS, and URL vectors powered by advanced behavioral AI.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <button className="btn btn-landing-primary shadow-btn" onClick={() => navigate('/register')}>
                        Deploy Shield Now <ArrowRight size={20} style={{ marginLeft: '12px' }} />
                    </button>
                    <button className="btn btn-landing-secondary" onClick={() => navigate('/login')}>
                        Access Console
                    </button>
                </div>
            </section>

            {/* Dashboard Mockup Visual */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', padding: '0 40px' }}>
                <div className="glass-card" style={{ padding: '8px', borderRadius: '48px', background: 'white', border: '1px solid rgba(0,0,0,0.06)' }}>
                    <div style={{ background: '#f8fafc', borderRadius: '40px', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        <div style={{ textAlign: 'center' }}>
                            <Layout size={80} color="var(--primary)" opacity={0.1} />
                            <p style={{ marginTop: '24px', color: 'var(--text-dim)', fontWeight: 700 }}>PREMIUM CONSOLE PREVIEW</p>
                        </div>
                    </div>
                </div>
                <div style={{ position: 'absolute', top: '-10%', right: '5%', width: '200px', height: '200px', background: 'var(--primary)', filter: 'blur(100px)', opacity: 0.1, zIndex: -1 }}></div>
            </div>

            {/* Features Grid */}
            <section id="features" className="landing-grid">
                <div className="feature-card">
                    <div className="feature-icon" style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--primary)' }}>
                        <Bot size={32} />
                    </div>
                    <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '16px' }}>Behavioral AI Core</h3>
                    <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>Goes beyond simple blocklists. Our LLM core analyzes the linguistic "DNA" of messages to find zero-day threats.</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon" style={{ background: 'rgba(45,212,191,0.1)', color: 'var(--secondary)' }}>
                        <Globe size={32} />
                    </div>
                    <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '16px' }}>Multilingual Intel</h3>
                    <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>First-of-its-kind support for English and Tamil security analysis, including native neural voice reports.</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon" style={{ background: 'rgba(244,63,94,0.1)', color: 'var(--accent)' }}>
                        <ShieldAlert size={32} />
                    </div>
                    <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '16px' }}>Vector Insulation</h3>
                    <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>Comprehensive coverage across your entire digital life: Web Links, SMS, and Corporate Email.</p>
                </div>
            </section>

            {/* Minimal Footer */}
            <footer className="footer-minimal">
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <p style={{ fontSize: '14px', letterSpacing: '0.05em' }}>© 2025 OMNISHIELD GLOBAL CYBER INTELLIGENCE. ALL RIGHTS SECURED.</p>
                    <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '24px', opacity: 0.5 }}>
                        <span>Protocol v4.2.0</span>
                        <span>Neural Link Status: Active</span>
                        <span>Privacy Policy</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
