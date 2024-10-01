import React, { useState } from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

const Player = ({ videos }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < videos.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <div className='container mx-auto px-2 md:px-4 pt-4'>
            {
                videos.length > 0 && (
                    <>
                        <div className='flex justify-between items-center bg-[#14213d] py-2 px-4 rounded-md'>
                            <button
                                className={`px-1 py-1 bg-gray-500/70 hover:bg-gray-500 rounded ${currentIndex === 0 && 'cursor-not-allowed opacity-50'}`}
                                disabled={currentIndex === 0}
                                onClick={handlePrev}
                            >
                                <BiChevronLeft size={28} />
                            </button>

                            <h4 className='text-xl md:text-2xl lg:text-4xl'>
                                {videos[currentIndex].type}
                            </h4>

                            <button
                                className={`px-1 py-1 bg-gray-500/70 hover:bg-gray-500 rounded ${currentIndex === videos.length - 1 && 'cursor-not-allowed opacity-50'}`}
                                disabled={currentIndex === videos.length - 1}
                                onClick={handleNext}
                            >
                                <BiChevronRight size={28} />
                            </button>
                        </div>

                        <div className='pt-4'>
                            <div className='aspect-video min-h-[190px] overflow-hidden rounded-xl shadow-md bg-[#14213d] cursor-pointer'>
                                <iframe
                                    src={`https://www.youtube.com/embed/${videos[currentIndex].key}`}
                                    title={videos[currentIndex].name}
                                    width="100%"
                                    height="100%"
                                    loading="lazy"
                                    className='w-full h-full'
                                    frameBorder='0'
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Player