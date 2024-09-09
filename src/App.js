import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Movies from './pages/Movies'
import Tv from './pages/Tv'
import BottomNavbar from './components/BottomNavbar'
import SearchPage from './pages/SearchPage'

const App = () => {
    return (
        <main>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/movies' element={<Movies />} />
                    <Route path='/tv' element={<Tv />} />
                    <Route path='/search' element={<SearchPage />} />
                </Routes>
                <BottomNavbar />
            </BrowserRouter>
        </main>
    )
}

export default App