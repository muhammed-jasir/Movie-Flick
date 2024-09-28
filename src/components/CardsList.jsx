import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios';
import PosterCard from './PosterCard';
import Spinner from './Spinner';

const CardsList = ({ endpoint, title, isTrending, type, genreId }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchByCategory = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`${endpoint}`);
            setData(response.data.results);
        } catch (error) {
            console.error("Error fetching:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchByGenreId = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/discover/${type}`, {
                params: {
                    with_genres: genreId,
                    sort_by: 'popularity.desc',
                },
            });
            setData(response.data.results);
        } catch (error) {
            console.error("Error fetching:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (genreId) {
            fetchByGenreId();
        } else {
            fetchByCategory();
        }
    }, [endpoint, genreId]);

    return (
        <section className='flex flex-col px-5'>
            {data.length > 0 && (
                <h2 className='text-lg md:text-2xl font-semibold pt-3 mb-3'>
                    {title && title}
                </h2>
            )}

            {
                loading ? (
                    <div className='w-full h-[360px] flex items-center justify-center'>
                        <Spinner borderColor={'border-white'} />
                    </div>
                ) : (
                    <div className='flex gap-5 overflow-x-auto scrollbar-hide mx-1.5 md:mx-3 px-1.5 py-2 md:py-3 overflow-hidden'>
                        {
                            data.length > 0 && data.map((data, index) => (
                                <PosterCard
                                    key={index}
                                    data={data}
                                    index={index + 1}
                                    isTrending={isTrending}
                                    type={data?.media_type || type}
                                />
                            ))
                        }
                    </div>
                )
            }
        </section>
    )
}

export default CardsList