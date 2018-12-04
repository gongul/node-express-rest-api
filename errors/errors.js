const ErrorCode = require("./error-code.js");

class ErrorFrame extends Error {
  constructor(message,status) {
    if (new.target === ErrorFrame)
      throw new TypeError('Abstract class "ExtendableError" cannot be instantiated directly.');
      
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    Error.captureStackTrace(this, this.contructor);
  }
}

class MysqlError extends ErrorFrame{
  constructor(message,sql){
    super(message || ErrorCode.BAD_REQUEST.MESSAGE,ErrorCode.BAD_REQUEST.CODE);
    this.sql = sql;
  }
}

class InternalServerError extends ErrorFrame{
  constructor(message){
    super(message || ErrorCode.SEVER_ERROR.MESSAGE,ErrorCode.SEVER_ERROR.CODE);
  }
}

class UnauthrizedError extends ErrorFrame{
  constructor(message){
    super(message || ErrorCode.UNAUTHRIZED.MESSAGE,ErrorCode.UNAUTHRIZED.CODE);
  }
}


exports.MysqlError = MysqlError;
exports.UnauthrizedError = UnauthrizedError;
exports.InternalServerError = InternalServerError;
exports.ErrorFrame = ErrorFrame;