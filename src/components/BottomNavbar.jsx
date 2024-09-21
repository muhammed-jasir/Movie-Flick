import React from 'react'
import { BiSolidMoviePlay } from 'react-icons/bi';
import { FaHome } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { MdLiveTv } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const BottomNavbar = () => {
    const navLinks = [
        {
            label: 'Home',
            href: '/',
            icon: <FaHome />
        },
        {
            label: 'Movies',
            href: '/movies',
            icon: <BiSolidMoviePlay />
        },
        {
            label: 'TV Shows',
            href: '/tv',
            icon: <MdLiveTv />
        },
        {
            label: 'Search',
            href: '/search',
            icon: <IoSearch />
        },
    ];

    return (
        <section className='fixed bottom-0 sm:hidden bg-[#14213d] text-[#FFFFFF] shadow-md w-full z-50 rounded-t-md'>
            <div className='flex items-center justify-between w-full px-4 py-2'>
                {
                    navLinks.map((navlink) => (
                        <NavLink
                            key={navlink.label}
                            to={navlink.href}
                            className={({ isActive }) => `${isActive && 'bg-[#0A1128] w-[70px] px-1.5 py-1 rounded-md'}
                            flex flex-col gap-1.5 justify-center items-center whitespace-nowrap transition.all ease-in-out duration-300`}
                        >
                            <div className='text-2xl'>
                                {navlink.icon}
                            </div>
                            
                            <p className='text-xs font-semibold'>
                                {navlink.label}
                            </p>
                        </NavLink>
                    ))
                }
            </div>
        </section>
    )
}

export default BottomNavbar