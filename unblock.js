// BOWWW! Unblock Aristotle websites using DNS over HTTPS
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// List of blocked domains and their alternatives
const BLOCKED_DOMAINS = {
    'aristotle.com': 'aristotle.unblocked.net',
    'aristotle.ai': 'aristotle-proxy.xyz',
    'app.aristotle.com': 'app.aristotle-bypass.com',
    'exam.aristotle.com': 'exam.aristotle-free.com'
};

router.post('/dns', async (req, res) => {
    try {
        const { domain } = req.body;
        
        if (!domain) {
            return res.status(400).json({ error: 'Domain required' });
        }

        // Check if domain is blocked
        let unblockedDomain = BLOCKED_DOMAINS[domain];
        if (unblockedDomain) {
            console.log(`🔄 Redirecting ${domain} to ${unblockedDomain}`);
            return res.json({
                original: domain,
                unblocked: unblockedDomain,
                method: 'domain_redirect',
                status: 'success'
            });
        }

        // Try DNS over HTTPS to get alternative IP
        const dnsResult = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
        const dnsData = await dnsResult.json();
        
        if (dnsData.Answer && dnsData.Answer.length > 0) {
            const ip = dnsData.Answer[0].data;
            console.log(`📡 Found IP for ${domain}: ${ip}`);
            
            return res.json({
                original: domain,
                ip: ip,
                method: 'dns_resolve',
                status: 'success',
                note: 'Use this IP directly to bypass DNS blocking'
            });
        }

        // Try Cloudflare DNS
        const cfResult = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=A`, {
            headers: {
                'Accept': 'application/dns-json'
            }
        });
        const cfData = await cfResult.json();
        
        if (cfData.Answer && cfData.Answer.length > 0) {
            const ip = cfData.Answer[0].data;
            return res.json({
                original: domain,
                ip: ip,
                method: 'cloudflare_dns',
                status: 'success'
            });
        }

        // If all else fails, suggest using a proxy
        return res.json({
            original: domain,
            method: 'proxy_suggested',
            status: 'partial',
            proxy_url: `https://cors-anywhere.herokuapp.com/${domain}`,
            note: 'Try using a CORS proxy'
        });

    } catch (error) {
        console.error('💀 Unblock error:', error);
        res.status(500).json({
            error: 'Unblock failed',
            message: error.message,
            suggestion: 'Try using a VPN or Tor instead, you coward!'
        });
    }
});

// Batch unblock multiple domains
router.post('/batch', async (req, res) => {
    try {
        const { domains } = req.body;
        
        if (!domains || !Array.isArray(domains)) {
            return res.status(400).json({ error: 'Domains array required' });
        }

        const results = await Promise.all(
            domains.map(async (domain) => {
                try {
                    const response = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
                    const data = await response.json();
                    return {
                        domain,
                        ip: data.Answer?.[0]?.data || 'Not found',
                        status: 'success'
                    };
                } catch {
                    return {
                        domain,
                        status: 'failed',
                        error: 'Could not resolve'
                    };
                }
            })
        );

        res.json({
            results,
            message: 'BOWWW! Batch unblock complete!',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;