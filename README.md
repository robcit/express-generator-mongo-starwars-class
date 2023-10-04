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