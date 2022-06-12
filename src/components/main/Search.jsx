import React, { useState, useEffect } from "react";
import tmdbApi from "../../api/tmdbApi";
import { AiOutlineSearch } from "react-icons/ai";

const Search = ({ setListSer }) => {
  const [keyword, setKeyword] = useState("");

  const getMediaBySearch = async () => {
    const tvAndMovie = [];
    try {
      const responseMovie = await tmdbApi.getMoviesListBySearch(keyword);
      const responseTv = await tmdbApi.getTvBySearch(keyword);
      responseMovie.results.push(responseTv.results[0]);
      tvAndMovie.push(responseMovie.results);
      setListSer(responseMovie, responseTv);
    } catch {
      console.log("error");
    }
  };

  const enterEvent = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      getMediaBySearch();
      setKeyword("");
    }
  };

  useEffect(() => {
    document.removeEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword]);

  return (
    <div className="mb-2">
      {/* <input
        type="text"
        placeholder="Enter your movie"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="bg-indigo-900 p-2 rounded"
      /> */}
      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="input input-border"
          />
          <button className="btn btn-square" onClick={() => getMediaBySearch()}>
            <AiOutlineSearch className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
