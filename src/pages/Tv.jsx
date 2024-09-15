import React from 'react'
import Banner from '../components/Banner'
import CardsList from '../components/CardsList'

const Tv = () => {
  return (
    <main>
        <Banner />

        <CardsList url={`/trending/tv/week`} title={'Trending'} isTrending type={'tv'} />

    </main>
  )
}

export default Tv