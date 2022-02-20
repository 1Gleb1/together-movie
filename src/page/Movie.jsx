import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apiConfig from '../api/apiConfig'
import tmdbApi from '../api/tmdbApi'
import yo from '../api/yo.js'

const Movie = () => {
    const [movie, setMovie] = useState({})
    const image = apiConfig.originalImage(movie.backdrop_path)
    const params = useParams()
    const chank = params.slug.split("_")
    const id = chank[0]
    // console.log(movie);

    useEffect(() => {
        const getMovie = async () => {
          try {
            const response = await tmdbApi.getMovie(id);
            setMovie(response)
          } catch {
            console.log('error');
          }
        }
        getMovie()
      }, [])

    return (
    <div className='w-full min-h-sreen  bg-black'>
        <div className='max-w-7xl relative'>
            <img src={image} />
            <div className='absolute bottom-0'>
                <div className=' text-white bg-gray-700 bg-opacity-40 text-5xl px-6 py-4'>
                    <span className='font-black'>
                        {movie.title}
                    </span>
                    <br />
                    <span className='text-3xl font-medium'>
                        {movie.overview}
                    </span>
                </div>
            </div>
        </div>
        <div className='text-center'>
            {movie.release_date}
            <br />
            {movie.imdb_id}
        </div>
        <div className='flex flex-col gap-2 justify-center items-center '>
            <div id="yohoho"
                data-title={movie.title}
                // hdvb/!bazon/
                className='bg-gray-600 w-[800px] h-[600px]'
            >
            </div>
        </div>
    </div>

    )
}

export default Movie