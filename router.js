const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});


module.exports = app => {
  app.get('/',(req,res,next)=>{res.send({hola:'hola'})});
  app.get('/auth',requireAuth, (req,res,next)=>{res.send({hola:'hola!!!!'})});
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
};