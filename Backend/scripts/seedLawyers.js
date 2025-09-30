const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Missing MONGODB_URI in .env');
    process.exit(1);
  }
  await mongoose.connect(uri);

  const plainPassword = 'secret123';
  const hashed = await bcrypt.hash(plainPassword, 10);

  const lawyers = [
    { name: 'Disha Sonar', email: 'disha@example.com', password: hashed, role: 'lawyer', language: 'en', location: 'Delhi', verified: true },
    { name: 'Chetana Chaudhari', email: 'chetana@example.com', password: hashed, role: 'lawyer', language: 'mr', location: 'Nagpur', verified: true },
    { name: 'Abhilasha Takale', email: 'abhilasha@example.com', password: hashed, role: 'lawyer', language: 'hi', location: 'Pune', verified: true },
  ];
  await User.deleteMany({ role: 'lawyer' });
  await User.insertMany(lawyers);
  console.log('Seeded lawyers with password:', plainPassword);
  await mongoose.disconnect();
}

run().catch(err => { console.error(err); process.exit(1); });
