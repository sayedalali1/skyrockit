const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  company: String,
  title: String,
  date: String,
  notes: String,
  postingLink: String,
  status:{
    type: String,
    enum: ['interested', 'applied', 'interviewing', 'rejected', 'accepted' ]
  } 
}, { timestamps: true})

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  applications: [applicationSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;


