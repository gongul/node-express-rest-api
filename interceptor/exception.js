const Errors = require('../errors/errors.js');

const exception = (err, req, res, next)  => {
  if(err instanceof Errors.ErrorFrame){
    return res.status(err.status).json({ message: err.message, status : err.status });
  }
  
  res.status(500).json({message:"Unknown error Please contact the administrator.",status:500});
}


const mysqlException = (err, req, res, next)  => {
  if (err instanceof Errors.MysqlError) {
    res.status(400).json({
      status: err.status,
      message: err.message
    });
    
    console.log("mysql exception: "+err.sql);
    return;
  }

  next(err);
}

exports.exception = exception;
exports.mysqlException = mysqlException;