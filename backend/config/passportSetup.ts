// Import libraries
import { Profile } from 'passport-google-oauth20'
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
import User, { IUser } from '../models/user.model'; // Assuming IUser is the interface representing your user model

// Serialize user
passport.serializeUser((user: Profile, done: (error: any, user?: any, info?: any) => void) => {
    done(null, user.id)
})

// Deserialize user
passport.deserializeUser(async (id: string, done: (error: any, user?: any, info?: any) => void) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (error) {
        done(error, null)
    }
})

// Use google strategy
passport.use(
    new GoogleStrategy({
        // options for the google strategy
        callbackURL: '/auth/google/redirect',
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET
    }, async (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any, info?: any) => void) => {        
        const googleId = profile.id
        const email = profile.emails?.[0].value
        const displayName = profile.displayName

        try {
            // Check if user exists
            const user = await User.findOne({ googleId })

            // Handle user exists
            if (user) {
                user.googleAccessToken = accessToken
                user.googleRefreshToken = refreshToken
                await user.save()
                return done(null, user)
            }
            
            // Handle user doesn't exist
            const newUser = new User({
                displayName: displayName,
                email,
                googleId,
                googleAccessToken: accessToken,
                googleRefreshToken: refreshToken
            })

            await newUser.save()
            return done(null, newUser)
        } catch (error) {
            return done(error)
        }
    })
)