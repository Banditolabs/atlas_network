// *********************************
// Enabling Enviromental Variables
// *********************************
require('dotenv').config()

const urlencoded = require('body-parser/lib/types/urlencoded')
// *********************************
// Import Dependencies
// *********************************
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const morgan = require('morgan')


// *********************************
// Global Variables & Controller Instantiation
// *********************************
const PORT =process.env.PORT || 3333

// *********************************
// Creating Application Object
// *********************************
const app = express ()
const missionsController = require('./controllers/missions.js')

// *********************************
// Routers
// *********************************

// *********************************
// Middleware
// *********************************
// Global Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride("_method"))
app.use("/public", express.static("public"))
app.use(morgan("tiny"))
app.use("/missions", missionsController)

// *********************************
// Routes that Render Pages with EJS
// *********************************
app.get("/", (req,res) => {
    res.redirect("/missions")
})
// *********************************
// API Routes that Return JSON
// *********************************

// *********************************
// Server Listener/Database Connect
// *********************************
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
})

const db = mongoose.connection
db.on('error', (err) => console.log( err.message + "is mongo not running?"))
db.on('connected', () => console.log('mongoose connected'))
db.on('disconnected', () => console.log ("mongo disconnected"))

app.listen(PORT, () => console.log())