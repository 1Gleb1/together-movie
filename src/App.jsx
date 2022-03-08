import React from "react";
import { Route, Routes } from "react-router-dom"
import Main from "./page/Main";
import Movie from "./page/Movie";
import User from "./page/User";

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-800 text-white "> 
    {/* flex flex-col justify-center items-center */}
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/movie/:slug" element={<Movie />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
