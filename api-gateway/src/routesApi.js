const express = require("express");

var router = express.Router();
const fetch = require('node-fetch');

const { jwtkey } = require('./config');
var jwt = require('jsonwebtoken')
function getCommonFetchHeaders(req) {
  return {
    'Authorization': req.headers['authorization'],
    'Content-Type': 'application/json'
  }
}

router.get("/prueba", function (req, res, next) {
  fetch('http://subscription-microservice:4001/healthz', {
    method: 'GET',
    headers: getCommonFetchHeaders(req),
  })
    .then(response => {
      if (response.status !== 400) {
        res.status(response.status);
      }
      return response.json();
    })
    .then(result => { res.send(result) })
    .catch(err => { next(err) });
});

router.post("/subscribe", function (req, res, next) {
  console.log(JSON.stringify(req.body));
  res.send(JSON.stringify(req.body));
  // fetch('http://subscription-microservice:4001/subscribeUser', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': req.headers['authorization'],
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(req.body)
  // })
  //   .then(response => {
  //     if (response.status !== 400) {
  //       res.status(response.status);
  //     }
  //     return response.json();
  //   })
  //   .then(result => {
  //     res.send(result)
  //   })
  //   .catch(err => {
  //     next(err);
  //   });
});

router.get("/getAllSubscriptions", function (req, res, next) {
  fetch('http://subscription-microservice:4001/getAllSubscriptions', {
    method: 'POST',
    headers: {
      'Authorization': req.headers['authorization'],
      'Content-Type': 'application/json'
    },    
  })
    .then(response => {
      if (response.status !== 400) {
        res.status(response.status);
      }
      return response.json();
    })
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      next(err);
    });
});

router.get("/role", function (req, res, next) {
  fetch('http://subscription-microservice:4001/testing', {
    method: 'GET',
    headers: getCommonFetchHeaders(req),
  })
    .then(response => {
      if (response.status !== 400) {
        res.status(response.status);
      }
      return response.json();
    })
    .then(result => { res.send(result) })
    .catch(err => { next(err) });
});

router.get("/getUserToken", function (req, res, next) {
  const payload = {
    check: true,
    role: "user"
  };
  const token = jwt.sign(payload, jwtkey, {
    expiresIn: 1440
  });
  res.json({
    message: 'Successfull authorization',
    token: token
  });
});

router.get("/getAdminToken", function (req, res, next) {
  const payload = {
    check: true,
    role: "admin"
  };
  const token = jwt.sign(payload, jwtkey, {
    expiresIn: 1440
  });
  res.json({
    message: 'Successfull authorization',
    token: token
  });
});

module.exports = router;