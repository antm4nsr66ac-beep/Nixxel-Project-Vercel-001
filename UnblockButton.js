import React from 'react';

export default function UnblockButton({ onClick, loading }) {
    return (
        <button 
            onClick={onClick}
            disabled={loading}
            className="unblock-btn"
            style={{
                background: 'linear-gradient(45deg, #00ff00, #00cc00)',
                border: 'none',
                color: '#000',
                padding: '15px 30px',
                fontSize: '18px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: '0 0 20px rgba(0,255,0,0.3)',
                transition: 'all 0.3s'
            }}
        >
            {loading ? '⚡ UNBLOCKING...' : '🔓 UNBLOCK NOW'}
        </button>
    );
}