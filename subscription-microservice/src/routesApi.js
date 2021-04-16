const express = require("express");
const authorize = require("./authorize");
const database = require("./database");

const router = express.Router();


const requiredFields = ["email", "birth", "newsletterId", "agreement"];
function validateSubscriptionFields(body) {
  for (const fieldName of requiredFields) {
    if (!body[fieldName]) return false;
  }
  return true;
}
/**  Helpers used to db access */
function InsertIntoDB(table, values) {
  return database(table).insert(values)
    .then(function () {      
      return ({ success: true, message: "Subscribed email:  " + values.email });
    }).catch(err => { return {success:false, message:err }});
}

function RemoveFromDB(table, email) {
  return database(table).del().where("email", email)
    .then(function () {
      return ({ success: true, message: "Deleted!" });
    }).catch(err => { return err });
}

/**
 * @swagger
 *
 * /getAllSubscriptions:
 *   get:
 *     summary: Retrieve all subscriptions
 *     description:  Retrieve all subscriptions, require admin rights
 */
router.get("/getAllSubscriptions",
 authorize("admin"), 
function (req, res, next) {
  database.from("subscriptions").select("*").then((rows) => {
    res.json(rows);
    next(res);
  }).catch((err) => {
    res.status = err.status;
    next(err);
  })
});

/**
 * @swagger
 *
 * /getDetailsSubscription:
 *   get:
 *     summary: Retrieve subscription details
 *     description:  Retrieve subscription details
 */
router.post("/getDetailsSubscriptions",
  //authorize("admin"), 
  function (req, res, next) {
    if (!req.body.email) res.status(400).send({ "error": "missing required fields" });
    database.from("subscriptions").select("*").where("email", req.body.email).then((rows) => {
      res.json({ success: true, info: rows });
      next(res);
    }).catch((err) => {
      res.status = err.status;
      next(err);
    })
  });

/**
 * @swagger
 *
 * /cancelSubscription:
 *   post:
 *     summary: Cancel subscription
 *     description:  Cancel bscription by email
 *   produces:
 *     - application/json
 */
router.post("/cancelSubscription",
  function (req, res) {
    if (!req.body.email) res.status(400).send({ "error": "missing required fields" });
    RemoveFromDB("subscriptions", req.body.email).then(delRes =>
      res.send(delRes)
    ).catch(err => {
      res.status(500).send(err);
    });
  });
  
/**
 * @swagger
 *
 * /subscribeUser:
 *   post:
 *     produces:
 *       - application/json
 */
router.post("/subscribeUser", 
  function (req, res) {
    if (validateSubscriptionFields(req.body)) {
      InsertIntoDB("subscriptions", req.body).then(insertRes =>
        {
        if (insertRes.success == false){
          res.status(400).send(insertRes);
        }else{
          res.send(insertRes)}
        }        
      ).catch(err => {        
        res.status(500).send(err);
      });
    }
    else {
      res.status(400).send({ "error": "missing required fields" });
    }
  })

module.exports = router;