// Import required libraries
import express, { Request, Response } from 'express'

const cors = require('cors')
const cookieSession = require('cookie-session')
const passport = require('passport')
const mongoose = require('mongoose')
require("dotenv").config()

// Import routers and passport
const authRoutes = require("../routers/authRoutes")
const passportSetup = require("../config/passportSetup")

// Connection URI for your MongoDB database
const mongoURI = process.env.MONGOURI

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection

// Event handlers for database connection
db.on('connected', () => {
  console.log('Connected to MongoDB')
})

db.on('error', (err: string) => {
  console.error('MongoDB connection error:', err)
})

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB')
})

// Create express APP
const app = express()

// Use cors
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))

// Use cookie sessions
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIESECRET]
}))

// Initialize passport
app.use(passport.initialize())
app.use(passport.session())

// Json middleware
app.use(express.json())

// Use auth routes
app.use('/auth', authRoutes)

// Use port specified in environment variables
const port = process.env.PORT || 3000

// Start listening
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
