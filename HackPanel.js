import React, { useState } from 'react';

export default function HackPanel() {
    const [selectedMethod, setSelectedMethod] = useState('bypass');
    const [output, setOutput] = useState('');

    const methods = [
        { id: 'bypass', name: 'Bypass Detection', icon: '🛡️' },
        { id: 'spoof', name: 'Spoof Bio Data', icon: '👁️' },
        { id: 'proxy', name: 'Proxy Through', icon: '🌐' },
        { id: 'inject', name: 'Inject Script', icon: '💉' }
    ];

    const runMethod = (methodId) => {
        setOutput(`🔥 Running ${methodId}... BOWWW!`);
        setTimeout(() => {
            setOutput(`✅ ${methodId} completed! You're in!`);
        }, 2000);
    };

    return (
        <div style={{ padding: '20px', background: '#1a1a1a', borderRadius: '10px', margin: '20px 0' }}>
            <h3>🧨 HACKING TOOLS</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {methods.map(m => (
                    <button
                        key={m.id}
                        onClick={() => runMethod(m.id)}
                        style={{
                            background: selectedMethod === m.id ? '#ff4444' : '#333',
                            color: '#fff',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        {m.icon} {m.name}
                    </button>
                ))}
            </div>
            <pre style={{
                background: '#0a0a0a',
                padding: '15px',
                borderRadius: '5px',
                marginTop: '15px',
                color: '#00ff00',
                fontFamily: 'monospace',
                minHeight: '60px'
            }}>
                {output || 'Ready to hack. Select a method, you clown!'}
            </pre>
        </div>
    );
}