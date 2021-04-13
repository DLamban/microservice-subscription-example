const express = require("express");

const morgan = require("morgan");
const apiRoutes = require("./routesApi");

var bodyParser = require('body-parser')
// Api
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use("/api", apiRoutes);

app.use(morgan("common"));


const swaggerJsdoc = require('swagger-jsdoc');

const swaggerUI = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Public api service',
      version: '1.0.0',
      description:
        'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.'
    },
    servers: [
      {
        url: 'http://localhost:4000/api',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routesApi.js'],
};

const swaggerSpecification = swaggerJsdoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecification));

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
});

app.get("/healthz", function (req, res) {
  res.send("I am happy and healthy\n");
});

module.exports = app;
