const express = require("express");
const helmet = require("helmet");
const cors = require('cors');
const http = require("http");
const https = require("https");
const connection = require("../config/database.js");
const bodyParser = require("body-parser");
const session = require("express-session");
const fs = require("fs");
// const passport = require("passport");
const exception = require("../interceptor/exception.js");
const auth = require("../interceptor/authentication.js");
const xssFilter = require("../interceptor/xss-filter.js");
require("../config/init.js");

const allowedOrigins = ['http://sododook.herokuapp.com',
                      'http://sododook.com','http://loalhost:3000'];
const _PORT = 80;
const _SSL_PORT = 443
const _TEST_PORT = process.env.PORT || 3000;
const _HOST =  process.env.HOST || '0.0.0.0';

const app = express();
// const options = {
//   key: fs.readFileSync(`${__dirname}/../ssl/privkey1.pem`),
//   cert: fs.readFileSync(`${__dirname}/../ssl/fullchain1.pem`)
// };

app.set('views', __dirname+'/../src/views');
app.set('view engine','ejs');
app.engine('html', require("ejs").renderFile);

// https.createServer(options, app).listen(443,() => {console.log("https run")});
http.createServer(app,(req,res) => {
  // res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  // res.end();
}).listen(_TEST_PORT,_HOST,() =>{console.log("http run")})

app.use(helmet());
app.use(helmet.xssFilter());
// app.use(cors({
//   origin: (origin, callback) => {
//     // allow requests with no origin 
//     // (like mobile apps or curl requests)
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){
//       const msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.';
//       return callback(msg, false);
//     }
//     return callback(null, true);
//   }
// }));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
 secret: '@a#2@polo#c@a$3#4$',
 resave: false,
 saveUninitialized: true,
 cookie: { secure: true,httpOnly: true }
}));
app.use(express.static('./public'));
// app.use(passport.initialize());
// app.use(passport.session());
app.disable('x-powered-by');


app.use(auth.isClientID);
app.use('/comments',xssFilter.commentFilter);  

const router = require("../router/main")(app,fs,connection);

// require("../config/passport")(passport,connection);
// const router = require("../router/main")(app,fs,connection,passport);

app.use(exception.mysqlException);
app.use(exception.exception);
