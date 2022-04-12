import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiConfig from "../api/apiConfig";
import tmdbApi from "../api/tmdbApi";
import Poster from "../components/Poster";
import { firestore } from "../firebase/clientApp";
import { addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Player from "../components/movie/Player";
import Hero from "../components/movie/Hero";

const Movie = () => {
  const [collectionMovie, setCollectionMovie] = useState([]);
  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState();
  const image = apiConfig.originalImage(movie.backdrop_path);
  const imgW500 = apiConfig.w500Image(movie.poster_path);
  const params = useParams();
  const chank = params.slug.split("_");
  const imdbId = chank[0];

  const auth = getAuth();

  const uid = auth.currentUser ? auth.currentUser.uid : "";

  const handleAdd = async (titlePlayList) => {
    const newItem = { ...movie, uid, titlePlayList };
    await addDoc(collection(firestore, "favorite"), newItem);
  };

  //  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  const handleDelete = async (index) => {
    // let delItem;
    // favoriteList.forEach((item) => {
    //   if (item == index) {
    //   }
    // });
    // const itemRef = doc(firestore, "favorite", delItem);
    // await deleteDoc(itemRef);
  };

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await tmdbApi.getMovie(imdbId);
        setMovie(response);
        setGenres(response.genres);
        if (movie.backdrop_path !== null) {
          const idCollection = await response.belongs_to_collection.id;
          const resColl = await tmdbApi.getCollection(idCollection);
          setCollectionMovie(resColl.parts);
        }
      } catch {
        console.log("error");
      }
    };
    window.scrollTo(0, 0);
    getMovie();
    return () => {};
  }, [imdbId]);

  return (
    <div className="w-full min-h-sreen flex flex-col justify-center items-center ">
      <Hero
        auth={auth}
        uid={uid}
        image={image}
        imgW500={imgW500}
        movieTitle={movie.title}
        genres={genres}
        movieDuration={movie.runtime}
        overview={movie.overview}
        movieID={movie.id}
        originalTitle={movie.original_title}
        handleAdd={handleAdd}
      />

      <Player movieURL={movie.imdb_id} />

      <div className="flex gap-8 flex-wrap pt-8 mb-4">
        {collectionMovie &&
          collectionMovie.map((movie, index) => (
            <Link key={index} to={`/movie/${movie.id}_${movie.original_title}`}>
              {<Poster movie={movie} />}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Movie;
