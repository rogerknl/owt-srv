const Authentication = require('./controllers/authentication');
const AccSeason = require('./controllers/accseason');
const Account = require('./controllers/account');
const Season = require('./controllers/season');
const Match = require('./controllers/match');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});


module.exports = app => {
  app.get('/seasons',requireAuth, Season.getSeasons);
  
  //accounts
  app.get('/accounts', requireAuth, Account.getAccounts);
  app.post('/account', requireAuth, Account.addAccount);
  app.put('/account', requireAuth, Account.updateAccount);
  app.delete('/account', requireAuth, Account.deleteAccount);

  //Accounts+Season
  app.get('/accseason/:bnet',requireAuth, AccSeason.getSeasonsPlayed );
  app.post('/accseason',requireAuth, AccSeason.addSeasonsPlayed );
  app.put('/accseason',requireAuth, AccSeason.updateSeasonsPlayed );
  app.delete('/accseason',requireAuth, AccSeason.deleteSeasonsPlayed );


  //Match
  app.get('/matches/:accseason_id', requireAuth, Match.getMatches );
  app.post('/matches', requireAuth, Match.addMatch );
  app.put('/matches', requireAuth, Match.updateMatch);
  app.delete('/matches', requireAuth, Match.deleteMatch);


  //heroStats
  app.get('/herostats/:matchid', requireAuth, Match.getHeroStats);
  app.post('/herostats', requireAuth, Match.addHeroStats);
  app.put('/herostats', requireAuth, Match.updateHeroStats);
  app.delete('/herostats', requireAuth, Match.deleteHeroStats);


  //auth
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);




};