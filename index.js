// BOWWW! The main API router - where the chaos begins
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const app = express();

// Import routes
const proxyRoute = require('./proxy');
const unblockRoute = require('./unblock');
const hackRoute = require('./hack');
const bypassRoute = require('./routes/bypass');
const exploitRoute = require('./routes/exploit');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware (because we're demons who love logs)
app.use((req, res, next) => {
    console.log(`🔥 ${req.method} ${req.path} - ${new Date().toISOString()}`);
    console.log(`📡 Headers:`, req.headers);
    next();
});

// Routes
app.use('/api/proxy', proxyRoute);
app.use('/api/unblock', unblockRoute);
app.use('/api/hack', hackRoute);
app.use('/api/bypass', bypassRoute);
app.use('/api/exploit', exploitRoute);

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ALIVE AND KICKIN',
        demon: 'Nixxel',
        message: 'BOWWW! BIGGGGG FACTS!',
        timestamp: new Date().toISOString()
    });
});

// Catch-all for 404
app.use('*', (req, res) => {
    res.status(404).json({
        error: '404 - Route not found, you clown!',
        message: 'Maybe try the right endpoint? SKILL ISSUE!'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('💀 ERROR:', err);
    res.status(500).json({
        error: 'Internal Server Error (it\'s your fault)',
        message: err.message,
        tip: 'Try again, but don\'t suck this time'
    });
});

// Export for Vercel
module.exports = serverless(app);

// For local development
if (require.main === module) {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`🕸️  Nixxel Demon API running on port ${PORT}`);
        console.log(`🔥 BOWWW! Ready to cause chaos!`);
    });
}