import React from 'react'
import { getImageUrl } from '../constants/constants';
import moment from 'moment';

const PosterCard = ({ data, isTrending, index, type, isSmall }) => {
    return (
        <div className={`relative ${isSmall ? 'min-w-[150px] max-w-[150px] h-[250px] sm:min-w-[180px] sm:max-w-[180px] sm:h-[300px] md:min-w-[230px] md:max-w-[230px] md:h-[350px]' : 'min-w-[230px] max-w-[230px] h-[350px]'} hover:cursor-pointer rounded-md hover:scale-105 transition.all ease-in-out duration-300 hover:border-2`}>

            {
                data?.poster_path ? (
                    <img
                        src={getImageUrl('w500', data?.poster_path)}
                        alt={data?.title || data?.name || 'movie-poster'}
                        className={`${isSmall ? 'h-[200px] sm:h-[250px] md:h-[300px]' : 'h-[300px]'} w-full object-cover rounded-t-md shadow-md bg-[#14213d]`}
                    />
                ) : (
                    <div className={`${isSmall ? 'h-[200px] sm:h-[250px] md:h-[300px]' : 'h-[300px]'} w-full flex justify-center items-center bg-[#14213d] rounded-t-md shadow-md`}>
                        No Image found
                    </div>
                )
            }

            <div className='bg-black/70 px-2.5 py-0.5 rounded-b-md w-full'>
                <h3 className='font-semibold text-base text-ellipsis line-clamp-1'>
                    {data?.name || data?.title}
                </h3>

                <div className='flex justify-between text-sm text-gray-400'>
                    <p>
                        {moment(data.release_date).format('L')}
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