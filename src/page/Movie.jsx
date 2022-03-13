import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiConfig from "../api/apiConfig";
import tmdbApi from "../api/tmdbApi";
import Poster from "../components/Poster";
import { firestore } from "../firebase/clientApp";
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import FavoriteList from "../components/FavoriteList";

const Movie = () => {
  const [movie, setMovie] = useState({});
  const image = apiConfig.originalImage(movie.backdrop_path);
  const imgW500 = apiConfig.w500Image(movie.poster_path);
  const params = useParams();
  const chank = params.slug.split("_");
  const id = chank[0];
  const [collectionMovie, setCollectionMovie] = useState([]);

  const [inList, setInList] = useState(false);
  let unsub;

  const handleAdd = async () => {
    const newItem = movie;
    await addDoc(collection(firestore, "favorite"), newItem);
  };

  // ДУБЛИКАТ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const [favoriteList, setFavoriteList] = useState([]);
  const favoriteCollection = collection(firestore, "favorite");
  const favoriteListQuery = query(favoriteCollection);

  const getFavoriteList = async () => {
    unsub = onSnapshot(favoriteListQuery, (snapshot) => {
      const result = [];
      snapshot.forEach((doc) => result.push(doc));
      setFavoriteList(result);
    });
  };

  const handleDelete = async (index) => {
    let temp;
    let delItem;
    favoriteList.forEach((item) => {
      temp = item._document.data.value.mapValue.fields.title.stringValue;
      if (temp == index) {
        delItem = temp.id;
        console.log(delItem);
      }
    });
    const itemRef = doc(firestore, "favorite", delItem);
    await deleteDoc(itemRef);
  };

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  useEffect(() => {
    getFavoriteList();
    const getMovie = async () => {
      try {
        const response = await tmdbApi.getMovie(id);
        setMovie(response);
        if (movie.backdrop_path !== null) {
          const idCollection = await response.belongs_to_collection.id;
          const resColl = await tmdbApi.getCollection(idCollection);
          setCollectionMovie(resColl.parts);
        }
      } catch {
        console.log("error");
      }
    };
    // window.scrollTo(0, 0);
    getMovie();
    return () => {
      unsub();
    };
  }, [id]);

  return (
    <div className="w-full min-h-sreen flex flex-col justify-center items-center ">
      <div className="relative ">
        <img src={image} />
        <div
          className="
                    absolute top-0 right-0 bottom-0 left-0 
                    bg-gradient-to-t from-gray-900 to-transparent"
        >
          <div className="absolute -bottom-14 left-10 sm:bottom-24 sm:left-20">
            <div className="flex gap-6 items-center">
              <div className={`w-full max-w-[100px] sm:max-w-[200px]`}>
                <img src={imgW500} alt={movie.title} />
              </div>
              <div className=" flex flex-col flex-wrap text-white leading-none">
                <span className="flex items-center gap-8 font-black text-sm sm:text-3xl">
                  {movie.title}
                </span>
                <br />
                <span className="text-sm sm:text-2xl">{movie.overview}</span>
                <FavoriteList
                  movie={movie.title}
                  handleAdd={handleAdd}
                  inList={inList}
                  handleDelete={handleDelete}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 flex justify-center bg-gray-700  w-full h-[250px] sm:h-[520px]">
        {/* max-w-7xl w-full h-[520px] */}
        <div className="relative w-full max-w-[340px] sm:max-w-[720px]">
          <iframe
            src={`https://74.svetacdn.in/DRQQUUcW0qvr?imdb_id=${movie.imdb_id}`} //imdb_id=${movie.imdb_id}
            className="absolute w-[340px] sm:w-[720px] h-[250px] sm:h-[520px]" // w-[720px] h-[520px]
            frameborder="1"
            allowFullScreen
          />
        </div>
      </div>

      <div className="flex gap-8 flex-wrap pt-8">
        {collectionMovie &&
          collectionMovie.map((movie, index) => (
            <Link key={index} to={`/movie/${movie.id}_${movie.original_title}`}>
              {movie.poster_path && <Poster movie={movie} />}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Movie;
