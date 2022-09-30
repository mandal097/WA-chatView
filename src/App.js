import React from 'react';
import './App.scss'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Messages from './pages/Messages/Messages';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import ForgotPasword from './pages/Auth/ForgotPassword/ForgotPasword';
import Otp from './pages/Auth/ForgotPassword/Otp';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />
            <Route path='messenger' element={<Messages />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='forgot-password' element={<ForgotPasword />} />
            <Route path='forgot-password/otp' element={<Otp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App