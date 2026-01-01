import { useState } from 'react'
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import BloodDonationApp from './components/BloodDonationApp'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<BloodDonationApp/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
