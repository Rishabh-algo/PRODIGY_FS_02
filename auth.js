router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json('Invalid credentials');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json('Invalid credentials');
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;