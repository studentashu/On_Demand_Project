const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    const token = req.header('x-token');
    if (!token) return res.status(400).send('Token Not Found');

    const decoded = jwt.verify(token, 'jwtSecret');
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Invalid token');
  }
};  