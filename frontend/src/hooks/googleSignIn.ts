import { CredentialResponse } from "@react-oauth/google"
import React, { useState } from 'react';

// Google sign in 
export const googleSignIn = () => {
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    // Google sign in callback
    const googleSignInCallback = async (credentialResponse: CredentialResponse) => {
        setError("")
        setLoading(true)
        try {
            const response = await fetch(`${process.env.REACT_BACKEND_URL}/auth/google`)

            // Handle bad response
            if (!response.ok) {
                const json = await response.json()
                setError(json.message)
                return
            }

            // Handle success
            const json = await response.json()

            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError("Unknown error signing in")
            }
        } finally {
            setLoading(false)
        }
    }

    return { googleSignInCallback, error, loading }
}

