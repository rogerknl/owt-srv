const db = require('../models');

exports.getMatches = async (req, res, next) => {
  try {
    const accountseason = await db.AccountSeason.findOne({
      where: { 
        id: req.params.accseason_id
      }
    });
    if (!accountseason) return res.send({error: 'Does not exist relation between Account&Season'});
    const account = await db.Account.findOne({
      where: { 
        id: accountseason.account_id,
        user_id: req.user.id
      }
    });
    if (!account) return res.send({error: 'Invalid account credentials'});
    const matches = await db.Match.findAll({
      where: {
        accSea_id: accountseason.id
      }
    })
    res.send({matches});
  }catch (e){
    console.error('getMatches: error');
    res.send(e);
  }
};

exports.addMatch = async (req, res, next) => {
  try {
    const accountseason = await db.AccountSeason.findOne({
      where: { 
        id: req.body.accseason_id
      }
    });
    if (!accountseason) return res.send({error: 'Does not exist relation between Account&Season'});
    const account = await db.Account.findOne({
      where: { 
        id: accountseason.account_id,
        user_id: req.user.id
      }
    });
    if (!account) return res.send({error: 'Invalid account credentials'});
    const match = await db.Match.create({
      accSea_id: accountseason.id,
      timestamp: req.body.timestamp,
      duration: req.body.duration,
      victory: req.body.victory,
      vod: req.body.vod,
    });
    res.send({match});
  }catch (e){
    console.error('addMatch: error');
    res.send(e);
  }
};
exports.deleteMatch = async (req, res, next) => {
  try {
    const match = await db.Match.findOne({
      where: {
        id: req.body.match_id
      }
    })
    if(!match) return res.send({error: 'Match does not exist'}); 
    const accountseason = await db.AccountSeason.findOne({
      where: { 
        id: match.accSea_id
      }
    });
    if (!accountseason) return res.send({error: 'Does not exist relation between Account&Season'});
    const account = await db.Account.findOne({
      where: { 
        id: accountseason.account_id,
        user_id: req.user.id
      }
    });
    if (!account) return res.send({error: 'Invalid account credentials'});
    const result = await match.destroy();
    if (!result) return res.send({error: 'Error deleting match'});
    res.send({delete: 'Match has been deleted'});
  }catch (e){
    console.error('addMatch: error');
    res.send(e);
  }
};

exports.updateMatch = async (req, res, next) => {
  try {
    const match = await db.Match.findOne({
      where: {
        id: req.body.id
      }
    })
    if(!match) return res.send({error: 'Match does not exist'}); 
    const accountseason = await db.AccountSeason.findOne({
      where: { 
        id: match.accSea_id
      }
    });
    if (!accountseason) return res.send({error: 'Does not exist relation between Account&Season'});
    const account = await db.Account.findOne({
      where: { 
        id: accountseason.account_id,
        user_id: req.user.id
      }
    });
    if (!account) return res.send({error: 'Invalid account credentials'});
    const result = await match.update({
      accSea_id: req.body.accseason_id,
      timestamp: req.body.timestamp,
      duration: req.body.duration,
      victory: req.body.victory,
      vod: req.body.vod,
    });
    res.send({result});
  }catch (e){
    console.error('addMatch: error');
    res.send(e);
  }
};



exports.getHeroStats = async (req,res,next) =>{
  try{
    const checkAuth = await db.Account.findOne({
      where: {
        user_id: req.user.id
      },
      include:[{
        model: db.AccountSeason,
        include: [{
          model: db.Match,
          where: {
            id: req.params.matchid
          }
        }]
      }]
    })
    if(!checkAuth) return res.send({error: 'Unauthorized'});

    const hstats = await db.HeroStats.findAll({
      where: {
        match_id: req.params.matchid
      }
    })
    res.send({hstats});

  } catch (e){
    console.error('getHeroStats: error');
    res.send(e);
  }
};

exports.addHeroStats = async (req,res,next) => {
  try{
    const checkAuth = await db.Account.findOne({
      where: {
        user_id: req.user.id
      },
      include:[{
        model: db.AccountSeason,
        include: [{
          model: db.Match,
          where: {
            id: req.body.match_id
          }
        }]
      }]
    })
    if(!checkAuth) return res.send({error: 'Unauthorized'});
    const hstat = await db.HeroStats.create({
      match_id: req.body.match_id,
      duration: req.body.duration,
      hero: req.body.hero,
      elim: req.body.elim,
      aObj: req.body.aObj,
      tobj: req.body.tobj,
      dmg: req.body.dmg,
      healing: req.body.healing,
      deaths: req.body.deaths,
      sFirst: req.body.sFirst,
      sSecond: req.body.sSecond,
      sThird: req.body.sThird,
      sForth: req.body.sForth,
      sFifth: req.body.sFifth
    });
    res.send(hstat);
  } catch (e) {
    console.error('addHeroStats: error');
    res.send(e);
  }
};

exports.deleteHeroStats = async (req,res,next) => {
  try{
    const hstat = await db.HeroStats.findOne({
      where: { id: req.body.hstats_id}
    });
    if(!hstat) return res.send({error: 'HeroStats not exist'}); 

    const checkAuth = await db.Account.findOne({
      where: {
        user_id: req.user.id
      },
      include:[{
        model: db.AccountSeason,
        include: [{
          model: db.Match,
          where: {
            id: hstat.match_id
          }
        }]
      }]
    })
    if(!checkAuth) return res.send({error: 'Unauthorized'});  
    const result = await hstat.destroy();
    if (!result) return res.send({error: 'Error deleting stats'});
    res.send({delete: 'done'});
  } catch (e) {
    console.error('deleteHeroStats: error');
    res.send(e);
  }
};

exports.updateHeroStats = async (req,res,next) => {
  try{
    const hstat = await db.HeroStats.findOne({
      where: { id: req.body. id}
    });
    if(!hstat) return res.send({error: 'HeroStats not exist'}); 
    const checkAuth = await db.Account.findOne({
      where: {
        user_id: req.user.id
      },
      include:[{
        model: db.AccountSeason,
        include: [{
          model: db.Match,
          where: {
            id: hstat.match_id
          }
        }]
      }]
    })
    if(!checkAuth) return res.send({error: 'Unauthorized'});  
    const result = await hstat.update({
      match_id: req.body.match_id,
      duration: req.body.duration,
      hero: req.body.hero,
      elim: req.body.elim,
      aObj: req.body.aObj,
      tobj: req.body.tobj,
      dmg: req.body.dmg,
      healing: req.body.healing,
      deaths: req.body.deaths, 
      sFirst: req.body.sFirst,
      sSecond: req.body.sSecond,
      sThird: req.body.sThird,
      sForth: req.body.sForth,
      sFifth: req.body.sFifth
    });
    if (!result) return res.send({error: 'Error deleting stats'});
    res.send({Update: 'done'});
    res.send(hstat);
  } catch (e) {
    console.error('updateHeroStats: error');
    res.send(e);
  }
};