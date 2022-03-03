import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import apiConfig from '../api/apiConfig'
import tmdbApi from '../api/tmdbApi'
import Poster from '../components/Poster'


const Movie = () => {

    const [movie, setMovie] = useState({})
    const image = apiConfig.originalImage(movie.backdrop_path)
    const params = useParams()
    const chank = params.slug.split("_")
    const id = chank[0]


    const [collection, setCollection] = useState()
    
    const getMovie = async () => {
        try {
            const response = await tmdbApi.getMovie(id)
            setMovie(response)
            if(movie.backdrop_path !== null){
                const idCollection = await response.belongs_to_collection.id
                const resColl = await tmdbApi.getCollection(idCollection)
            setCollection(resColl.parts)
            }
        } catch {
            console.log('error')
        }
    }


    useEffect(() => {
        getMovie()
    }, [collection])
    

    return (
        <div className='w-full min-h-sreen flex flex-col justify-center items-center'>
            <div className='max-w-7xl relative'>
                <img src={image} />
                <div className='absolute bottom-0'>
                    <div className='text-white bg-gray-700 bg-opacity-40 lg:text-5xl px-6 py-4'>
                        <span className='font-black'>
                            {movie.title}
                        </span>
                        <br />
                        <span className='text-sm font-medium'>
                            {movie.overview}
                        </span>
                    </div>
                </div>
            </div>
            <div className='text-center bg-gray-900'>
                {movie.release_date}
                <br />
                {movie.imdb_id}
            </div>
            <div className='flex justify-center bg-gray-700 lg:max-w-7xl w-full lg:h-[520px]'>{/* max-w-7xl w-full h-[520px] */}
                <div className="relative w-full w-[340px] lg:w-[720px]"> 
                    <iframe 
                        src={`https://74.svetacdn.in/DRQQUUcW0qvr?imdb_id=${movie.imdb_id}`}//imdb_id=${movie.imdb_id}
                        className='absolute w-[340px] lg:w-[720px] h-[250px] lg:h-[520px]'// w-[720px] h-[520px]
                        frameborder="0"
                        allowFullScreen
                    />
                </div>
            </div>
            <div className='flex gap-8 flex-wrap mt-[340px] lg:mt-[720px]'>
                {collection && collection.map( (movie, index) =>(
                    <Link key={index} to={`/movie/${movie.id}_${movie.original_title}`} >
                        <Poster movie={movie} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Movie