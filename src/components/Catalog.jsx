import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import tmdbApi, {movieType} from '../api/tmdbApi'
import Poster from './Poster'

const Catalog = () => {

    const [movieItems, setMovieItems] = useState([])
    const [pageEx, setPageEx] = useState(1)
    // console.log(movieItems);
    
    const prevPage = () => {
      if(pageEx > 1){
        let value = pageEx
        value = value-1
        setPageEx(value)
        window.scrollTo(0,0)
      } else {
        setPageEx(1)
      }
    }
    const nextPage = () => {
      let value = pageEx
      value = value+1
      setPageEx(value)
      window.scrollTo(0,0)
    }

    useEffect(() => {
      const getMovies = async () => {
        const params = {page: pageEx}
        try {
          const response = await tmdbApi.getMoviesList(movieType.popular, {params});
          setMovieItems(response.results.slice(0, 16))
        } catch {
          console.log('error');
        }
      }
      getMovies()
    }, [pageEx])

    return (
        <div>
            <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
                <h1 className="text-5xl py-4 font-bold">Page {pageEx}</h1>
                <div className=" max-w-6xl p-6 my-2 flex flex-wrap gap-8 justify-center bg-gray-800 rounded-lg">
                    {movieItems.map( (movie, index) =>(
                      <Link key={index} to={`/movie/${movie.id}_${movie.original_title}`} >
                        <Poster movie={movie} />
                      </Link>
                    ))}
                </div>
                <div className="max-w-sm w-full flex justify-between bg-gray-600 bg-opacity-30 py-2 px-4 rounded">
                    <button onClick={() => prevPage()}>prev</button>
                    <button onClick={() => nextPage()}>Next</button>
                </div>
            </div>
        </div>
  )
}

export default Catalog