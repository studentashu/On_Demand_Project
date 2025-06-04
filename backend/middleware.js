const jwt = require('jsonwebtoken');
const JWT_SECRET = 'jwtSecret'; // replace with your actual secret

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token =
    req.header('x-token') || (authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);

  if (!token) return res.status(401).send('No token provided');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user; // assuming your payload has user
    next();
  } catch (err) {
    return res.status(401).send('Invalid token');
  }
};
