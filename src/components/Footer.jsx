import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    const footerLinks = [
        {
            title: 'Navigation',
            links: [
                {
                    label: 'Home',
                    path: '/'
                },
                {
                    label: 'Movies',
                    path: '/movies'
                },
                {
                    label: 'TV Shows',
                    path: '/tv'
                },
            ],
        },
        {
            title: 'Company',
            links: [
                {
                    label: 'About Us',
                    path: '/about'
                },
                {
                    label: 'Contact Us',
                    path: '/'
                },
                {
                    label: 'FAQs',
                    path: '/'
                },
            ],
        },
        {
            title: 'Legal',
            links: [
                {
                    label: 'Terms and Conditions',
                    path: '/'
                },
                {
                    label: 'Privacy Policy',
                    path: '/'
                },
            ],
        },
    ];

    const socialMediaLinks = [
        {
            icon: <FaInstagram />,
            href: 'https://instagram.com/',
        },
        {
            icon: <FaFacebook />,
            href: 'https://facebook.com/',
        },
        {
            icon: <FaYoutube />,
            href: 'https://youtube.com/',
        },
        {
            icon: <FaTwitter />,
            href: 'https://twitter.com/',
        },
    ];

    return (
        <footer className='relative bg-slate-900 text-[#ffffff] pt-5 md:pt-8 pb-[85px] sm:pb-5 md:pb-8 px-4 sm:px-6 md:px-12 lg:px-16 rounded-t-md'>
            <div className='flex flex-col md:flex-row justify-between gap-6'>
                <div className='flex flex-col gap-4 w-full items-center md:items-start'>
                    <Link to='/'>
                        <h1 className='text-2xl md:text-3xl font-bold whitespace-nowrap'>
                            Movie Flick
                        </h1>
                    </Link>

                    <p className='text-sm max-w-[400px] px-4 md:px-0 w-full text-center md:text-left'>
                        Movie Flick is a movie and TV show exploration site created with love and passion by a movie enthusiast.
                    </p>
                </div>


                <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-16 md:pr-16 w-full'>
                    {
                        footerLinks.map((section, index) => (
                            <div
                                key={index}
                                className='flex flex-col gap-2 px-10 md:px-0'
                            >
                                <h3 className='text-lg font-bold whitespace-nowrap'>
                                    {section.title}
                                </h3>

                                <ul className='flex flex-col gap-1'>
                                    {
                                        section.links.map((link, index) => (
                                            <li key={index}>
                                                <Link
                                                    to={link.path}
                                                    className='text-sm md:text-base font-medium hover:text-gray-300 hover:underline hover:underline-offset-4 cursor-pointer whitespace-nowrap'
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='flex flex-col sm:flex-row justify-between items-center pt-4 mt-4 md:pt-6 md:mt-6 border-t border-gray-600'>
                <p className='text-sm md:text-base'>
                    &#169; {new Date().getFullYear()} Movie Flick
                </p>

                <div className='flex items-center gap-6 mt-4 sm:mt-0'>
                    {
                        socialMediaLinks.map((socialMedia, index) => (
                            <a
                                key={index}
                                href={socialMedia.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className='text-xl hover:text-gray-400 cursor-pointer transition-colors'
                            >
                                {socialMedia.icon}
                            </a>
                        ))
                    }
                </div>
            </div>
        </footer>
    );
};

export default Footer;
