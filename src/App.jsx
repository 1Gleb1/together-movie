import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./page/Main";
import Movie from "./page/Movie";
import Together from "./page/room/[slug]";
import User from "./page/User";

function App() {
  return (
    <div className="w-full min-h-screen text-white bg-gray-800">
      {/* flex flex-col justify-center items-center */}

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movie/:slug" element={<Movie />} />
        <Route path="/user" element={<User />} />
        <Route path="/room/:slug/:slug" element={<Together />} />
      </Routes>
    </div>
  );
}

export default App;
