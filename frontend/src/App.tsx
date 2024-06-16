import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import Login from './pages/Login'
import './App.css'

function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <Router>
        <Routes>
          {!user && (
            <>
              <Route path='/login' element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App
