const mongoose = require('mongoose');

const ConnectionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lawyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['requested', 'accepted', 'rejected', 'closed'], default: 'requested' },
  message: { type: String },
  messages: [
    {
      sender: { type: String, required: true },
      text: { type: String },
      createdAt: { type: Date, default: Date.now },
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Connection', ConnectionSchema);
