import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios';
import { getImageUrl } from '../constants/constants';
import { Link } from 'react-router-dom';

import { FaPlay } from 'react-icons/fa';
import { MdInfoOutline } from 'react-icons/md';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Keyboard, Autoplay, Pagination, Navigation } from 'swiper/modules';

import Spinner from './Spinner'

const Banner = () => {
    const [trendingData, setTrendingData] = useState([]);
    const [loading, setLoading] = useState(false);

    const path = window.location.pathname;

    const fetchTrendingAll = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("trending/all/day");
            const filteredData = response.data.results.filter(item => item.media_type !== 'person');
            setTrendingData(filteredData);
        } catch (error) {
            console.error("Error fetching:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTrending = async (type, time) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`trending/${type}/${time}`);
            setTrendingData(response.data.results);
        } catch (error) {
            console.error("Error fetching trending data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (path.includes('/movies')) {
            fetchTrending('movie', 'day');
        } else if (path.includes('/tv')) {
            fetchTrending('tv', 'day');
        } else {
            fetchTrendingAll();
        }

    }, [path]);

    if (loading) {
        return (
            <div className='w-full h-[535px] sm:h-[675px] md:h-[610px] flex items-center justify-center'>
                <Spinner borderColor={'border-white'} />
            </div>
        )
    }

    return (
        <section>
            <div className='flex overflow-hidden'>
                <Swiper
                    style={{
                        "--swiper-pagination-color": "#FFBA08",
                        "--swiper-pagination-bullet-inactive-color": "#999999",
                        "--swiper-pagination-bullet-inactive-opacity": "1",
                        "--swiper-pagination-bullet-size": "8px",
                        "--swiper-pagination-bullet-horizontal-gap": "2px"
                    }}
                    spaceBetween={30}
                    centeredSlides={true}
                    grabCursor={false}
                    lazy={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    keyboard={{
                        enabled: true,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={false}
                    modules={[Keyboard, Autoplay, Pagination, Navigation]}
                >
                    {
                        trendingData.map((data) => (
                            <SwiperSlide key={data.id}>
                                <div
                                    className='relative min-w-full h-[535px] sm:h-[675px] md:h-[610px] transition-all duration-300 ease-linear'
                                >
                                    <img
                                        src={getImageUrl('original', data?.backdrop_path)}
                                        alt={data?.title || data?.name || 'banner-image'}
                                        className='w-full h-full object-cover bg-slate-950 cursor-pointer rounded-xl'
                                        loading='lazy'
                                    />

                                    <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>

                                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>

                                    <div className='absolute bottom-20 flex flex-col gap-5 max-w-full md:max-w-xl mx-5 md:mx-20 text-center md:text-left'>
                                        <h1 className='text-4xl lg:text-5xl font-bold drop-shadow-2xl'>
                                            {data?.title || data?.name}
                                        </h1>

                                        <p className='text-lg font-semibold line-clamp-4 text-ellipsis'>
                                            {data?.overview}
                                        </p>

                                        <div className='flex gap-3 text-base font-medium justify-center md:justify-start'>
                                            <p>
                                                Rating: {Number(data?.vote_average).toFixed(1)}
                                            </p>

                                            <p>
                                                View: {Number(data?.popularity).toFixed(1)}
                                            </p>
                                        </div>

                                        <div className='flex gap-3 justify-center md:justify-start'>
                                            <Link to='/'>
                                                <button className='flex items-center px-6 sm:px-8 py-2 gap-2 text-lg font-semibold cursor-pointer bg-white text-black rounded hover:bg-[#ffffffbf] whitespace-nowrap'>
                                                    <FaPlay />
                                                    Play
                                                </button>
                                            </Link>

                                            <Link to='/'>
                                                <button className='flex items-center px-4 sm:px-6 py-2 gap-2 text-lg font-semibold cursor-pointer bg-[#6d6d6eb3] text-white rounded hover:bg-[#6d6d6e66] whitespace-nowrap'>
                                                    <MdInfoOutline className='text-2xl' />
                                                    More Info
                                                </button>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className='absolute bottom-10 right-40 hidden lg:block'>
                                        <img
                                            src={getImageUrl('w500', data?.poster_path)}
                                            alt={data?.title || data?.name || 'poster-image'}
                                            className='w-full h-[400px] object-cover rounded-md shadow-md'
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>
    )
}

export default Banner
