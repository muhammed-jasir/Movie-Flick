import React from 'react'
import Banner from '../components/Banner'
import CardsList from '../components/CardsList'

const Movies = () => {
  return (
    <main>
        <Banner />

        <CardsList url={`/trending/movie/week`} title={'Trending'} isTrending type={'movie'} />
    </main>
  )
}

export default Movies