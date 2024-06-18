import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import './App.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {  
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  // Get user object
  const getUser = async () => {
    setLoading(true)
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/auth/login/success`
      const { data } = await axios.get(url, { withCredentials: true })
      localStorage.setItem('user', JSON.stringify(data.user))
      setUser(data.user)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  if (loading) {
    return (<>
      Loading
    </>)
  }

  return (
    <GoogleOAuthProvider clientId="384046387713-0vvvjdvibc4c0a2cr2bstujtn2kotf6o.apps.googleusercontent.com">
      <Router>
        <Routes>
            {user ? (
              <>
                <Route path='/home' element={<Home />} />
                <Route path="*" element={<Navigate to="/home" />} />
              </>
            ) : (
              <>
                <Route path='/login' element={<Login />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            )}
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App
