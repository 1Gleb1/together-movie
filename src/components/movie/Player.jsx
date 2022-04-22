import React from "react";

const Player = ({ movieURL }) => {
  return (
    <div className="mt-20 flex justify-center bg-gray-700  w-full h-[250px] sm:h-[520px]">
      <div className="relative w-full max-w-[340px] sm:max-w-[720px]">
        <iframe
          src={`https://74.svetacdn.in/DRQQUUcW0qvr?imdb_id=${movieURL}`} //imdb_id=${movie.imdb_id}
          className="absolute w-[340px] sm:w-[720px] h-[250px] sm:h-[520px]"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default Player;
