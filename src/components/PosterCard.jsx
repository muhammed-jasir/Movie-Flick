import React, { useEffect, useState } from 'react'
import { getImageUrl } from '../constants/constants';
import moment from 'moment';

const PosterCard = ({ data, isTrending, index, type }) => {
    return (
        <div className='relative h-[360px] min-w-[230px] max-w-[230px]'>
            <img
                src={getImageUrl('w500', data?.poster_path)}
                alt={data?.title || data?.name || 'movie-poster'}
                className='h-[300px] w-full object-cover rounded-t-md shadow-md bg-[#14213d]'
            />

            <div className='bg-black/70 px-2.5 py-0.5 rounded-b-md w-full'>
                <h3 className='font-semibold text-base text-ellipsis line-clamp-1'>
                    {data?.name || data?.title}
                </h3>

                <div className='flex justify-between text-sm text-gray-400'>
                    <p>
                        {moment(data.release_date).format('MMMM Do YYYY')}
                    </p>

                    <p>
                        {Number(data?.vote_average).toFixed(1)}
                    </p>
                </div>
            </div>

            <div className='absolute top-2'>
                {
                    isTrending && (
                        <div className='bg-black/80 px-4 py-1 rounded-r-full backdrop-blur-3xl'>
                            #{index} Trending
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default PosterCard