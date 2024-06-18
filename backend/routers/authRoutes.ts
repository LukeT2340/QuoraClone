import express, { Request, Response } from "express"
import User, { IUser } from "../models/user.model"
import { Profile } from 'passport-google-oauth20'

const passport = require('passport')

// Create router
const router = express.Router()

// Auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

// Auth with google callback
router.get("/google/redirect", passport.authenticate('google', {
    successRedirect: process.env.FRONTEND_URL,
    failureRedirect: "/login/failed"
}))

// Logout
router.get("/logout", (req: Request, res: Response) => {
    req.logout(() => {})
    res.redirect(`${process.env.FRONTEND_URL}`)
})

// Login success
router.get("/login/success", (req: Request, res: Response) => {
    if (req.user as IUser) {
        res.status(200).json({
            message: "Successfully logged in",
            user: req.user
        })
    } else {
        res.status(403).json({
            message: "Not authorized"
        })
    }
})

// Login failed
router.get("/login/failed", (req: Request, res: Response) => {
    res.status(401).json({
        message: "Login failure"
    })
})

module.exports = router
