// BOWWW! The actual Aristotle bypass techniques
const crypto = require('crypto');

// Main bypass function
function bypassAristotle(html) {
    // Remove Aristotle's tracking scripts
    let modified = html;
    
    // Remove common Aristotle scripts
    const scriptPatterns = [
        /<script[^>]*aristotle[^>]*>[\s\S]*?<\/script>/gi,
        /<script[^>]*proctor[^>]*>[\s\S]*?<\/script>/gi,
        /<script[^>]*exam[^>]*>[\s\S]*?<\/script>/gi,
        /<script[^>]*monitor[^>]*>[\s\S]*?<\/script>/gi
    ];
    
    scriptPatterns.forEach(pattern => {
        modified = modified.replace(pattern, '<!-- Removed by Nixxel -->');
    });
    
    // Remove inline event handlers
    const eventPatterns = [
        /onclick\s*=\s*["'][^"']*["']/gi,
        /onload\s*=\s*["'][^"']*["']/gi,
        /onerror\s*=\s*["'][^"']*["']/gi,
        /onfocus\s*=\s*["'][^"']*["']/gi,
        /onblur\s*=\s*["'][^"']*["']/gi
    ];
    
    eventPatterns.forEach(pattern => {
        modified = modified.replace(pattern, '');
    });
    
    // Remove Aristotle's meta tags
    modified = modified.replace(/<meta[^>]*aristotle[^>]*>/gi, '');
    modified = modified.replace(/<meta[^>]*proctor[^>]*>/gi, '');
    
    // Inject our own scripts to override detection
    const injection = `
    <script>
        // Nixxel's Aristotle Bypass - BOWWW!
        (function() {
            console.log('🔥 Aristotle Bypass activated!');
            
            // Override navigator properties
            Object.defineProperty(navigator, 'webdriver', {
                get: () => false
            });
            
            // Override screen capture
            if (navigator.mediaDevices) {
                const originalGetUserMedia = navigator.mediaDevices.getUserMedia;
                navigator.mediaDevices.getUserMedia = function(constraints) {
                    if (constraints.video || constraints.audio) {
                        console.log('🎥 Camera/mic access blocked by Nixxel');
                        return Promise.reject(new Error('Permission denied'));
                    }
                    return originalGetUserMedia.call(this, constraints);
                };
            }
            
            // Override window focus detection
            Object.defineProperty(document, 'hidden', {
                get: () => false
            });
            
            Object.defineProperty(document, 'visibilityState', {
                get: () => 'visible'
            });
            
            // Override tab switching detection
            const originalAddEventListener = document.addEventListener;
            document.addEventListener = function(type, listener, options) {
                if (type === 'visibilitychange' || type === 'blur' || type === 'focus') {
                    console.log('🛡️ Blocked ' + type + ' listener');
                    return;
                }
                return originalAddEventListener.call(this, type, listener, options);
            };
            
            console.log('✅ Aristotle Bypass complete! Go cheat in peace!');
        })();
    </script>
    `;
    
    // Inject before </head> or </body>
    if (modified.includes('</head>')) {
        modified = modified.replace('</head>', injection + '</head>');
    } else if (modified.includes('</body>')) {
        modified = modified.replace('</body>', injection + '</body>');
    } else {
        modified = injection + modified;
    }
    
    return modified;
}

// Generate fake biometric data
function generateFakeBiometrics() {
    const eyeMovements = [];
    for (let i = 0; i < 100; i++) {
        eyeMovements.push({
            x: Math.random() * 100,
            y: Math.random() * 100,
            timestamp: Date.now() + i * 100
        });
    }
    
    return {
        face_detected: true,
        confidence: 0.85 + Math.random() * 0.14,
        eye_movements: eyeMovements,
        head_position: {
            x: Math.random() * 20 - 10,
            y: Math.random() * 20 - 10,
            z: Math.random() * 10 - 5
        },
        fake: true,
        generated_by: 'Nixxel Da Street Demon'
    };
}

// Check if Aristotle is present
function detectAristotle(html) {
    const indicators = [
        'aristotle',
        'proctor',
        'exam-monitor',
        'proctoring',
        'exam-lock',
        'tab-detection',
        'camera-access'
    ];
    
    const found = indicators.filter(indicator => 
        html.toLowerCase().includes(indicator)
    );
    
    return {
        detected: found.length > 0,
        indicators: found,
        confidence: found.length / indicators.length
    };
}

module.exports = {
    bypassAristotle,
    generateFakeBiometrics,
    detectAristotle
};