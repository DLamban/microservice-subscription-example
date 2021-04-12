// simple node web server that displays hello world
// optimized for Docker image

const express = require("express");
// this example uses express web framework so we know what longer build times
// do and how Dockerfile layer ordering matters. If you mess up Dockerfile ordering
// you'll see long build times on every code change + build. If done correctly,
// code changes should be only a few seconds to build locally due to build cache.

const morgan = require("morgan");
const { database } = require("./config");
const apiRoutes = require("./routesApi");
// morgan provides easy logging for express, and by default it logs to stdout
// which is a best practice in Docker. Friends don't let friends code their apps to
// do app logging to files in containers.


// Api
const app = express();
app.use("/api", apiRoutes);
app.use(morgan("common"));
//app.use("/", apiRoutes);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  switch (err.status) {
    case 400:
      res.status(400).send({ error: "Bad request", debug: err })
      break;
    case 401:
      res.status(401).send({ error: "Unauthorized", debug: err })
      break;
    default:
      res.status(500).send({ error: "Internal error", debug: err })
      break;
      
  }
  res.status(500).send('Something broke!');
});

app.get("/healthz", function (req, res) {
  // do app logic here to determine if app is truly healthy
  // you should return 200 if healthy, and anything else will fail
  // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
  res.send("I am happy and healthy\n");
});

module.exports = app;
