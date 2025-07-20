const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  department: String,
  salary: Number,
});

module.exports = mongoose.model('Employee', EmployeeSchema);

// File: backend/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json('Access denied');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json('Invalid token');
  }
};
