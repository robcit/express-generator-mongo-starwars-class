var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Star Wars Quotes' });
});

/*
IN JS: 3 ways to create a function
function() {}
() => {}
() => ...
*/

/* POST a form submission */
router.post('/', (req, res) => {
  console.log(req.body);
  res.render('index', {title: 'Form posted'});
});

module.exports = router;