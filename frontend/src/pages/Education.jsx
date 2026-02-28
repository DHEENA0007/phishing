import React from 'react';
import { BookOpen, ShieldAlert, AlertTriangle, AlertCircle } from 'lucide-react';

export default function Education() {
    return (
        <div>
            <h1 className="header-title" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <BookOpen size={28} /> Education & Awareness
            </h1>

            <div style={{ display: 'grid', gap: '32px', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)' }}>
                <div className="glass-container" style={{ padding: '32px' }}>
                    <h2 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)' }}>
                        <ShieldAlert size={20} /> What is Phishing?
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        Phishing is a type of social engineering where an attacker sends a fraudulent (e.g., spoofed, fake, or otherwise deceptive) message designed to trick a person into revealing sensitive information or to deploy malicious software on the victim's infrastructure like ransomware.
                    </p>
                </div>

                <div className="glass-container" style={{ padding: '32px' }}>
                    <h2 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--warning)' }}>
                        <AlertTriangle size={20} /> Common Techniques
                    </h2>
                    <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.6, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <li><strong>Email Phishing:</strong> Fake emails mimicking legitimate companies.</li>
                        <li><strong>Spear Phishing:</strong> Highly targeted phishing attacks at specific individuals.</li>
                        <li><strong>Smishing (SMS Phishing):</strong> Fraudulent SMS messages often containing malicious links.</li>
                        <li><strong>Whaling:</strong> Phishing attacks targeting high-profile executives.</li>
                    </ul>
                </div>
            </div>

            <h2 style={{ fontSize: '24px', margin: '40px 0 24px 0' }}>Identifying Red Flags</h2>

            <div style={{ display: 'grid', gap: '24px' }}>
                <div className="glass-card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <AlertCircle size={24} color="var(--danger)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <div>
                        <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Urgent or Threatening Language</h3>
                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                            Attackers often create a sense of urgency. Examples: "Your account will be suspended in 24 hours," or "Immediate action required for your tax return."
                        </p>
                    </div>
                </div>

                <div className="glass-card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <AlertCircle size={24} color="var(--danger)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <div>
                        <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Mismatched URLs and Link Texts</h3>
                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                            Hover over links without clicking to see the actual destination. The text might say "www.bank.com" but point to "www.bank-verify-account.com". Always double check the domain spelling.
                        </p>
                    </div>
                </div>

                <div className="glass-card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <AlertCircle size={24} color="var(--danger)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <div>
                        <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Requests for Sensitive Information</h3>
                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                            Legitimate organizations generally will not ask for your password, social security number, or full credit card details via email or SMS.
                        </p>
                    </div>
                </div>
            </div>

            <div className="glass-container bg-safe" style={{ padding: '32px', marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '12px' }}>Stay Safe</h2>
                <p style={{ color: 'black', margin: 0, maxWidth: '600px' }}>
                    Always treat unexpected requests with suspicion. When in doubt, navigate directly to the official website instead of clicking on links in unsolicited messages. Use PhishGuard to verify any suspicious content.
                </p>
            </div>
        </div>
    );
}
