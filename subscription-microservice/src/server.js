var jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
const { jwtkey } = require('./config');

const express = require("express");

const morgan = require("morgan");

// Api
const app = express();

app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const apiRoutes = require("./routesApi");

app.get("/healthz", function (req, res) {
  res.send("I am happy and healthy\n");
});

//Middleware
app.use((req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  let token = '';
  
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    token = bearer[1];
  } else {
    res.status(401);
    return res.json({ error: 'Auth error',message:"missing token" });
  }

  jwt.verify(token, jwtkey, (err, decoded) => {
    if (err) {
      res.status(401);
      return res.json({ error: 'Auth error', message: err });
    } else {
      next();
    }
  });
})


app.use("/", apiRoutes);




module.exports = app;
