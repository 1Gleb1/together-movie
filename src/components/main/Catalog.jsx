import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Filter from "./Filter";
import Pagination from "./Pagination";
import Poster from "../Poster";
import Search from "./Search";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination as SwiperPagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

const Catalog = () => {
  const [activeGenre, setActiveGenre] = useState([]);
  const [listSer, setListSer] = useState({});
  const [movieItems, setMovieItems] = useState([]);
  const [pageEx, setPageEx] = useState(1);
  const [popularList, setPopularList] = useState([]);
  const imageCollection = [];

  popularList.forEach((item) => {
    const image = apiConfig.originalImage(item.backdrop_path);
    imageCollection.push(image);
  });

  useEffect(() => {
    const getMoviesWithGeter = async () => {
      const params = { page: pageEx };
      const popular = { page: 1 };
      try {
        const response = await tmdbApi.getMovieByCategory(activeGenre, {
          params,
        });
        const result = await tmdbApi.getMovieByCategory({ popular });
        setMovieItems(response.results);
        setPopularList(result.results);
      } catch {
        console.log("error");
      }
    };

    getMoviesWithGeter();
  }, [activeGenre, pageEx, listSer]);

  const handleHome = () => {
    setListSer({});
  };

  return (
    <div className="w-full min-h-screen bg-black bg-opacity-80">
      <div className="py-2">
        {/* <h2 className='text-3xl font-bold ml-6 sm:ml-12 pb-4'>Popular</h2> */}
        <Swiper
          modules={[EffectCoverflow, SwiperPagination]}
          spaceBetween={80}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 8000 }}
          className="relative rounded-xl min-w-[300px] max-w-[1300px]"
        >
          {popularList.map((item, index) => (
            <SwiperSlide key={index}>
              <Link Link to={`/movie/${item.id}_${item.title}`}>
                <img
                  src={imageCollection[index]}
                  className="object-cover rounded-xl overflow-hidden relative top-0 "
                  alt={item.title}
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent via-transparent to-[#111827D9]" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex justify-center pt-4">
        <Search setListSer={setListSer} setMovieItems={setMovieItems} />
      </div>

      {!listSer.results && (
        <div className="py-2">
          <Filter
            setPageEx={setPageEx}
            setActiveGenre={setActiveGenre}
            activeGenre={activeGenre}
          />
        </div>
      )}
      {listSer.results && (
        <button onClick={handleHome} className={"text-5xl py-2 font-bold"}>
          Home
        </button>
      )}
      <div className="m-auto pt-6 px-6 my-2 rounded-lg max-w-[1100px]">
        <div className="flex flex-wrap gap-8 justify-center my-2">
          {/* For Serch List */}
          {listSer.results &&
            listSer.results.map((movie, index) => (
              <Link key={index} to={`/movie/${movie.id}_${movie.title}`}>
                {movie.poster_path && <Poster movie={movie} />}
              </Link>
            ))}
          {/* For All List */}
          {!listSer.results &&
            movieItems.map((movie, index) => (
              <Link key={index} to={`/movie/${movie.id}_${movie.title}`}>
                {movie.poster_path && movie.vote_average !== 0 && (
                  <Poster movie={movie} />
                )}
              </Link>
            ))}
        </div>
      </div>

      <div className="py-2">
        <Pagination listSer={listSer} pageEx={pageEx} setPageEx={setPageEx} />
      </div>
    </div>
  );
};

export default Catalog;