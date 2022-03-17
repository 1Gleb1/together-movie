import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import Chat from "../../components/user/Chat";

const Together = () => {
  const [movie, setMovie] = useState({});
  const params = useParams();
  const chank = params.slug.split("_");
  const imdbId = chank[0];

  // PLAYER

  //
  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await tmdbApi.getMovie(imdbId);
        setMovie(response);
      } catch {
        console.log("error");
      }
    };
    getMovie();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col sm:flex-row bg-green-700">
      <div className="relative w-full max-w-[340px] sm:max-w-[75%] h-screen">
        {/* <iframe
          src={`../../playerJs/player.js?file=https://74.svetacdn.in/DRQQUUcW0qvr?imdb_id=${movie.imdb_id}`}
          type="text/html"
          className="w-full h-full"
          frameborder="0"
          allowfullscreen
        /> */}

        <iframe
          title={movie.title}
          src={`https://74.svetacdn.in/DRQQUUcW0qvr?imdb_id=${movie.imdb_id}`}
          className="absolute min-w-[300px] w-full h-[250px] sm:h-full"
          frameBorder="0"
          allowFullScreen
        />
      </div>
      {/* <div>
        <Chat />
      </div> */}
    </div>
  );
};

export default Together;
