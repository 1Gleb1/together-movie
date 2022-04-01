import { motion } from "framer-motion";
import React from "react";
import apiConfig from "../api/apiConfig";

const Poster = ({ movie, index }) => {
  const title = {
    hidden: { opacity: 0, y: 90 },
    view: { opacity: 1, y: 0 },
  };
  const appear = {
    hidden: { opacity: 0, scale: 0 },
    view: { opacity: 0, scale: 0 },
  };

  const imgW500 = apiConfig.w500Image(movie.poster_path);
  return (
    <motion.div
      className="text-white overflow-hidden relative rounded-lg"
      whileHover={{ scale: 1.1 }}
      transition={{
        ease: "easeInOut",
        duration: 0.3,
      }}
    >
      <motion.div
        variants={appear}
        initial={"view"}
        animate={{ opacity: 1, scale: 1 }}
        exit={"hidden"}
        transition={{
          ease: "easeInOut",
          duration: index < 15 ? (2 + index) / 10 : 1.6,
        }}
      >
        {" "}
        {/* relative */}
        <div className="absolute top-1 right-1">
          <div>
            <p
              className={`w-10 h-10 flex justify-center items-center text-white font-medium ${
                movie.vote_average < 5 ? "bg-red-600" : "bg-emerald-600"
              } rounded-full text-shdow`}
            >
              {movie.vote_average !== 10
                ? movie.vote_average.toFixed(1)
                : movie.vote_average}
            </p>
          </div>
        </div>
        <motion.span
          transition={{
            ease: "easeInOut",
            duration: 0.2,
          }}
          animate="hidden"
          whileHover="view"
          variants={title}
          className="absolute bg-zinc-900 bg-opacity-70 -bottom-10 left-0 right-0 top-0 text-center p-2"
        >
          <span>
            <h5 className="font-bold text-[16px] p-1">
              {movie.original_title}
            </h5>
            <p className={`text-sm leading-[1.05]`}>
              {movie.overview.length <= 260
                ? movie.overview
                : `${movie.overview.substring(0, 260)}...`}
            </p>
          </span>
        </motion.span>
        <img src={imgW500} className="object-cover w-44 h-[260px]" />
      </motion.div>
    </motion.div>
  );
};

export default Poster;
