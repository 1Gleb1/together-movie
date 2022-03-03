import React from 'react'
import apiConfig from '../api/apiConfig'


const Poster = ({movie}) => {
  const imgW500 = apiConfig.w500Image(movie.poster_path)
  return (
    <div>
      <div className='text-white relative'>
        <span className='absolute bg-gray-700 bg-opacity-60 bottom-0 left-0 w-full text-center p-3 font-bold text-lg'>
          {movie.original_title}
        </span>
        <img src={imgW500} width={150} />
      </div>
    </div>
  )
}

export default Poster