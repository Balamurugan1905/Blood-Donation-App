import { useState } from 'react'
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import BloodDonationApp from './components/BloodDonationApp'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/bda' element={<BloodDonationApp/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
