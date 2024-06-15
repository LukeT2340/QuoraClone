// Import required libraries
import express, { Request, Response } from 'express'
require("dotenv").config()

// Create express APP
const app = express()

// Use port specified in environment variables
const port = process.env.PORT || 3000

// Start listening
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
