const { jwtkey } = require('./config');
const jwt = require('express-jwt');


function authorize(role) {
  return [
    // authenticate JWT token and attach user to request object (req.user)
    jwt({ secret:jwtkey, algorithms: ['HS256'] }),

    // authorize based on user role
    (req, res, next) => {    
      console.log();  
      if (role !== req.user.role || req.user.role===null) {
        return res.status(401).json({ message: 'Unauthorized' });        
      } else {
        next();
      }
    }
  ]
}
module.exports = authorize;