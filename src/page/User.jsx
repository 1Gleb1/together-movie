import React, { useEffect, useState } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { firestore } from "../firebase/clientApp";
import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
  where,
  addDoc,
  setDoc,
} from "firebase/firestore";
import Poster from "../components/Poster";
import { Link } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import Login from "../components/user/Register";
import SignIn from "../components/user/SignIn";
import Chat from "../components/user/Chat";
import FriendList from "../components/user/FriendList";

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

  const provider = new GoogleAuthProvider();
  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => console.log(result));
  };

  const uid = auth.currentUser ? auth.currentUser.uid : "";
  // "99BnqKaocoP42kJmKo6HJju4kUu1"
  // "OLlL93ccYOZy6D0YQzyDR1eJBFA3"

  //Save User
  const saveUser = async (user) => {
    const userCollection = collection(firestore, "user");
    const itemUser = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
    };
    await setDoc(doc(firestore, "user", user.uid), itemUser);
    console.log(userCollection);
  };

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
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUser(true);
        saveUser(user);
      } else {
        setIsUser(false);
      }
    });
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

      {isUser && (
        <div className="flex flex-col sm:flex-row justify-between max-w-7xl w-full">
          {/* <div>
            <h2 className="text-center text-xl font-bold bg-slate-700 text-white rounded-lg py-2 mb-2">
              Chat
            </h2>
            <Chat />
          </div> */}
          <div>
            <h2 className="text-center text-xl font-bold bg-slate-700 text-white rounded-lg py-2 mb-2">
              FrienList
            </h2>
            <FriendList />
          </div>
          <div>
            <span>watch later</span>
            <div className="max-w-xl flex flex-wrap gap-5">
              {favoriteList.map((item, index) => (
                <div key={index}>
                  <Link
                    to={`/movie/${item.data().id}_${
                      item.data().original_title
                    }`}
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
          </div>
          <div />
        </div>
      )}
    </div>
  );
};

export default User;
