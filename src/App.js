import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Offers from './pages/Offers'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import ForgotPassword from './pages/ForgotPassword'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'


export default function App() {
  return (
    <>

<Router>
  <Header />
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/offers' element={<Offers />} />
    
    <Route path='/profile' element={<PrivateRoute />}>
       <Route path='/profile' element={<Profile />} />
    </Route>

    <Route path='/sign-in' element={<SignIn />} />
    <Route path='/sign-up' element={<SignUp />} />
   
    <Route path='/forgot-password' element={<ForgotPassword />} />
  </Routes>
</Router>

    </>
  )
}
