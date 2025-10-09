const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', (req, res) => {
  res.json({ msg: 'User route is working' });
});

router.post('/login', async (req, res) => {
    const user = await prisma.users.findUnique({
        where: { email: req.body.email }
    });
    if (user == null) {
        return res.status(401).json({ msg: 'Authentication failed' });
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(401).json({ msg: 'Authentication failed' });
    }


    const accessToken = jwt.sign({ 
        id: user.id, 
        email: user.email,
        name: user.username,
        role: user.role
    }, process.env.JWT_SECRET, { expiresIn: '15m' });

    const refreshToken = jwt.sign(
        { id: user.id},
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '30d'}
    );

    await prisma.refresh_tokens.create({
        data: {
            user_id: user.id,
            token: refreshToken,
            expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) //30 dagar
        }
    })

    res.json({
        msg: 'Login ok',
        accessToken,
        refreshToken
    })
});

router.post('/', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    try {
        const newUser = await prisma.users.create({
            data: {
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            }
        });
        res.status(201).json({ msg: 'User created', userId: newUser.id });
    } catch {
        res.status(500).json({ msg: 'Error creating user' });
    }
});


module.exports = router;