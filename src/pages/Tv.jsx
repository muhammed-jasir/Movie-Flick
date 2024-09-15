import React from 'react'
import Banner from '../components/Banner'
import CardsList from '../components/CardsList'
import { TvShowGenres } from '../constants/GenreList'

const Tv = () => {
    return (
        <main>
            <Banner />

            <CardsList url={`/trending/tv/week`} title={'Trending'} isTrending type={'tv'} />

            {
                TvShowGenres.map(
                    (genre) => (
                        <div key={genre.id}>
                            <CardsList genreId={genre.id} title={genre.name} type={'tv'} />
                        </div>
                    )
                )
            }

        </main>
    )
}

export default Tv