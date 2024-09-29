import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import axiosInstance from '../axios';
import Spinner from '../components/Spinner';
import PosterCard from '../components/PosterCard';

const ExplorePage = () => {
    const { state } = useLocation();
    const { endpoint, genreId } = state ;

    const { type, title } = useParams();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);

    const fetchByCategory = async () => {
        if (page > 1 && page <= totalPages) {
            setLoadingMore(true);
        } else {
            setLoading(true);
        }

        try {
            const response = await axiosInstance.get(`${endpoint}`, {
                params: {
                    page: page,
                }
            });

            if (page > 1) {
                setData((prev) => [...prev, ...response.data.results]);
            } else {
                setData([...response.data.results]);
            }

            setTotalPages(response.data.total_pages);
            console.log(response.data.results);
        } catch (error) {
            console.error("Error fetching:", error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const fetchByGenreId = async () => {
        if (page > 1 && page <= totalPages) {
            setLoadingMore(true);
        } else {
            setLoading(true);
        }

        try {
            const response = await axiosInstance.get(`/discover/${type}`, {
                params: {
                    with_genres: genreId,
                    sort_by: 'popularity.desc',
                    page: page,
                },
            });

            if (page > 1) {
                setData((prev) => [...prev, ...response.data.results]);
            } else {
                setData([...response.data.results]);
            }

            setTotalPages(response.data.total_pages);
            console.log(response.data.results);
        } catch (error) {
            console.error("Error fetching:", error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const handleScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50 && page < totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    useEffect(() => {
        if (genreId) {
            fetchByGenreId();
        } else {
            fetchByCategory();
        }
    }, [endpoint, genreId, page]);

    return (
        <div className='container mx-auto min-h-[800px] md:min-h-screen flex justify-center items-center'>
            <div className='pt-20'>
                {
                    loading ? (
                        <div className='w-full h-[500px] flex items-center justify-center'>
                            <Spinner borderColor={'border-white'} />
                        </div>
                    ) : (
                        <>
                            <div className='text-2xl font-bold capitalize flex py-3 justify-center'>
                                {title}
                            </div>

                            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-2.5 md:gap-x-5 gap-y-3 md:gap-y-5 pt-5 pb-5 w-full px-1.5 md:px-4'>
                                {data.map((data, index) => (
                                    <PosterCard
                                        key={index}
                                        data={data}
                                        type={data.media_type || type}
                                        isSmall />
                                ))}
                            </div>
                        </>
                    )
                }

                {
                    loadingMore && (
                        <div className='flex justify-center py-10'>
                            <Spinner borderColor={'border-white'} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ExplorePage