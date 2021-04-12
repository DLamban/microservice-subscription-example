const fs = require("fs");

const readFileSync = filename => fs.readFileSync(filename).toString("utf8");

// Constants
module.exports = {
  database: {
    host: process.env.DATABASE_HOST || "localhost",
    port: process.env.DATABASE_PORT,  
  },
  port: process.env.PORT,
  jwtkey: process.env.JWTKEY
    ? readFileSync(process.env.JWTKEY)
    : null
};
