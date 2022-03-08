import { motion } from 'framer-motion'
import React from 'react'
import apiConfig from '../api/apiConfig'



const Poster = ({movie}) => {
  const imgW500 = apiConfig.w500Image(movie.poster_path)
  return (
    <motion.div whileHover={{scale: 1.09}} className='text-white overflow-hidden relative'> {/* relative */}
      <div>
        <span className='absolute bg-slate-800 bottom-0 left-0 right-0 text-center p-2 font-bold text-lg'>
          {movie.original_title}
        </span>
        <img src={imgW500} className='object-cover w-44 h-[260px]' />
      </div>
    </motion.div>
  )
}

export default Poster