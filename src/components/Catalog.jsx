import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Filter from './Filter'
import Pagination from './Pagination'
import Poster from './Poster'
import Search from './Search'
import tmdbApi from '../api/tmdbApi'
import apiConfig from '../api/apiConfig'
import {Swiper, SwiperSlide} from 'swiper/react'
import { EffectCube, EffectCoverflow, Pagination as SwiperPagination } from 'swiper'
import 'swiper/css'
import "swiper/css/effect-coverflow";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

const Catalog = () => {

    const [activeGenre, setActiveGenre] = useState(null)
    const [listSer, setListSer] = useState({})
    const [movieItems, setMovieItems] = useState([])
    const [pageEx, setPageEx] = useState(1)
    const [popularList, setPopularList] = useState([])
    const imageCollection = []

    popularList.forEach(item => {
      const image = apiConfig.originalImage(item.backdrop_path)
      imageCollection.push(image)
    })

    useEffect(() => {
      const getMoviesWithGeter = async () => {
        const params = {page: pageEx}
        const popular = {page: 1}
        try {
          const response = await tmdbApi.getMovieByCategory(activeGenre, {params})
          const result = await tmdbApi.getMovieByCategory({popular})
          setMovieItems(response.results)
          setPopularList(result.results)
        } catch {
          console.log('error');
        }
      }

      getMoviesWithGeter()
    }, [activeGenre, pageEx, listSer])


  const handleHome = () => {
    setListSer({})
  }

    return (
        <div className='w-full min-h-screen'>

          <div className='pb-2'>
            {/* <h2 className='text-3xl font-bold ml-6 sm:ml-12 pb-4'>Popular</h2> */}
            <Swiper
                effect='coverflow'
                modules={[EffectCoverflow, EffectCube, SwiperPagination]}
                centeredSlides={true} // for EffectCoverflow
                grabCursor={true}
                pagination={{clickable: true}}
                loop={true}
                autoplay={true}
                className='relative w-full h-[250px] sm:h-[600px]'
              >
                {popularList.map((item, index) => (
                  <SwiperSlide key={index} >
                    <Link to={`/movie/${item.id}_${item.title}`} >
                      <img src={imageCollection[index]} className='absolute left-0 right-0 top-0 ' />
                    </Link>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
          
          <div className='flex justify-center pt-4'>
              <Search setListSer={setListSer} setMovieItems={setMovieItems} />
          </div>

            {!listSer.results && (
              <div className='py-2'>
                <Filter setPageEx={setPageEx} setActiveGenre={setActiveGenre} />
              </div> 
            )}
            {listSer.results && (
              <button onClick={handleHome} className={"text-5xl py-2 font-bold"}>Home</button>
            )}
            
            <div className="flex flex-col justify-center items-center gap-2 pt-6 px-6 my-2 rounded-lg max-w-7xl">
              <div className='flex flex-wrap gap-8 justify-center my-2'>
                {/* For Serch List */}
                {listSer.results && (
                  listSer.results.map((movie, index) =>(
                    <Link key={index} to={`/movie/${movie.id}_${movie.title}`} >
                      { movie.poster_path && (<Poster movie={movie} />)}
                    </Link>
                  ))
                )}
                {/* For All List */}
                {!listSer.results && (
                  movieItems.map( (movie, index) =>(
                    <Link key={index} to={`/movie/${movie.id}_${movie.title}`} >
                      { movie.poster_path && (<Poster movie={movie} />)}
                    </Link>
                  ))
                )}
                
              </div>
            </div>

            <div className='pb-2'>
              <Pagination listSer={listSer} pageEx={pageEx} setPageEx={setPageEx} />
            </div>
        </div>
  )
}

export default Catalog


