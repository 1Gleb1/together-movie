import { motion } from 'framer-motion'
import React from 'react'
import apiConfig from '../api/apiConfig'


const title = { hidden: {opacity: 0, y: 90}, view: {opacity: 1, y: 0}}

const Poster = ({movie}) => {
  const imgW500 = apiConfig.w500Image(movie.poster_path)
  return (
    <motion.div 
      whileHover={{scale: 1.06}} 
      className='text-white overflow-hidden relative rounded-lg'> {/* relative */}
        <div className='absolute top-1 right-1'>
          <p className={`w-10 h-10 flex justify-center items-center text-white font-medium ${ movie.vote_average < 5 ? "bg-red-600" : 'bg-emerald-600'} rounded-full text-shdow`}>
            {movie.vote_average.toFixed(1)}
          </p>
        </div>
        <motion.span animate="hidden" whileHover={"view"} variants={title} className='absolute bg-zinc-900 bg-opacity-70 bottom-0 left-0 right-0 top-0 text-center p-2'>
          <span>            
            <h5 className='font-bold text-[16px] p-1'>
              {movie.original_title}
            </h5>
            <p className={`text-sm leading-[1.05]`}>
              { movie.overview.length <= 260 ? movie.overview : `${movie.overview.substring(0, 260)}...` }
            </p>
          </span>
        </motion.span>
        <img src={imgW500} className='object-cover w-44 h-[260px]' />
        
    </motion.div>
  )
}

export default Poster