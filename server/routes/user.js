const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching users', error });
    }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send('User not found');
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching user', error });
    }
});

// Create a new user
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const result = await User.create({
        name: name,
        email: email,
        password: hashedPassword
      });
  
      const token = jwt.sign({ email: result.email, id: result._id }, process.env.JSON_WEB_TOKEN_SECRET_KEY);
  
      res.status(200).json({
        result: result,
        token: token
      });
  
    } catch (error) {
      console.error("Error creating user:", error); // Log the error for debugging
      res.status(500).json({ message: 'Error creating user', error: error.message });
    }
  });

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    
    try {
      // Check if user exists
      const user = await User.findOne({ email:email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate a JWT token for the user
      const token = jwt.sign({ email: user.email, id: user._id }, process.env.JSON_WEB_TOKEN_SECRET_KEY);
  
      // Send response with user data and token
      res.status(200).json({
        result: user,
        token: token
      });
      
    } catch (error) {
      console.error("Error signing in user:", error); // Log the error for debugging
      res.status(500).json({ message: 'Error signing in user', error: error.message });
    }
  });
// Update a user by ID
router.put('/:id', async (req, res) => {
  const { name, email, password ,userId} = req.body;

  try {
    const userExist = await User.findById(req.params.id);
    if (!userExist) return res.status(404).send('User not found');

    const updateData = {
      name: name || userExist.name,
      email: email || userExist.email
    };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.send(user);
  } catch (error) {
    res.status(500).send({ message: 'Error updating user', error });
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).send('User not found');
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: 'Error deleting user', error });
    }
});

module.exports = router;