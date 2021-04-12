// simple node web server that displays hello world
// optimized for Docker image
var jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
const { jwtkey } = require('./config');
const authorize = require('./authorize')
const express = require("express");
// this example uses express web framework so we know what longer build times
// do and how Dockerfile layer ordering matters. If you mess up Dockerfile ordering
// you'll see long build times on every code change + build. If done correctly,
// code changes should be only a few seconds to build locally due to build cache.

const morgan = require("morgan");
// morgan provides easy logging for express, and by default it logs to stdout
// which is a best practice in Docker. Friends don't let friends code their apps to
// do app logging to files in containers.

const database = require("./database");

// Api
const app = express();

app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const requiredFields = ['email','birthdate','agreement','newsletterId'];

function validateSubscriptionFields(body){
  
  for(const fieldName of requiredFields){
    if (!body[fieldName]) return false;
  }
  
  return true;
  
}
app.use((req,res,next)=>{
  const bearerHeader = req.headers['authorization'];
  let token = '';
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    token = bearer[1];
  }

  if (token) {
    jwt.verify(token, jwtkey, (err, decoded) => {
      if (err) {
        res.status(401);
        return res.json({ error: 'Incorrect token' });
      } else {
        next();
      }
    });
  } else {
    res.status(401);
    res.send({
      error: 'Incorrect token'
    });
  }
})

// app.get("/verifyToken", function (req, res, next) {
  
//   const bearerHeader = req.headers['authorization'];
//   let token = '';
//   if (bearerHeader) {
//     const bearer = bearerHeader.split(' ');
//     token = bearer[1];
//   }

//   if (token) {
//     jwt.verify(token, jwtkey, (err, decoded) => {
//       if (err) {
//         res.statusCode(401);
//         return res.json({ mensaje: 'Token inválida' });
//       } else {
//         res.send('gud token');
//         next();
//       }
//     });
//   } else {
//     res.send({
//       mensaje: 'Token no proveída.'
//     });
//   }
// });






// app.get("/getToken", function (req, res, next) {
//   const payload = {
//     check: true
//   };
//   const token = jwt.sign(payload, jwtkey, {
//     expiresIn: 1440
//   });
//   res.json({
//     mensaje: 'Autenticación correcta',
//     token: token
//   });
// });

app.post("/subscribeUser",authorize("user"), function (req, res) {
  if (validateSubscriptionFields(req.body)) {
    res.send(req.body);
  }
    res.send({'error':'faltan '});
})

app.get("/healthz", function (req, res) {
  // do app logic here to determine if app is truly healthy
  // you should return 200 if healthy, and anything else will fail
  // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
  res.send("I am happy and healthy\n");
});

module.exports = app;
