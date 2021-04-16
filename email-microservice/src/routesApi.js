const express = require("express");
const authorize = require("./authorize");

const router = express.Router();

const database = require("./database");

function checkEmail(email, done) {
  return database("subscriptions").select("*").where("email", email)
    .then(function (rows) {
      console.log(rows);
      if (rows.length == 0) { return done(Error("Email does not exists")) }
      return done(null, { success: true, message: "Email exists, sending to id: " + rows[0].id });
    })
}

/**
 * @swagger
 *
 * /sendEmail:
 *   post:
 *     produces:
 *       - application/json
 */
router.post("/sendEmail",
  authorize("admin"),
  function (req, res) {
    if (!req.body.email) { res.status(400).send({ error: "Missing email parameter" }) }
    checkEmail(req.body.email, (err, result) => {
      if (err)
        res.status(404).send({ error: "Email does not exists" });
      else
        console.log(result);
      res.send(result);
    })

  })

module.exports = router;
