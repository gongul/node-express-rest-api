const crypto = require("crypto");

exports.getClientID = () => {
  const date = new Date;
  
  return 'm' + (Math.random() * date.getTime() * (1 << 30)).toString(16).replace('.', '');
}