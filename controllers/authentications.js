const User       = require('../models/user');
const jwt        = require('jsonwebtoken');
const { secret } = require('../config/environment');

function authenticationsRegister(req, res){
  User
    .create(req.body)
    .then(user => {

      const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1hr' });

      return res.status(201).json({
        message: `Welcome ${user.firstName}!`,
        user,
        token
      });
    })
    .catch(() => res.status(500).json({ message: 'Something went wrong.' }));
}

function authenticationsLogin(req, res){
  User
    .findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) res.status(401).json({ message: 'Unauthorized.' });

      const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1hr' });

      return res.status(200).json({
        message: 'Welcome back.',
        user,
        token
      });
    })
    .catch(() => res.status(500).json({ message: 'Something went wrong.' }));
}

module.exports = {
  register: authenticationsRegister,
  login: authenticationsLogin
};
