const fs = require("fs");

const readFileSync = filename => fs.readFileSync(filename).toString("utf8");

// Constants
module.exports = {
  database: {
    host: process.env.DATABASE_HOST || "localhost",
    port: process.env.DATABASE_PORT,
    password: process.env.DATABASE_PASSWORD
      ? readFileSync(process.env.DATABASE_PASSWORD)
      : null
  },
  port: process.env.PORT,
  jwtkey: process.env.JWT_MASTER_KEY
    ? readFileSync(process.env.JWT_MASTER_KEY)
    : null,
};
