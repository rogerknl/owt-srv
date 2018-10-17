const Accounts = require('../models').Account
const Seasons = require('../models').Season
const AccountSeason = require('../models').AccountSeason

exports.getAccounts = (req,res,next) => {
  Accounts.findAll({
    where: { user_id: req.user.id }
  }).then( account => {
    res.send(account);
  }).catch( e => {
    res.send({error: e});
  });
};

exports.addAccount = (req,res,next) => {
  Accounts.create({
    bnet: req.body.bnet,
    user_id: req.user.id
  }).then( account =>{
    res.send(account);
  }).catch( e => {
    res.send({error: e.errors[0].message})
  });
};

exports.getSeasonsPlayed = async (req,res,next) => {
  try {
    const account = await Accounts.findOne({
      where: { 
        bnet: req.params.bnet,
        user_id: req.user.id
      }
    });
    if (!account) return res.send({error: 'Invalid account credentials'});
    const accseason = await AccountSeason.findAll({
      where: {
        account_id: account.id
      }
    });
    res.send({accseason});
  }catch (e){
    console.log('error');
    res.send(e);
  }
};

exports.addSeasonsPlayed = async (req,res,next) => {
  try {
    const account = await Accounts.findOne({
      where: { 
        bnet: req.body.bnet,
        user_id: req.user.id
      }
    });
    if (!account) return res.send({error: 'Invalid account credentials'});
    const season = await Seasons.findOne({
      where: { 
        id: req.body.seasonid
      }
    });
    if (!season) return res.send({error: 'Season does not exist'});
    let accseason = await AccountSeason.findOne({
      where: {
        account_id: account.id,
        season_id: season.id
      }
    });
    if (accseason) return  res.send({error: 'The account has already connection with this season'});
    accseason = await AccountSeason.create({
      account_id: account.id,
      season_id: season.id,
      posIni: req.body.posIni,
      posLast: req.body.posLast,
      posMin: req.body.posMin,
      posMax: req.body.posMax
    });
    res.send(accseason);
  }catch (e){
    console.log('error');
    res.send(e);
  }
};


