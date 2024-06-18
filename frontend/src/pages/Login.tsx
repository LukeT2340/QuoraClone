import { GoogleLogin } from "@react-oauth/google"
import { Navigate } from "react-router-dom"
import React from "react"
import { Link } from "react-router-dom"

// Login page
const Login = () => {
    // Login with Google
    const googleAuth = () => {
        window.open(
            `${process.env.REACT_APP_BACKEND_URL}/auth/google`,
            "_self"
        )
    }

    return (
        <div className="container d-flex col-6 justify-content-center border">
            <button onClick={googleAuth}>Sign in with Google</button>
            <hr />
        </div>
    )
}

export default Login
