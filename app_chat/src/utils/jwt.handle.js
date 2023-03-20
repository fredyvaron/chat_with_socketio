const { sign, verify } = require('jsonwebtoken');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'mysecretKEYOT292-33';

const generateToken = (id, role)=> sign({ id, role }, JWT_SECRET, {
  expiresIn: '1h',
});

const verifyToken = (jwt) => {
  const isOk = verify(jwt, JWT_SECRET);
  return isOk;
};

module.exports = { generateToken, verifyToken };