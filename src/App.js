import React from 'react';
import './App.scss'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Messages from './pages/Messages/Messages';

const App = () => {
  return (
    <div>
      <BrowserRouter>
          <Navbar />
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />
            <Route path='messenger' element={<Messages />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App