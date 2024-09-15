import React, { useEffect, useState } from 'react'
import axiosInstance from '../constants/axios';
import PosterCard from './PosterCard';
import Spinner from './Spinner';

const CardsList = ({ url, title, isTrending, type }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchByCategory = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`${url}`);
            setData(response.data.results);
        } catch (error) {
            console.error("Error fetching:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchByCategory();
    }, [url]);

    return (
        <section className='flex flex-col gap-5 pt-5 px-5 overflow-hidden'>
            <h2 className='text-2xl font-semibold'>
                {title && title}
            </h2>

            {
                loading ? (
                    <div className='w-full h-[360px] flex items-center justify-center'>
                        <Spinner borderColor={'border-white'} />
                    </div>
                ) : (
                    <div className='flex gap-3 overflow-x-auto scrollbar-hide mx-3'>
                        {
                            data.length > 0 && data.map((data, index) => (
                                <PosterCard
                                    key={data.id}
                                    data={data}
                                    index={index + 1}
                                    isTrending={isTrending}
                                    type={data?.mediatype || type}
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