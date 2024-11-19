const jwt = require('jsonwebtoken');
const store = require('../store');

const SECRET_KEY = 'dZkYtVnPqTjFwBsHcGmXlQwJp';

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log("token:", token)
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    console.log("asdasd")
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("decoded:", decoded)
    const user = store.users.find(u => u.id === decoded.id);
    console.log("user:", user)
    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

module.exports = { authMiddleware, SECRET_KEY };