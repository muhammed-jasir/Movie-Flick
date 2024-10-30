import React from 'react'
import { getImageUrl } from '../constants/constants';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaBookmark } from 'react-icons/fa';
import { useWatchlistContext } from '../store/watchlistContext';

const PosterCard = ({ data, isTrending, index, type, isSmall, isWatchlist, user }) => {
    const { removeFromWatchlist } = useWatchlistContext();

    const handleClick = async () => {
        try {
            await removeFromWatchlist(user.uid, data, type);
            toast.success('removed from watchlist');
        } catch (error) {
            console.log('Error removing from watchlist:', error);
        }
    }

    return (
        <Link to={`/${type}/${data?.id}`}>
            <div className={`relative ${isSmall ? 'min-w-[150px] max-w-[150px] h-[230px] sm:min-w-[200px] sm:max-w-[200px] sm:h-[300px] md:min-w-[230px] md:max-w-[230px] md:h-[350px]' : 'min-w-[230px] max-w-[230px] h-[350px]'} cursor-pointer rounded-md hover:scale-105 transition.all ease-in-out duration-300 hover:border-2 border-white overflow-hidden`}>
                {
                    data?.poster_path ? (
                        <img
                            src={getImageUrl('w500', data?.poster_path)}
                            alt={data?.title || data?.name || 'movie-poster'}
                            className={`${isSmall ? 'h-[180px] sm:h-[250px] md:h-[300px]' : 'h-[300px]'} w-full object-cover rounded-t-md shadow-md bg-[#14213d]`}
                        />
                    ) : (
                        <div className={`${isSmall ? 'h-[180px] sm:h-[250px] md:h-[300px]' : 'h-[300px]'} w-full flex justify-center items-center bg-[#14213d] rounded-t-md shadow-md`}>
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
                            {moment(data.release_date || data.first_air_date).format('YYYY')}
                        </p>

                        <p className=''>
                            {data?.vote_average > 0 ? Number(data.vote_average).toFixed(1) : 'N/A'}
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

                <div className='absolute top-2.5 right-2.5'>
                    {
                        isWatchlist && (
                            <button className='p-2.5 rounded-[50%] bg-gray-900 cursor-pointer' onClick={handleClick}>
                                <FaBookmark />
                            </button>
                        )
                    }
                </div>
            </div>
        </Link>
    )
}

export default PosterCard