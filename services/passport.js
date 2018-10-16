const passport = require('passport');
const User = require('../models').User;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');


function comparePassword ( currentPass, candidatePass, callback ) {
  bcrypt.compare(candidatePass, currentPass, function(err, isMatch){
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
}

//local login
const localOptions = { usernameField: 'username' }
const localLogin = new LocalStrategy( localOptions, function(username, password, done) {
  User.findOne({ where: {username: username} })
    .then( user => {
      if(!user) { return done(null, false)}

      comparePassword( user.password, password, function(err, isMatch ){
        if ( err ) { return done(err) }
        if (!isMatch) { return done(null,false)}
        
        return done(null, user);
      });
  });
});

//jwt

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

const jwtLogin = new JwtStrategy ( jwtOptions, function (payload, done){
  User.findOne({where: {username: payload.sub}})
    .then( user => {
      if( user ){
        done(null, user);
      } else {
        done(mull, false);
      }
    });
});



passport.use(localLogin);
passport.use(jwtLogin);