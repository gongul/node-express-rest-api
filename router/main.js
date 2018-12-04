const crypto = require("../utils/crypto.js");
const Errors = require("../errors/errors.js");

module.exports = (app,fs,connection) => {
  // const oauth = require("./oauth.js")(app,passport);
  const comment = require("./comments.js")(app,connection);
  
  app.get('/',(req,res,next) => {
    const data = {
      "server" : "rest api server",
      "version" : "v0.1"
    }
    
    res.json(data);
  });
  
  app.get('/app',(req,res,next) => {
    const { id } = req.query;
    const clientID = crypto.getClientID();
    const regDate = new Date().toMysqlFormat();
    const insertKey = 'insert into api_key(id,code,reg_date) values (?,?,?)';
  
      
    connection.query(insertKey,[id,clientID,regDate],(err,result) => {
      if(err){
        return next(new Errors.MysqlError(null,err.sql));
      }
      
      res.json({"message":"success","clientID":clientID});
    });
    
    
      
  });
}
