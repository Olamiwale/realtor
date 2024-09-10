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
import CreateListing from './pages/CreateListing'
import Rent from './pages/Rent'
import Sell from './pages/Sell'


export default function App() {
  return (
    <>

<Router>
  <Header />
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/offers' element={<Offers />} />
    <Route path='/rent' element={<Rent />} />
    <Route path='/sell' element={<Sell />} />
    <Route path='/create-listing' element={<CreateListing />} />
    
    <Route path='/profile' element={<PrivateRoute />}>
       <Route path='/profile' element={<Profile />} />
    </Route>
    <Route path='/create-listing' element={<PrivateRoute />}>
       <Route path='/create-listing' element={<CreateListing />} />
    </Route>

    <Route path='/sign-in' element={<SignIn />} />
    <Route path='/sign-up' element={<SignUp />} />
   
    <Route path='/forgot-password' element={<ForgotPassword />} />
  </Routes>
</Router>

    </>
  )
}
