const express = require("express");
const fetch = require("node-fetch");

const { jwtkey } = require("./config");
var jwt = require("jsonwebtoken")
var router = express.Router();

/**
 * @swagger
 * /getGuestToken:
 *   get:
 *     summary: Retrieve a guest token to authorize api calls
 *     description: Retrieve a guest token to authorize api calls
*/
router.get("/getGuestToken", function (req, res, next) {
  const payload = {
    check: true,
    role: "guest"
  };
  const token = jwt.sign(payload, jwtkey, {
    expiresIn: 1440
  });
  res.json({
    message: "Successfull authorization",
    token: token
  });
});

/**
 * @swagger
 * /getAdminToken:
 *   get:
 *     summary: Retrieve an admin token to authorize api calls
 *     description: Retrieve a token with admin rights
*/
router.get("/getAdminToken", function (req, res, next) {
  const payload = {
    check: true,
    role: "admin"
  };
  const token = jwt.sign(payload, jwtkey, {
    expiresIn: 1440
  });
  res.json({
    message: "Successfull authorization",
    token: token
  });
});

/**
 * @swagger
 *
 * /subscribe:
 *   post:
 *     summary: Subscribe user
 *     description:  Subscribe user, 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         in: formData
 *         required: true
 *         type: string
 *       - name: name
 *         in: formData
 *         required: false
 *         type: string
 *       - name: birthdate
 *         in: formData
 *         required: true
 *         type: date
 *         pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/
 *         example: "2019-05-17"
 *       - name: gender
 *         in: formData
 *         required: false
 *         type: string
 *       - name: agreement
 *         in: formData
 *         required: true
 *         type: boolean
 *       - name: newsletterId
 *         in: formData
 *         required: true
 *         type: integer
 */
router.post("/subscribe", (req, res, next) => {
  fetch("http://subscription-microservice:4001/subscribeUser", {
    method: "POST",
    headers: {
      "Authorization": req.headers["authorization"],
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req.body)
  }).then((response) => {    
    if (response.status != 200) {
      res.status(response.status);
      return response.json().then(json => res.send(json)).catch(err=>next(err));
    } else {
      fetch("http://email-microservice:4002/sendEmail", {
        method: "POST",
        headers: {
          "Authorization": req.headers["authorization"],
          "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body)
      })
      .then(responseEmailServ=>{
        return responseEmailServ.json();
      }).then(resultJson=>res.send(resultJson))      
    }
  })      
});

/**
 * @swagger
 *
 * /cancelSubscription:
 *   post:
 *     summary: cancel subscription
 *     description:  Cancel subscription, requires the email
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         in: formData
 *         required: true
 *         type: string
 */
router.post("/cancelSubscription", function (req, res, next) {
  fetch("http://subscription-microservice:4001/cancelSubscription", {
    method: "POST",
    headers: {
      "Authorization": req.headers["authorization"],
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req.body)
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

/**
 * @swagger
 *
 * /getDetailsSubscription:
 *   post:
 *     summary: Retrieve subscription details
 *     description:  Retrieve subscription details
 */
router.post("/getDetailsSubscription", function (req, res, next) {
  fetch("http://subscription-microservice:4001/getDetailsSubscription", {
    method: "POST",
    headers: {
      "Authorization": req.headers["authorization"],
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req.body)
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

/**
 * @swagger
 * /getAllSubscriptions:
 *   get:
 *     summary: Retrieve all subscriptions
 *     description: Retrieve all subscriptions, requires admin privileges
*/
router.get("/getAllSubscriptions", function (req, res, next) {
  fetch("http://subscription-microservice:4001/getAllSubscriptions", {
    method: "GET",
    headers: {
      "Authorization": req.headers["authorization"],
      "Content-Type": "application/json"
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
    .catch(err => next(err));
});

module.exports = router;
