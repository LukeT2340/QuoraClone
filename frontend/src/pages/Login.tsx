import { GoogleLogin } from "@react-oauth/google"
import { googleSignIn } from "../hooks/googleSignIn"
import { useState } from "react"

// Login page
const Login = () => {
    const { googleSignInCallback, error, loading } = googleSignIn()
    
    return (
        <div className="container d-flex col-6 justify-content-center border">
            <div className="col-6">
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        googleSignInCallback(credentialResponse)
                    }}
                    onError={() => {
                        console.log("Login failed")
                    }}
                />
            </div>
            <hr />
            <div className="col-6">
            
            </div>
        </div>
    )
}

export default Login