const db = require('../models');

exports.getAccounts = (req,res,next) => {
  db.Account.findAll({
    where: { user_id: req.user.id }
  }).then( account => {
    res.send(account);
  }).catch( e => {
    res.send({error: e});
  });
};

exports.addAccount = (req,res,next) => {
  db.Account.create({
    bnet: req.body.bnet,
    user_id: req.user.id
  }).then( account =>{
    res.send(account);
  }).catch( e => {
    res.send({error: e.errors[0].message})
  });
};

exports.updateAccount = async (req,res,next) => {
  try{
    const account = await db.Account.findOne({
      where: {
        id: req.body.account_id
      }
    })
    if (!account) return res.send({error: 'Account not found'});
    if (account.user_id != req.user.id) return res.send({error: 'User has not rights over account'})
    const result = await account.update({
      bnet: req.body.bnet
    });
    res.send(result);


  } catch (e) {
    console.error('updateAccount: error');
    res.send(e);
  }
}

exports.deleteAccount = async (req,res,next) => {
  try{
    const account = await db.Account.findOne({
      where: {
        id: req.body.account_id
      }
    })
    if (!account) return res.send({error: 'Account not found'});
    if (account.user_id != req.user.id) return res.send({error: 'User has not rights over account'});
    const result = await account.destroy();
    if(!result) return res.send({error: 'Error deleting account'});
    res.send({delete: 'Account has been deleted'});
  } catch (e){
    console.error('deleteAccount: error');
    res.send(e);
  }
}