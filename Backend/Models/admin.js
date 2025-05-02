const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';
const AdminSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Admin', AdminSchema);
