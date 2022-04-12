import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "../firebase/clientApp";

const FavoriteList = ({ handleAdd, uid }) => {
  const [title, setTitle] = useState("");

  const [playList, setPlayList] = useState([]);
  const favoriteCollection = collection(firestore, "favorite");
  const favoriteListQuery = query(favoriteCollection, where("uid", "==", uid));
  let unsub;

  const getFavoriteList = async () => {
    unsub = onSnapshot(favoriteListQuery, (snapshot) => {
      const result = [];
      snapshot.forEach((doc) => result.push(doc.data().titlePlayList));
      setPlayList(result);
    });
  };
  useEffect(() => {
    getFavoriteList();
    return () => {
      unsub();
    };
  }, [playList]);

  return (
    <div>
      <div className="dropdown">
        <label tabindex="0" className="btn btn-circle btn-outline btn-ghost ">
          <AiOutlinePlusCircle className="text-4xl" />
        </label>
        <ul
          tabindex="0"
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {playList.map((title, index) => (
            <li key={index}>
              <p onClick={() => handleAdd(title)}>{title}</p>
            </li>
          ))}
          {/* <li>
            <p onClick={() => handleAdd("NewPlayList")}>NewPlayList</p>
          </li> */}
          <input
            type="text"
            placeholder="New playlist"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </ul>
      </div>
    </div>
  );
};

export default FavoriteList;
