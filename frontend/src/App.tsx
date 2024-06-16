import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import './App.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {  
  return (
    <GoogleOAuthProvider clientId="384046387713-0vvvjdvibc4c0a2cr2bstujtn2kotf6o.apps.googleusercontent.com">
      <Router>
        <Routes>
  
          <Route path='/login' element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
      
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App
