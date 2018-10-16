const User = require('../models').User;
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');


function genPass(res, req, user, next) {
  bcrypt.genSalt(10, (err, salt)=>{
    if (err) { return next(err) }
    
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err) }
      user.password = hash;
      next();
      User.create({
        username: user.username,
        password: user.password,
        nick: user.nick
      });
      res.json({token: tokenForUser(user)})
      
    });
  });
};

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.username, iat: timestamp, nick: user.nick }, process.env.JWT_SECRET );
};

exports.signin = function ( req, res, next ){
  res.json({token: tokenForUser(req.user)});
};


exports.signup = function (req, res, next ) {
  const username = req.body.username;
  const password = req.body.password;
  const nick = req.body.nick;

  if(!username || !password || !nick) {
    return res.status(422).send({ error: 'You must provide username, password and nick'});
  }

  User.findOne({ where: { username: username }})
  .then( user => {
    if (user) { 
      return res.status(422).send({ error: 'Username is already in use'})
    }
    genPass(res, req, {username,password,nick}, next);
  });

};