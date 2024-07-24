const mongoose = require('mongoose');

// Define the application schema
const applicationSchema = new mongoose.Schema({
  company: String,
  title: String,
  date: Date,
  notes: String,
  postingLink: String,
  status: {
    type: String,
    enum: ['interested', 'applied', 'interviewing', 'rejected', 'accepted']
  }
}, { timestamps: true });

// Check if the User model is already defined
const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  applications: [applicationSchema]
}));

module.exports = User;


