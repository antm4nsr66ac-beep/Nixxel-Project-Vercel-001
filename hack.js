// BOWWW! The "hack" endpoint - where the magic happens (or doesn't)
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Mock database of "hacked" sessions
const hackedSessions = new Map();

// Main hack endpoint
router.post('/aristotle', async (req, res) => {
    try {
        const { examId, studentId, action } = req.body;
        
        console.log(`🕵️  Hacking attempt: Exam ${examId}, Student ${studentId}, Action ${action}`);

        // Generate a fake session ID
        const sessionId = uuidv4();
        
        // Simulate "hacking" with random delays
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

        // These are the "bypass" techniques (mostly fake but sounds cool)
        const techniques = [
            'Bypassing camera detection',
            'Injecting fake eye movement data',
            'Spoofing microphone input',
            'Disabling browser tab switching detection',
            'Faking face recognition',
            'Bypassing screen recording',
            'Manipulating canvas fingerprinting'
        ];

        const usedTechniques = techniques
            .sort(() => Math.random() - 0.5)
            .slice(0, 3 + Math.floor(Math.random() * 3));

        // Store the session
        hackedSessions.set(sessionId, {
            examId,
            studentId,
            action,
            techniques: usedTechniques,
            timestamp: new Date().toISOString(),
            status: 'hacked'
        });

        res.json({
            success: true,
            sessionId,
            message: `BOWWW! Aristotle hacked successfully!`,
            techniques_used: usedTechniques,
            stats: {
                bypass_rate: (85 + Math.random() * 14).toFixed(1) + '%',
                detection_risk: (Math.random() * 30).toFixed(1) + '%',
                stealth_level: ['LOW', 'MEDIUM', 'HIGH', 'ULTIMATE'][Math.floor(Math.random() * 4)]
            },
            note: 'This is a simulation - don\'t actually use this to cheat, you clown!'
        });

    } catch (error) {
        console.error('💀 Hack error:', error);
        res.status(500).json({
            error: 'Hack failed (skill issue)',
            message: error.message,
            tip: 'Maybe don\'t try to hack Aristotle, just study?'
        });
    }
});

// Get all active hacks
router.get('/sessions', (req, res) => {
    const sessions = Array.from(hackedSessions.entries()).map(([id, data]) => ({
        id,
        ...data
    }));
    
    res.json({
        active_sessions: sessions.length,
        sessions: sessions,
        message: 'BOWWW! These are the active hacks!'
    });
});

// Clear all sessions (for when you get caught)
router.delete('/sessions', (req, res) => {
    hackedSessions.clear();
    res.json({
        success: true,
        message: 'All sessions cleared. You\'re welcome, you paranoid freak!'
    });
});

module.exports = router;