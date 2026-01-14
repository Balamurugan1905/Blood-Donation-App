import { useState } from 'react'
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import BloodDonationApp from './components/BloodDonationApp'
import Footer from './components/Footer'
import AdminDashboard from './components/AdminDashboard'
import AdminLogin from './components/AdminLogin'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<BloodDonationApp/>}/>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/adlogin" element={<AdminLogin />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
