const mysql = require("mysql");
const mysqlInit = require("./database-init.js");

const dbConfig = {
  host     : mysqlInit.host,
  user     : mysqlInit.user,
  password : mysqlInit.password,
  port     : mysqlInit.port,
  database : mysqlInit.database,
  connectionLimit : mysqlInit.connectionLimit,
}

const pool = mysql.createPool(dbConfig);

const database = (() => {
  const _query = (query,params,callback) => {
    pool.getConnection((err, connection) =>{
      if(err){
        connection.release();
        return callback(err,null);
      }
      
      connection.query(query,params,(err,result) => {
        connection.release();
        if(err){
          callback(err,null);
        }else{
          callback(err,result); 
        }
      })
    });
  }
  
  return {
    query: _query
  };
 
})();

module.exports = database;


/*
이 방식도 있다
const database = {
  query: (query,params,callback) => {
    pool.getConnection((err, connection) =>{
      if(err){
        return callback(err,null);
      }
      
      connection.query(query,params,(err,result) => {
        if(err){
          callback(err,null);
        }else{
          callback(err,result); 
        }
      })
    });
  }
};
*/