import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Offers from './pages/Offers'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import ForgotPassword from './pages/ForgotPassword'
import Header from './components/Header'


export default function App() {
  return (
    <>

<Router>
  <Header />
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/offers' element={<Offers />} />
    <Route path='/signin' element={<SignIn />} />
    <Route path='/signup' element={<SignUp />} />
    <Route path='/profile' element={<Profile />} />
    <Route path='/forgotpassword' element={<ForgotPassword />} />
  </Routes>
</Router>

    </>
  )
}
