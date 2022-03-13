import React, { useState, useEffect } from "react";
import tmdbApi from "../api/tmdbApi";

const Search = ({ setListSer }) => {
  const [keyword, setKeyword] = useState("");
  const [searchList, setSearchList] = useState({});

  // const getMovie = async () => {
  //     try {
  //         setSearchList({})
  //         const response = await tmdbApi.getMoviesListBySearch(keyword)
  //         setSearchList(response)
  //         setListSer(searchList)
  //         console.log(searchList);
  //     } catch {
  //         console.log('error');
  //     }
  // }

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await tmdbApi.getMoviesListBySearch(keyword);
        setListSer(response);
      } catch {
        console.log("error");
      }
    };
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        getMovie();
        setKeyword("");
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword]);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your movie"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="bg-indigo-900 p-2 rounded"
      />
    </div>
  );
};

export default Search;
