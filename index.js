// const express = require('express')
// const dotenv = require('dotenv')
// const numcpus = require('node:os').availableParallelism()
// const cluster = require('node:cluster')
// const JwtAuth=require('./Middleware/JwtAuth')
// const router  = require('./Routes/Signup')
// const cors = require('cors')
// const conn = require('./Connection')
// const cookieParser = require('cookie-parser')
// const routerforhome = require('./Routes/Home')
// const LoginRouter = require('./Routes/Login')
// const routerforlogout = require('./Routes/Logout')
// const routerforcookiecheck = require('./Routes/CookieCheck')
// const routeforpasswordrecovery = require('./Routes/PasswordRecovery')
// const routeforpasswordcodevalidation = require('./Routes/PasswordRecoveryCodeValidation')
// const routeforcreatenewpassword = require('./Routes/CreateNewPassword')
// const morgan = require('morgan')
// const routeforpresignedurl = require('./Routes/PreSignedUrl')
// const { connection } = require('./KafkaConnection/KafkaConnection')
// const routeforsignupvalidation = require('./Routes/SignupValidation')
// const routeforresendvalidationcode = require('./Routes/ResendValidationCode')
// dotenv.config()
// const PORT = process.env.PORT ||'8001';


// if(cluster.isPrimary){
//    for(i=0;numcpus>i;i++){
//     cluster.fork();
//    }
   
// }else{
//     const app = express();
//     app.use(cookieParser())
//     app.use(cors({
//         origin: `${process.env.ORIGINURL}`, // Frontend origin
//         credentials: true,
// }));
// // app.use(cors({
// //     origin: 'http://localhost:5173', // Frontend origin
// //     credentials: true,
// // }));
 

// //  conn("mongodb+srv://normalcsgo21:abdullah@musicapp.6okeb.mongodb.net/?retryWrites=true&w=majority&appName=MusicApp")
//  conn(process.env.MONGODBURI) 
// app.use(express.json())
//    connection()
//    app.use(morgan('dev'))
//     app.use('/Signup',router)
//     app.use('/SignupValidation',routeforsignupvalidation)
//     app.use('/PreSignedUrl',routeforpresignedurl)
//     app.use('/home',JwtAuth,routerforhome )
//     app.use('/login',LoginRouter)
//     app.use('/logout',JwtAuth,routerforlogout)
//     app.use('/cookiecheck',routerforcookiecheck)
//     app.use('/passwordrecovery',routeforpasswordrecovery)
//     app.use('/passwordcodevalidation',routeforpasswordcodevalidation)
//     app.use('/createnewpassword',routeforcreatenewpassword)
//     app.use('/ResendValidationCode',routeforresendvalidationcode)
//     app.listen(PORT,()=>{console.log('Listening to Identity Service On Port Number '+PORT)})
// }


const express = require('express');
const dotenv = require('dotenv');
const numcpus = require('node:os').availableParallelism();
const cluster = require('node:cluster');
const JwtAuth = require('./Middleware/JwtAuth');
const router = require('./Routes/Signup');
const cors = require('cors');
const conn = require('./Connection');
const cookieParser = require('cookie-parser');
const routerforhome = require('./Routes/Home');
const LoginRouter = require('./Routes/Login');
const routerforlogout = require('./Routes/Logout');
const routerforcookiecheck = require('./Routes/CookieCheck');
const routeforpasswordrecovery = require('./Routes/PasswordRecovery');
const routeforpasswordcodevalidation = require('./Routes/PasswordRecoveryCodeValidation');
const routeforcreatenewpassword = require('./Routes/CreateNewPassword');
const morgan = require('morgan');
const routeforpresignedurl = require('./Routes/PreSignedUrl');
const { connection } = require('./KafkaConnection/KafkaConnection');
const routeforsignupvalidation = require('./Routes/SignupValidation');
const routeforresendvalidationcode = require('./Routes/ResendValidationCode');
const fs = require('fs');
const https = require('https');

dotenv.config();
const PORT = process.env.PORT || '8001';

if (cluster.isPrimary) {
  for (i = 0; numcpus > i; i++) {
    cluster.fork();
  }
} else {
  const app = express();
  app.use(cookieParser());
  app.use(
    cors({
      origin: `${process.env.ORIGINURL}`, // Frontend origin
      credentials: true,
    })
  );

  conn(process.env.MONGODBURI);
  app.use(express.json());
  connection();
  app.use(morgan('dev'));
  app.use('/Signup', router);
  app.use('/SignupValidation', routeforsignupvalidation);
  app.use('/PreSignedUrl', routeforpresignedurl);
  app.use('/home', JwtAuth, routerforhome);
  app.use('/login', LoginRouter);
  app.use('/logout', JwtAuth, routerforlogout);
  app.use('/cookiecheck', routerforcookiecheck);
  app.use('/passwordrecovery', routeforpasswordrecovery);
  app.use('/passwordcodevalidation', routeforpasswordcodevalidation);
  app.use('/createnewpassword', routeforcreatenewpassword);
  app.use('/ResendValidationCode', routeforresendvalidationcode);

  // Load SSL certificate files (replace with your file paths)
  const privateKey = fs.readFileSync('/path/to/private-key.pem', 'utf8');
  const certificate = fs.readFileSync('/path/to/certificate.pem', 'utf8');
  const ca = fs.readFileSync('/path/to/ca.pem', 'utf8'); // For some certificates, this might be required.

  const credentials = { key: privateKey, cert: certificate, ca: ca };

  // Create an HTTPS server running on port 8001
  https.createServer(credentials, app).listen(8001, () => {
    console.log('HTTPS server is running on port 8001');
  });
}

// Optional: HTTP to HTTPS redirect (if you want to enforce HTTPS)
const http = require('http');

http.createServer((req, res) => {
  res.writeHead(301, { Location: `https://${req.headers.host}:${PORT}${req.url}` });
  res.end();
}).listen(80, () => {
  console.log('HTTP server is redirecting to HTTPS on port 80');
});

