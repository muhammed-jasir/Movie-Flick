import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Movies from './pages/Movies'
import Tv from './pages/Tv'

const App = () => {
    return (
        <main>
            <BrowserRouter>
                <Header />
                <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/movies' element={<Movies />} />
                <Route path='/tv' element={<Tv />} />
                </Routes>
            </BrowserRouter>
        </main>
    )
}

export default App