const express = require('express');
const router = express.Router();
const Connection = require('../models/Connection');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

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

// Request connection to a lawyer
router.post('/request', auth, async (req, res) => {
  try {
    const { lawyerId, message } = req.body;
    const lawyer = await User.findById(lawyerId);
    if (!lawyer || lawyer.role !== 'lawyer') {
      return res.status(400).json({ message: 'Invalid lawyer' });
    }
    const connection = new Connection({ user: req.user.id, lawyer: lawyerId, message });
    await connection.save();
    res.status(201).json(connection);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update connection status (lawyer side)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body; // accepted | rejected | closed
    const connection = await Connection.findById(req.params.id);
    if (!connection) return res.status(404).json({ message: 'Not found' });
    // Only the involved lawyer can change status (simple check)
    if (String(connection.lawyer) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    connection.status = status;
    await connection.save();
    res.json(connection);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// List my connections (as user or lawyer)
router.get('/mine', auth, async (req, res) => {
  try {
    const connections = await Connection.find({
      $or: [{ user: req.user.id }, { lawyer: req.user.id }],
    }).populate('user lawyer', 'name email role');
    res.json({ connections });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
