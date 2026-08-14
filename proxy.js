// BOWWW! The proxy that makes Aristotle think you're someone else
const axios = require('axios');
const express = require('express');
const router = express.Router();
const { generateSpoofedHeaders } = require('./utils/request-headers');
const { bypassAristotle } = require('./utils/aristotle-bypass');

// Main proxy endpoint
router.all('*', async (req, res) => {
    try {
        // Get the target URL from query or body
        const targetUrl = req.query.url || req.body.url || req.headers['x-target-url'];
        
        if (!targetUrl) {
            return res.status(400).json({
                error: 'No target URL provided',
                usage: 'Use ?url=https://aristotle.example.com or body JSON { "url": "..." }'
            });
        }

        console.log(`🔄 Proxying request to: ${targetUrl}`);
        console.log(`📝 Method: ${req.method}`);
        console.log(`📦 Body:`, req.body);

        // Generate spoofed headers to bypass restrictions
        const headers = generateSpoofedHeaders(req);
        
        // Add bypass token if available
        if (process.env.BYPASS_TOKEN) {
            headers['X-Bypass-Token'] = process.env.BYPASS_TOKEN;
        }

        // Add custom user-agent to look like a legit browser
        headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

        // Make the request
        const response = await axios({
            method: req.method,
            url: targetUrl,
            headers: headers,
            data: req.body,
            timeout: 30000,
            maxRedirects: 5,
            validateStatus: () => true // accept any status
        });

        // Apply Aristotle bypass if detected
        let data = response.data;
        if (typeof data === 'string' && data.includes('aristotle')) {
            console.log('🕵️  Aristotle detected! Applying bypass...');
            data = bypassAristotle(data);
        }

        // Send response back
        res.status(response.status)
           .set(response.headers)
           .send(data);
           
        console.log(`✅ Proxy success: ${response.status} for ${targetUrl}`);

    } catch (error) {
        console.error('💀 Proxy error:', error.message);
        res.status(500).json({
            error: 'Proxy failed',
            message: error.message,
            advice: 'Maybe Aristotle is onto us? Try a different route.'
        });
    }
});

module.exports = router;