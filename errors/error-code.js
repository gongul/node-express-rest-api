const ErrorCode = {
   BAD_REQUEST: {
    MESSAGE: "Bad Request.",
    CODE: 400
  },
  UNAUTHRIZED: {
    MESSAGE: "Unauthorized.",
    CODE: 401
  },
  SEVER_ERROR: {
    MESSAGE: "Internal Server Error.",
    CODE: 500
  }
};

module.exports = ErrorCode;