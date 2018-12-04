const ip = require("../utils/ip.js");
const Errors = require("../errors/errors.js");

module.exports = (app,connection) => {
  app.get('/test',(req,res) => {
    res.json({"test":"test"});
  });
  
  app.get('/comments',(req,res,next) => {
    const page = parseInt(req.query.page) || 1;
    const number = parseInt(req.query.number) || 10;
    const sort = req.query.sort || "desc";
    const start = number * (page-1);

    const getAllComments = `select idx,contents,name,reg_date from comments order by idx ${sort} limit ?,?`;
    connection.query(getAllComments, [start,number],(err, result) => {
      if(err){
        return next(new Errors.MysqlError(null,err.sql));
      }
      console.log(result);
      res.json(result);
    });
  });
  
  app.post('/comments',(req,res,next) => {
    const {id,name,contents} = req.body;
    const userIp = ip.getUserIp(req);
    const regDate = new Date().toMysqlFormat();
    const postComment = 'insert into comments(id,name,contents,reg_date,ipv4) values(?,?,?,?,?)';
    
    connection.query(postComment,[id,name,contents,regDate,userIp],(err,result) => {
      if(err){
        console.log(err);
        return next(new Errors.MysqlError(null,err.sql));
      }
      
      res.json({"message":"success write your comment"})
    })
  })
  
}