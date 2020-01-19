const express = require("express")
const cors = require('cors')
const app = express();
const knex = require('knex')

const signin = require('./controllers/signin')
const register = require('./controllers/register')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

// Creating a database
const db = knex({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : '',
    password : '',
    database : 'facerecognition',
    port: 5433
  }
});

// Used for hashing the password
const bcrypt = require('bcrypt');
const saltRounds = 10;

// These are for POST, i.e. adding data to server
app.use(express.urlencoded({extended: true}))
app.use(express.json())
// Whithout this some safety function blocks request in Chrome
app.use(cors())

// Getting the database, not used in code
app.get('/', (req, res) => {
	db.select('*').from('users')
	.then(data => res.json(data[0]))
})

// Signin
app.post('/signin', signin.handleSignIn(db, bcrypt))

// Register
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

// Getting the data for specific user, not used in code
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});

// Updating the current count of entries
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});



const PORT = process.env.PORT
// Connecting the server to port localhost:3000 i.e. 127.0.0.1
app.listen(3000, () => {
	console.log(`app is listening to port ${PORT}`)
})









