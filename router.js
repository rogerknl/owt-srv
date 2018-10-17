const Authentication = require('./controllers/authentication');
const AccSeason = require('./controllers/accseason');
const Match = require('./controllers/match');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});


module.exports = app => {
  app.get('/',(req,res,next)=>{res.send({hola:'hola'})});
  
  //accounts
  app.get('/accounts', requireAuth, AccSeason.getAccounts);
  app.post('/account', requireAuth, AccSeason.addAccount);

  //Accounts+Season
  app.get('/accseason/:bnet',requireAuth, AccSeason.getSeasonsPlayed )
  app.post('/accseason',requireAuth, AccSeason.addSeasonsPlayed )

  //Match
  app.get('/matches/:accseason_id', requireAuth, Match.getMatches );


  //auth
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);




};