# Express Generator Mongo Star Wars Quotes
An Express app that has CRUD functionality with documents in MongoDB.

Based on the following article:
* [Building a Simple CRUD Application with Node, Express, and MongoDB](https://zellwk.com/blog/crud-express-mongodb/)
* [Source Code](https://github.com/zellwk/crud-demo)
* [Mongoose Tutorial](https://zellwk.com/blog/mongoose/)

## v.1
* `npx express-generator --view=ejs --git express-generator-mongo-starwars-class`
* `cd express-generator-mongo-starwars`
* `npm install`

### Install Nodemon
* `npm install nodemon --save-dev`
* Add a `dev` script in `package.json`: **`"dev": "nodemon ./bin/www  -e js,ejs,html,css"`**
* Start the application with `npm run dev`

### Set up the routes and views
* Delete the users router in `app.js`
* In `routes/index.js`, create a GET root route and a POST root route
* Update `views/index.ejs` to include the form

### Install body-parser
* `npm install body-parser --save`
* Add require and middleware to `app.js`

### Set up **app-module-path**
* `npm install app-module-path`
* Edit app.js and add `require('app-module-path').addPath(__dirname);` to the VERY FIRST LINE

### Test the Form
* `npm run dev`
* Submit the form; should see the request body appear in the console.


## v.2 - MongoDB Setup
In this version, we will interact with the MongoDB database using the native MongoDB driver.

* `npm install mongodb --save`
* `mkdir services`
* `touch services/database.js`
* Add content to `database.js`

### Set up dotenv
* `npm install dotenv`
* `touch .env`

### Set up database in Mongo Atlas
* Create Project
* Create Cluster
* Set username/password
* Connect to database ('Connect Your Application')
* Copy/paste connection string into `.env` file

### Start connection to Mongo in app.js
* `require('dotenv').config();` AT TOP of file
* Add async function to start MongoDB connection to `app.js`
* Run with `npm run dev` - should see **`Connected to MongoDB!`**

## v.3 Write to the Database with the Native MongoDB Driver

### Create a simple example that writes to the database
* In `routes/index.js`, require the db service: `const dbService = require('services/database');`
* In the **post** route, add a call to insert the body of the request as a record in MongoDB:
`const newQuote = await dbService.db.collection('quotes').insertOne(req.body);`
* Submit a form to see the record added to MongoDB

## v.4 Read from the Database with the Native MongoDB Driver

### Create a simple example that reades to the database
* In `routes/index.js`, require the db service: `const dbService = require('services/database');`
* In the **GET** route, add a call to query all documents in the `quotes` collection and use the `toArray()` method to pass that information to the view
* Update `views/index.js` and write the EJS that will loop through the `quotes` array and write each quote into a `<UL>` element
* `npm run dev` - should see all the quotes from the database on the screen

## v.5 Add Mongoose
Revise the application to connect to MongoDB using `mongoose` instead of the native driver.

* `npm install mongoose`
* In `app.js` add require: `const mongoose = require('mongoose');`
* In `app.js` comment out previous connection code; add code to connect with mongoose

```
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
.then( () => console.log('MongoDB connected.') )
.catch( err => console.log(err) );
```

* Update the connection string in the `.env` file to explicitly name the database you're using
    * Add the database name just before the `?retryWrites=true` statement
    * *Example:* `mongodb.net/star-wars-quote?retryWrites=true`

* In `app.js`, remove require for `services/database`
* `rm -rf services/database.js`

### Create a schema (Model) for Mongoose
* `mkdir models`
* `code models/Quote.js -r`
* Add content to `Quote.js`

#### Update the GET route in `routes/index.js`
* Create an empty filter
* Use that filter to find Quotes in the database
* `const quotes = await Quote.find(filter);`

#### Update the POST route in `routes/index.js`
* Add imports
```
const mongoose = require('mongoose');
require('models/Quote');
const Quote = mongoose.model('quotes');
```
* Comment out code in POST route
* Add new Quote method in POST route
```
  const myQuote = new Quote({
    character: req.body.character,
    quote: req.body.quote
  });
  myQuote.save()
    .then( () => console.log('Document saved.') )
    .then( () => { res.render('index', { title: 'Form posted' }); })
    .catch( err => console.log(err) );
```
* `npm run dev`
* Submit the form

This works but generates an error because we are not passing quotes to the view. Refactor it so that we call the root GET route after a form is posted.

```
  const myQuote = new Quote({
    character: req.body.character,
    quote: req.body.quote
  });
  myQuote.save()
    .then( () => console.log('Document saved.') )
    // .then( () => { res.render('index', { title: 'Form posted' }); })
    .then( () => { res.redirect('/') })
    .catch( err => console.log(err) );
```

## v.6 - Add an open API to the application