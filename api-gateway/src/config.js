const fs = require("fs");

const readFileSync = filename => fs.readFileSync(filename).toString("utf8");

// Constants
module.exports = {
  port: process.env.PORT,
  jwtkey: process.env.JWT_MASTER_KEY
    ? readFileSync(process.env.JWT_MASTER_KEY)
    : null,
};
