import React from 'react'
import Banner from '../components/Banner'
import CardsList from '../components/CardsList'

const Home = () => {
    return (
        <main className=''>
            <Banner />

            <div className='pb-8'>
                <CardsList url={`/trending/all/week`} title={'Trending'} isTrending />
                <CardsList url={`/movie/popular`} title={'Popular Movies'} type={'movie'} />
                <CardsList url={`/tv/popular`} title={'Popular Tv Shows'} type={'tv'} />
                <CardsList url={`/movie/top_rated`} title={'Top Rated Movies'} type={'movie'} />
                <CardsList url={`/tv/top_rated`} title={'Top Rated Tv Shows'} type={'tv'} />
                <CardsList url={`/movie/now_playing`} title={'Now Playing Movies'} type={'movie'} />
                <CardsList url={`/tv/on_the_air`} title={'On The Air'} type={'tv'} />
                <CardsList url={`/movie/upcoming`} title={'Upcoming Movies'} type={'movie'} />
                <CardsList url={`/tv/airing_today`} title={'Airing Today'} type={'tv'} />
            </div>
        </main>
    )
}

export default Home