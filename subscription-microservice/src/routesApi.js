var express = require('express');
var router = express.Router();

const authorize = require('./authorize');
const database = require("./database");

// Helpers
const requiredFields = ['email', 'birth', 'newsletterId', 'agreement'];
function validateSubscriptionFields(body) {
  for (const fieldName of requiredFields) {
    if (!body[fieldName]) return false;
  }
  return true;
}

router.get("/dbtest", function (req, res, next) {
  database.from('subscriptions').select('*').then((rows) => {
    res.json(rows);
    next(res);
  }).catch((err) => {
    res.status = err.status;
    next(err);
  })
});

router.post("/subscribeUser",
// authorize("user"), 
function (req, res) {
  if (validateSubscriptionFields(req.body)) {
    res.send('okei');
  }
  res.send({ 'error': 'missing required fields' });
})
module.exports = router;