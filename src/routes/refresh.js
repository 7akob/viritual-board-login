const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', (req, res) => {
    res.json({ msg: 'Refresh route is working' });
});

router.post('/', async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ msg: 'No token provided' });

    try {
        const storedToken = await prisma.refresh_tokens.findUnique({
            where: { token: refreshToken }
        });

        if (!storedToken) return res.status(403).json({ msg: 'Invalid refresh token' });

        if (new Date() > storedToken.expires_at) {
            await prisma.refresh_tokens.delete({ where: { token: refreshToken } });
            return res.status(403).json({ msg: 'Token expired' });
        }

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const newAccessToken = jwt.sign(
            { id: decoded.id },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        res.json({ accessToken: newAccessToken });
    } catch (err) {
        res.status(403).json({ msg: 'Invalid refresh token' });
    }
})

router.delete('/', async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ msg: 'No token provided' });
    try {
        await prisma.refresh_tokens.delete({ where: { token: refreshToken } });
        res.json({ msg: 'Logged out' });
    } catch {
        res.status(404).json({ msg: 'Token not found' });
    }
})

module.exports = router;