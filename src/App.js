import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Movies from './pages/Movies'
import Tv from './pages/Tv'
import BottomNavbar from './components/BottomNavbar'
import SearchPage from './pages/SearchPage'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import DetailsPage from './pages/DetailsPage'

const App = () => {
    return (
        <main className='2xl:container mx-auto'>
            <BrowserRouter>
                <Header />
                <ScrollToTop />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/movies' element={<Movies />} />
                    <Route path='/tv' element={<Tv />} />
                    <Route path='/search' element={<SearchPage />} />
                    <Route path='/:type/:id' element={<DetailsPage />} />
                </Routes>
                <Footer />
                <BottomNavbar />
            </BrowserRouter>
        </main>
    )
}

export default App