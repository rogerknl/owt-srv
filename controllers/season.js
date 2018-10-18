const db = require('../models');

exports.getSeasons = async (req, res, next) => {
  try{
    const seasons = await db.Season.findAll();
    res.send(seasons);

  } catch (e){
    console.error('updateAccount: error');
    res.send(e);
  }
};