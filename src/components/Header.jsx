import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { IoIosNotifications } from 'react-icons/io'
import { IoMenu, IoSearch } from 'react-icons/io5'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
    const [navbarToggle, setNavbarToggle] = useState(false);
    const [searchInput, setSearchInput] = useState(null);

    const navLinks = [
        {
            label: 'Home',
            href: '/',
        },
        {
            label: 'Movies',
            href: '/movies',
        },
        {
            label: 'TV Shows',
            href: '/tv',
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(searchInput);
    }

    return (
        <header className='relative w-full z-10 py-3 px-5 bg-[#001F54] text-[#FFFFFF] shadow-md'>
            <div className='w-full flex gap-10 justify-between items-center '>
                <Link to='/'>
                    <h1 className='text-3xl font-bold whitespace-nowrap'>
                        Movie Flick
                    </h1>
                </Link>

                <nav className={`hidden absolute sm:flex flex-col top-16 left-0 w-full py-3 px-5 md:px-0 md:py-0 md:w-auto bg-[#001F54] md:bg-transparent md:static md:flex md:flex-row items-center gap-1 md:gap-5 ${navbarToggle ? 'sm:block' : 'sm:hidden'}`}>
                    {
                        navLinks.map((navLink) => (
                            <NavLink
                                to={navLink.href}
                                key={navLink.label}
                                className={({ isActive }) => `${isActive && 'bg-[#0A1128]'}
                                    text-xl font-medium w-full text-center py-1.5 px-0 md:px-2 hover:bg-[#0A1128] whitespace-nowrap rounded`}
                            >
                                {navLink.label}
                            </NavLink>
                        ))
                    }
                </nav>

                <div className='flex items-center gap-3'>
                    <form className='hidden lg:flex gap-2 items-center' onSubmit={handleSubmit}>
                        <input
                            type='text'
                            placeholder='Search'
                            className='px-2 py-2 w-[250px] rounded-md bg-[#0a112886] outline-none'
                            onChange={(e) => setSearchInput(e.target.value)}
                        />

                        <button>
                            <IoSearch size={25} className='cursor-pointer' />
                        </button>
                    </form>

                    <IoSearch size={30} className='cursor-pointer block lg:hidden' />
                    <IoIosNotifications size={30} className='cursor-pointer' />
                    <FaUserCircle size={30} className='cursor-pointer' />

                    <div className='hidden sm:block md:hidden'>
                        <IoMenu size={30} onClick={() => setNavbarToggle(!navbarToggle)} className='cursor-pointer' />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header