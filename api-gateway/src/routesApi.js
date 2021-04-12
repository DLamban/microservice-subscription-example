const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {jwtkey} = require('./config')

console.log(jwtkey);

var tokenitor = jwt.sign({
  data: 'foobar'
}, jwtkey, { expiresIn: 60 * 60 });
console.log(tokenitor);


router.get('/', function(req, res) {
  res.send('Birds home page');
});

router.post('/authenticateAdmin',function(req,res){
  res.send("ok");
})

router.get('/about', function(req, res) {
  res.send('About birds');
});
module.exports = router;