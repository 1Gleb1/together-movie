import React, { useEffect, useState } from "react";
import { firestore } from "../firebase/clientApp";
import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Poster from "../components/Poster";
import { Link } from "react-router-dom";

const User = () => {
  const [favoriteList, setFavoriteList] = useState([]);
  const favoriteCollection = collection(firestore, "favorite");
  const favoriteListQuery = query(favoriteCollection);
  let unsub;

  const getFavoriteList = async () => {
    unsub = onSnapshot(favoriteListQuery, (snapshot) => {
      const result = [];
      snapshot.forEach((doc) => result.push(doc));
      setFavoriteList(result);
    });
  };

  useEffect(() => {
    getFavoriteList();
    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (index) => {
    const itemRef = doc(firestore, "favorite", favoriteList[index].id);
    await deleteDoc(itemRef);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <span>watch later</span>
      <div className="max-w-xl flex flex-wrap gap-5">
        {favoriteList.map((item, index) => (
          <div key={index}>
            <Link to={`/movie/${item.data().id}_${item.data().original_title}`}>
              {item.data().poster_path && <Poster movie={item.data()} />}
            </Link>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
