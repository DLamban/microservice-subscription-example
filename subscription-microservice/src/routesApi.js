var express = require('express');
var router = express.Router();

const authorize = require('./authorize');
const database = require("./database");

// Helpers
const requiredFields = ['email', 'birth', 'newsletterId', 'agreement'];
function validateSubscriptionFields(body) {
  console.log(body);
  for (const fieldName of requiredFields) {
    console.log(fieldName);
    if (!body[fieldName]) return false;
  }
  return true;
}

function InsertIntoDB(table, values) {
  return database(table).insert(values)
    .then(function (result) {
      return ({ success: true, message: 'Subscribed!' });
    }).catch(err => { return err });
}

function RemoveFromDB(table, email) {
  return database(table).del().where("email", email)
    .then(function (result) {
      return ({ success: true, message: 'Deleted!' });
    }).catch(err => { return err });
}

router.get("/getAllSubscriptions",
 authorize('admin'), 
function (req, res, next) {
  database.from('subscriptions').select('*').then((rows) => {
    res.json(rows);
    next(res);
  }).catch((err) => {
    res.status = err.status;
    next(err);
  })
});

router.post("/getDetailsSubscriptions",
  //authorize('admin'), 
  function (req, res, next) {
    if (!req.body.email) res.status(400).send({ 'error': 'missing required fields' });
    database.from('subscriptions').select('*').where("email", req.body.email).then((rows) => {
      res.json({ success: true, message: rows });
      next(res);
    }).catch((err) => {
      res.status = err.status;
      next(err);
    })
  });

router.post("/cancelSubscription",
  // authorize("guest"), 
  function (req, res) {
    if (!req.body.email) res.status(400).send({ 'error': 'missing required fields' });
    RemoveFromDB('subscriptions', req.body.email).then(delRes =>
      res.send(delRes)
    ).catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
  });

router.post("/subscribeUser",
  // authorize("guest"), 
  function (req, res) {
    if (validateSubscriptionFields(req.body)) {
      InsertIntoDB('subscriptions', req.body).then(insertRes =>
        res.send(insertRes)
      ).catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
    }
    else {
      res.send({ 'error': 'missing required fields' });
    }
  })

module.exports = router;