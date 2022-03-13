import React from "react";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

const FavoriteList = ({ title, handleAdd, inList, handleDelete }) => {
  console.log(inList);
  return (
    <div>
      {inList ? (
        <button
          onClick={() => handleDelete(title)}
          className="mt-2 w-8 sm:w-10 sm:h-10 flex justify-center items-center bg-rose-800 rounded-full"
        >
          <AiOutlineMinusCircle className="text-3xl" />
        </button>
      ) : (
        <button
          onClick={handleAdd}
          className="mt-2 w-8 sm:w-10 sm:h-10 flex justify-center items-center bg-sky-800 rounded-full"
        >
          <AiOutlinePlusCircle className="text-3xl" />
        </button>
      )}
    </div>
  );
};

export default FavoriteList;
