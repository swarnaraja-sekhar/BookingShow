import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Route,Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import  MyBokings  from './pages/MyBokings'
import  Favorite  from './pages/Favorite'
import { Toaster } from 'react-hot-toast'
import { Layout } from 'lucide-react'
import Dashboard from './pages/admin/Dashboard'
import AddShows from './pages/admin/AddShows'
import ListShows from './pages/admin/ListShows'
import ListBooking from './pages/admin/ListBooking'
import AdminLayout  from './pages/admin/AdminLayout'

 const App = () => {

    const isAdminRoute = useLocation().pathname.startsWith('/admin')
  return (
    <>
    <Toaster />
      {!isAdminRoute && <Navbar />}
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/movies' element={<Movies/>} />
          <Route path='/movies/:id' element={<MovieDetails />}></Route>
          <Route path='/movies/:id/:date' element={<SeatLayout />} />
          <Route path='/my-bookings' element={<MyBokings />} />
          <Route path='/favorite' element={<Favorite />} />
          <Route path='/admin/*' element={< AdminLayout/>} >
                <Route index element={<Dashboard />} />
                <Route path='add-shows' element={<AddShows />} />
                <Route path='list-shows' element={<ListShows />} />
                <Route path='list-bookings' element={<ListBooking />} />
            </Route>
 
        </Routes>
        
        {!isAdminRoute && <Footer /> }
    </>
  )
}
export default App
