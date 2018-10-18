const db = require('../models');

exports.getSeasonsPlayed = async (req,res,next) => {
  try {
    const account = await db.Account.findOne({
      where: { 
        bnet: req.params.bnet,
        user_id: req.user.id
      }
    });
    if (!account) return res.send({error: 'Invalid account credentials'});
    const accseason = await db.AccountSeason.findAll({
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
    const account = await db.Account.findOne({
      where: { 
        bnet: req.body.bnet,
        user_id: req.user.id
      }
    });
    if (!account) return res.send({error: 'Invalid account credentials'});
    const season = await db.Season.findOne({
      where: { 
        id: req.body.seasonid
      }
    });
    if (!season) return res.send({error: 'Season does not exist'});
    let accseason = await db.AccountSeason.findOne({
      where: {
        account_id: account.id,
        season_id: season.id
      }
    });
    if (accseason) return  res.send({error: 'The account has already connection with this season'});
    accseason = await db.AccountSeason.create({
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

exports.updateSeasonsPlayed = async (req,res,next) => {
  try{
    const accseason = await db.AccountSeason.findOne({
      where: {
        id: req.body.accseason_id
      }
    })
    if (!accseason) return res.send({error: 'AccSeason not found'});
    const account = await db.Account.findOne({
      where: {
        user_id: req.user.id,
        id: accseason.account_id
      }
    })
    if (!account) return res.send({error: 'User not allowed to access to Accseason'});
    const exist = await db.AccountSeason.findOne({
      where: {
        account_id: account.id,
        season_id: req.body.season_id
      }
    });
    if (exist) return  res.send({error: 'The account has already connection with this season'});

    const result = await accseason.update({
      season_id: req.body.season_id,
      posIni: req.body.posIni,
      posLast: req.body.posLast,
      posMin: req.body.posMin,
      posMax: req.body.posMax
    });
    if (!result) return (res.send({error: 'AccSeason not updated'}));
    res.send({update: 'AccSeason has been updated'});
  } catch (e){
    console.error('updateSeasonsPlayed: error');
    res.send(e);
  }
}

exports.deleteSeasonsPlayed = async (req,res,next) => {
  try{
    const accseason = await db.AccountSeason.findOne({
      where: {
        id: req.body.accseason_id
      }
    })
    if (!accseason) return res.send({error: 'AccSeason not found'});
    const allowed = await db.Account.findOne({
      where: {
        user_id: req.user.id,
        id: accseason.account_id
      }
    })
    if (!allowed) return res.send({error: 'User not allowed to access to Accseason'})
    const result = await accseason.destroy();
    if (!result) return res.send({error: 'Error deleting AccSeason'});
    res.send({delete: 'AccSeason has been deleted'});
  } catch (e){
    console.error('deleteSeasonsPlayed: error');
    res.send(e);
  }
}

