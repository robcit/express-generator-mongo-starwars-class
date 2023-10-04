var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
require('models/Quote');
const Quote = mongoose.model('quotes');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const filter = {};
  const quotes = await Quote.find();
  console.log(quotes)
  res.render('index', { title: 'Star Wars Quotes', quotes: quotes });
});

/*
IN JS: 3 ways to create a function
function() {}
() => {}
() => ...
*/

/* POST a form submission */
router.post('/', async (req, res) => {
  console.log(req.body);  
  // const newQuote = await dbService.db.collection('quotes').insertOne(req.body);
  // res.render('index', { title: 'Form posted' });
  const myQuote = new Quote({
    character: req.body.character,
    quote: req.body.quote
  });
  myQuote.save()
    .then( () => console.log('Document saved.') )
    // .then( () => { res.render('index', { title: 'Form posted' }); })
    .then( () => { res.redirect('/') })
    .catch( err => console.log(err) );
});

module.exports = router;