exports.getUserIp = (req) => {
  let ip;
  
  if(!!req.hasOwnProperty('sessionID')){
    ip = req.headers['x-forwarded-for'];
  } else{
    ip = req.headers['x-forwarded-for'].split(',').pop()
  }
  
  if(ip == null || ip == undefined){
     ip = req.connection.remoteAddress || 
       req.socket.remoteAddress || 
       req.connection.socket.remoteAddress;
  }
  
  return ip;
}
