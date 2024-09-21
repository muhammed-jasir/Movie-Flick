import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    const footerLinks = [
        {
            title: 'Navs',
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
                    path: '/'
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
                    path: '/terms'
                },
                {
                    label: 'Privacy Policy',
                    path: '/privacy'
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
        <footer className='relative bg-slate-950 bottom-0 text-[#ffffff] pt-3 pb-[85px] sm:pb-3 px-0 lg:px-20 rounded-t-md'>
            <div className='w-full flex flex-col justify-between'>
                <div className='flex flex-col md:flex-row gap-2 md:gap-8 justify-between py-5 px-6'>
                    <Link to='/'>
                        <h1 className='text-3xl font-bold mb-4 whitespace-nowrap text-center md:text-left'>
                            Movie Flick
                        </h1>
                    </Link>

                    <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-8 md:gap-20'>
                        {
                            footerLinks.map((section, index) => (
                                <div
                                    key={index}
                                    className='flex flex-col items-center gap-3 text-lg md:text-xl'
                                >
                                    <h3 className='text-lg font-semibold underline underline-offset-4 whitespace-nowrap'>
                                        {section.title}
                                    </h3>

                                    <ul className='flex flex-col items-center gap-1.5'>
                                        {
                                            section.links.map((link, index) => (
                                                <li key={index}>
                                                    <Link
                                                        to={link.path}
                                                        className='text-base font-medium hover:text-gray-300 hover:underline hover:underline-offset-4 cursor-pointer whitespace-nowrap'
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

                <div className='flex flex-col sm:flex-row gap-4 justify-between items-center px-6 pt-3'>
                    <p>
                        &#169;
                        &nbsp;
                        {new Date().getFullYear()}
                        &nbsp;
                        Movie Flick
                    </p>

                    <div className='flex items-center gap-2.5 md:gap-4'>
                        {
                            socialMediaLinks.map((socialMedia, index) => (
                                <a
                                    key={index}
                                    href={socialMedia.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='text-2xl hover:text-gray-400 cursor-pointer'
                                >
                                    {socialMedia.icon}
                                </a>
                            ))
                        }
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
