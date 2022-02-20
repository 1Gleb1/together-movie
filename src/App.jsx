import React from "react";
import { Route, Routes } from "react-router-dom"
import Catalog from "./components/Catalog";
import Movie from "./page/Movie";

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-800 text-white "> 
    {/* flex flex-col justify-center items-center */}
      <Routes>
        <Route path="/" element={<Catalog/>} />
        <Route path="/movie/:slug" element={<Movie />} />
      </Routes>
    </div>
  );
}

export default App;
