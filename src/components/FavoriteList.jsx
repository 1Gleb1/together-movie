import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

const FavoriteList = ({ handleAdd }) => {
  return (
    <div>
      <div class="dropdown dropdown-hover">
        <label tabindex="0" className="">
          <AiOutlinePlusCircle className="text-4xl" />
        </label>
        <ul
          tabindex="0"
          class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <p onClick={handleAdd}>Wishlist</p>
          </li>
          <input type="text" placeholder="New playlist" className="input" />
        </ul>
      </div>
    </div>
  );
};

export default FavoriteList;
