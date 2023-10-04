var express = require('express');
var router = express.Router();
const dbService = require('services/database');

/* GET home page. */
router.get('/', function(req, res, next) {
  dbService.db.collection('quotes').find().toArray()
  .then((results) => {
    console.log(results);
    res.render('index', { title: 'Star Wars Quotes', quotes: results });
  })
  .catch((error) => {
    console.error(error);
    res.sendStatus(404);
  })
});

/*
IN JS: 3 ways to create a function
function() {}
() => {}
() => ...
*/

/* POST a form submission */
router.post('/', async (req, res) => {
  console.log(req.body);  const newQuote = await dbService.db.collection('quotes').insertOne(req.body);
  res.render('index', { title: 'Form posted' });
});

module.exports = router;