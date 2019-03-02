const jwt = require('jsonwebtoken');
const secret = require('../_secrets').jwtSecret;

module.exports = {
  authenticate,
};

//********** AUTHENTICATE MIDDLEWARE ************/
function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'Invalid token' });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({
      message: 'No token provided, must be set on the Authorization Header',
    });
  }
}
