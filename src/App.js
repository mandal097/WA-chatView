import React from 'react';
import './App.scss'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Messages from './pages/Messages/Messages';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import ResetPassword from './pages/Auth/ResetPassword/ResetPassword';
import 'react-toastify/dist/ReactToastify.css';
import SendOtp from './pages/Auth/ForgotPassword/SendOtp';
import ChangePassword from './pages/Auth/ForgotPassword/ChangePassword';

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
            <Route path='reset-password' element={<ResetPassword />} />
            <Route path='send-otp' element={<SendOtp />} />
            <Route path='forgot-password' element={<ChangePassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App