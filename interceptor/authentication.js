const connection = require("../config/database.js");
const Errors = require("../errors/errors.js");

const isClientID = (req,res,next) => {
  const clientID = req.body.clientId || req.query.clientId;
  const _ = require('underscore')
  const nonSecurePaths = ['/app','/','/oauth/facebook/callback', '/success','/oauth/naver/callback'];


  if ( _.contains(nonSecurePaths, req._parsedUrl.pathname) ){
    return next();
  } 
  
  if(clientID == null){
    return next(new Errors.UnauthrizedError());
  }

  const s_clientID = 'select code from api_key where code = ? limit 1';
  connection.query(s_clientID,[clientID],(err,result) => {
    if(err){
      return next(new Errors.MysqlError("Bad Request",err.sql));
    }
    
    if(result == null || result[0].code != clientID){
      return next(new Errors.UnauthrizedError());
    }
    
    next();
  });
  

}

exports.isClientID = isClientID;