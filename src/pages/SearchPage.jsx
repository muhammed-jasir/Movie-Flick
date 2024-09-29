import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios';
import PosterCard from '../components/PosterCard';
import Spinner from '../components/Spinner';

const SearchPage = () => {
    const [search, setSearch] = useState('');
    const [medias, setMedias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);

    const fetchData = async () => {
        if (page > 1 && page <= totalPages) {
            setLoadingMore(true);
        } else {
            setLoading(true);
        }

        try {
            const response = await axiosInstance.get('/search/multi', {
                params: {
                    query: search,
                    page: page,
                }
            });

            if (response) {
                const results = response.data.results.filter((result) => result.media_type !== 'person')
                if (page > 1) {
                    setMedias((prev) => [...prev, ...results]);
                } else {
                    setMedias([...results]);
                }
                setTotalPages(response.data.total_pages);
            }

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
        if (search) {
            fetchData();
        } else {
            setMedias([]);
            setPage(1);
            setTotalPages(0);
        }

    }, [search, page]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const handleSearch = (e)  => {
        setSearch(e.target.value);
        setPage(1);
    }

    return (
        <section className='container mx-auto flex flex-col items-center pt-[75px] pb-4 w-full'>
            <div className='flex justify-center items-center pt-5 px-2.5 sm:px-5 w-full'>
                <input
                    type='text'
                    placeholder='Search'
                    className='max-w-xl w-full h-12 px-5 py-3 rounded-md bg-[#14213d] text-[#ffffff] text-lg outline-none shadow-md'
                    onChange={handleSearch}
                    value={search}
                />
            </div>

            <div className='min-h-[800px] md:min-h-screen flex justify-center items-center'>
                {
                    loading ? (
                        <div className='w-full h-[500px] flex items-center justify-center'>
                            <Spinner borderColor={'border-white'} />
                        </div>
                    ) : (
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-2.5 md:gap-x-5 gap-y-3 md:gap-y-5 pt-5 pb-5 w-full px-1.5 md:px-4'>
                            {
                                medias.map((data, index) => (
                                    <PosterCard
                                        key={index}
                                        data={data}
                                        type={data.media_type}
                                        isSmall
                                    />
                                ))
                            }
                        </div>
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
        </section >
    )
}

export default SearchPage