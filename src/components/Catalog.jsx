import React, {useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import tmdbApi from '../api/tmdbApi'
import Filter from './Filter'
import Poster from './Poster'
import Search from './Search'

const Catalog = () => {

    const [activeGenre, setActiveGenre] = useState()
    const [listSer, setListSer] = useState({})
    const [movieItems, setMovieItems] = useState([])
    const [pageEx, setPageEx] = useState(1)
    
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
    const handlePage = (value) => {
      setPageEx(Number(value))
      listPage.length = 0
      window.scrollTo(0,0)
    }
    const listPage = []
    for (let i = 1; i < pageEx + 10; i++) {
      if(listPage.length >= 10){
      } else {
        listPage.push(pageEx + i)
      }
    }
  
    useEffect(() => {
      const getMoviesWithGeter = async () => {
        const params = {page: pageEx}
        try {
          const response = await tmdbApi.getMovieByCategory(activeGenre, {params})
          setMovieItems(response.results)
        } catch {
          console.log('error');
        }
      }
      getMoviesWithGeter()
    }, [activeGenre, pageEx, listSer])

    
  //   useEffect(() => {
  //     fetchPopular()
  // },[])

  // const fetchPopular = async () => {
  //     const data = await fetch(
  //         "https://api.themoviedb.org/3/movie/popular?api_key=7877f4ead5bbdf08d7a1728914da3228&language=en-US&page=1"
  //     )
  //     const movies = await data.json()
  //     setPopular(movies.results)
  //     setFiltered(movies.results)
  // }

  const handleHome = () => {
    setListSer({})
  }

    return (
        <div>
            <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
                
                <Search setListSer={setListSer} setMovieItems={setMovieItems} />
                {!listSer.results &&
                  (<Filter setPageEx={setPageEx} setActiveGenre={setActiveGenre} />)
                }
                {listSer.results && (
                <button onClick={handleHome} className={"text-5xl py-2 font-bold"}>Home</button>
                )}

                <div className="flex flex-col gap-2 max-w-6xl p-6 my-2 bg-gray-800 rounded-lg">
                  {/* <h1 className="text-2xl font-bold text-center">Page {pageEx}</h1> */}
                  <div className='flex flex-wrap gap-6 '>
                    {
                    listSer.results

                    ?

                    listSer.results .map( (movie, index) =>(
                      <Link key={index} to={`/movie/${movie.id}_${movie.title}`} >
                        <Poster movie={movie} />
                      </Link>
                    ))

                    :

                    movieItems.map( (movie, index) =>(
                      <Link key={index} to={`/movie/${movie.id}_${movie.title}`} >
                        <Poster movie={movie} />
                      </Link>
                    ))
                    }
                  </div>
                </div>
                {!listSer.results && (<div className="flex justify-between gap-2 bg-gray-600 bg-opacity-30 py-2 px-4 rounded">
                    <button onClick={() => prevPage()}>Prev</button>
                    {listPage.map((page, index) => (
                      <button key={index} onClick={() => handlePage(page)}>{page}</button>
                    ))}
                    <input type="text" placeholder='...' 
                        onChange={e => e.target.value ? handlePage(e.target.value) : handlePage(pageEx)}
                        className="text-white w-6 bg-gray-800 text-center" 
                    />
                    <button onClick={() => handlePage(500)}>{500}</button>
                    <button onClick={() => nextPage()}>Next</button>
                </div>)}
            </div>
        </div>
  )
}

export default Catalog


