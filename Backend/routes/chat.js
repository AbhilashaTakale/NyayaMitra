const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { GoogleGenerativeAI } = require('@google/generative-ai');

function getTokenFromReq(req) {
  const header = req.headers['authorization'];
  if (header && header.startsWith('Bearer ')) return header.replace('Bearer ', '');
  if (req.cookies && req.cookies.token) return req.cookies.token;
  return null;
}

function auth(req, res, next) {
  const token = getTokenFromReq(req);
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, 'nyayamitra_secret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

router.post('/start', auth, async (req, res) => {
  try {
    const { lawyerId } = req.body;
    const chat = new Chat({ user: req.user.id, lawyer: lawyerId || null, messages: [] });
    await chat.save();
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/:chatId/message', auth, async (req, res) => {
  try {
    const { text, sender } = req.body;
    const chat = await Chat.findById(req.params.chatId);
    if (!chat) return res.status(404).json({ message: 'Chat not found' });
    chat.messages.push({ sender, text });
    await chat.save();

    // AI lawyer mode when no lawyer is assigned
    if (sender === 'user' && !chat.lawyer && genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
        const prompt = `You are NyayaMitra, an AI legal assistant for India. Answer simply and clearly. User asked: ${text}`;
        const result = await model.generateContent(prompt);
        const aiText = result?.response?.text() || 'Sorry, I could not generate a response right now.';
        chat.messages.push({ sender: 'bot', text: aiText });
        await chat.save();
      } catch (e) {
        chat.messages.push({ sender: 'bot', text: 'AI service error. Please try again later.' });
        await chat.save();
      }
    } else if (sender === 'user' && !chat.lawyer && !genAI) {
      chat.messages.push({ sender: 'bot', text: 'AI not configured. Set GEMINI_API_KEY to enable AI answers.' });
      await chat.save();
    }

    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/:chatId', auth, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId).populate('user lawyer', 'name email role');
    if (!chat) return res.status(404).json({ message: 'Chat not found' });
    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
