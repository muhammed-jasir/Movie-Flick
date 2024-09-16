import React from 'react'
import Banner from '../components/Banner'
import CardsList from '../components/CardsList'
import { MovieGenres } from '../constants/GenreList'

const Movies = () => {
    return (
        <main>
            <Banner />

            <CardsList url={`/trending/movie/week`} title={'Trending'} isTrending type={'movie'} />

            <div className='pb-8'>
                {
                    MovieGenres.map(
                        (genre) => (
                            <div key={genre.id}>
                                <CardsList genreId={genre.id} title={genre.name} type={'movie'} />
                            </div>
                        )
                    )
                }
            </div>
        </main>
    )
}

export default Movies