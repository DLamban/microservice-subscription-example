var jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
const { jwtkey } = require('./config');

const express = require("express");

const morgan = require("morgan");

const database = require("./database");

// Api
const app = express();

app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const apiRoutes = require("./routesApi");


// Middleware
// app.use((req, res, next) => {
//   const bearerHeader = req.headers['authorization'];
//   let token = '';
//   if (bearerHeader) {
//     const bearer = bearerHeader.split(' ');
//     token = bearer[1];
//   }

//   if (token) {
//     jwt.verify(token, jwtkey, (err, decoded) => {
//       if (err) {
//         res.status(401);
//         return res.json({ error: 'Incorrect token' });
//       } else {
//         next();
//       }
//     });
//   } else {
//     res.status(401);
//     res.send({
//       error: 'Incorrect token'
//     });
//   }
// })


app.use("/", apiRoutes);

app.get("/healthz", function (req, res) {
  // do app logic here to determine if app is truly healthy
  // you should return 200 if healthy, and anything else will fail
  // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
  res.send("I am happy and healthy\n");
});

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



module.exports = app;
