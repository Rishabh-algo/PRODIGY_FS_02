const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const verifyToken = require('../middleware/auth');

router.use(verifyToken);

router.post('/', async (req, res) => {
  const newEmployee = new Employee(req.body);
  try {
    const savedEmployee = await newEmployee.save();
    res.json(savedEmployee);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json('Deleted successfully');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;