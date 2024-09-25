import React from 'react'
import DetailsInfo from '../components/DetailsInfo';
import CastList from '../components/CastList';
import CardsList from '../components/CardsList';
import { useParams } from 'react-router-dom';

const DetailsPage = () => {
    const { type, id } = useParams();

    return (
        <section className='min-h-screen'>
            <DetailsInfo />
            <CastList />

            <div className='pb-8'>
                <CardsList endpoint={`/${type}/${id}/similar`} title={`Similar ${type === 'movie' ? 'Movies' : 'Tv Shows'}`} type={`${type}`} />
                <CardsList endpoint={`/${type}/${id}/recommendations`} title={`Recommented  ${type === 'movie' ? 'Movies' : 'Tv Shows'}`} type={`${type}`} />
            </div>
        </section>
    )
}

export default DetailsPage