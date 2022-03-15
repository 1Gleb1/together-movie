import React, { useEffect, useState } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoSignOut } from "react-icons/go";
import { firestore } from "../firebase/clientApp";
import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
  where,
} from "firebase/firestore";
import Poster from "../components/Poster";
import { Link } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Login from "../components/user/Register";
import SignIn from "../components/user/SignIn";

const User = () => {
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const handleLoginForm = () => {
    setIsRegisterForm(false);
  };
  const handleRegisterForm = () => {
    setIsRegisterForm(true);
  };
  // AUTH
  const [isUser, setIsUser] = useState(false);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  });
  const provider = new GoogleAuthProvider();
  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => console.log(result));
  };
  const handleLogOut = () => {
    signOut(auth);
  };

  const uid = auth.currentUser ? auth.currentUser.uid : "";

  // GET LIST
  const [favoriteList, setFavoriteList] = useState([]);
  const favoriteCollection = collection(firestore, "favorite");
  const favoriteListQuery = query(favoriteCollection, where("uid", "==", uid));
  let unsub;

  const getFavoriteList = async () => {
    unsub = onSnapshot(favoriteListQuery, (snapshot) => {
      const result = [];
      snapshot.forEach((doc) => result.push(doc));
      setFavoriteList(result);
    });
  };

  const handleDelete = async (index) => {
    const itemRef = doc(firestore, "favorite", favoriteList[index].id);
    await deleteDoc(itemRef);
  };

  useEffect(() => {
    getFavoriteList();
    return () => {
      unsub();
    };
  }, [isUser]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center gap-8">
      {auth.currentUser == null && (
        <div className="">
          {isRegisterForm && (
            <div>
              <h3 className="text-center text-xl font-medium">Register</h3>
              <Login />
              <div className="mt-4 flex items-start justify-between">
                <button onClick={handleLoginForm}>Login</button>
                {
                  <button onClick={handleSignInWithGoogle}>
                    <AiFillGoogleCircle className="w-12 h-12" />
                  </button>
                }
              </div>
            </div>
          )}
          {!isRegisterForm && (
            <div>
              <h3 className="text-center text-xl font-medium">Login</h3>
              <SignIn />
              <div className="mt-4 flex items-start justify-between">
                <button onClick={handleRegisterForm}>Register</button>
                {
                  <button onClick={handleSignInWithGoogle}>
                    <AiFillGoogleCircle className="w-12 h-12" />
                  </button>
                }
              </div>
            </div>
          )}
        </div>
      )}

      <div>
        <span>watch later</span>
        {isUser && (
          <div className="max-w-xl flex flex-wrap gap-5">
            {favoriteList.map((item, index) => (
              <div key={index}>
                <Link
                  to={`/movie/${item.data().id}_${item.data().original_title}`}
                >
                  {item.data().poster_path && <Poster movie={item.data()} />}
                </Link>
                <button
                  onClick={() => handleDelete(index)}
                  className="w-full text-lg font-medium rounded-lg mt-2 py-3 px-4 bg-gradient-to-b from-rose-700 to-pink-900 hover:from-rose-800 hover:to-red-900 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        {!isUser && <div>Авторизируйтесь</div>}
      </div>
    </div>
  );
};

export default User;
