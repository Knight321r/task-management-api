const jwt = require('jsonwebtoken');
const User = require('../models/User');
const store = require('../store');

const SECRET_KEY = 'dZkYtVnPqTjFwBsHcGmXlQwJp';

class AuthController {
  static async register(req, res) {
    try {
      const { error } = User.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const existingUser = store.users.find(
        u => u.username === req.body.username || u.email === req.body.email
      );

      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const newUser = new User(
        req.body.username, 
        req.body.email, 
        req.body.password
      );

      store.users.push(newUser);
      const token = jwt.sign({ id: newUser.id }, SECRET_KEY, { expiresIn: '1h' });
      
      res.status(201).json({ token, userId: newUser.id });
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
  }

  static async login(req, res) {
    try {
      const user = store.users.find(u => u.username === req.body.username);
      
      if (!user || !user.comparePassword(req.body.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token, userId: user.id });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  }
}

module.exports = AuthController;