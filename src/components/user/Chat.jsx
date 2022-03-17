import React, { useEffect, useState } from "react";
import { GrSend } from "react-icons/gr";
import { getDatabase, onValue, push, ref } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState();
  const auth = getAuth();
  const db = getDatabase();
  //   console.log(auth.currentUser.displayName);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });
  console.log(newMessage);
  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.length > 0) {
      push(ref(db, "messages"), {
        username: user.displayName,
        email: user.email,
        uid: user.uid,
        text: newMessage,
        timestamp: Date.now(),
      });
      setNewMessage("");
    }
  };

  useEffect(() => {
    const messagesRef = ref(db, "messages");
    onValue(messagesRef, (snapshot) => {
      let data = snapshot.val();
      let messagesTmp = [];
      Object.keys(data).forEach((key) => {
        messagesTmp.push({
          id: key,
          ...data[key],
        });
      });
      setMessages(messagesTmp);
    });
  }, []);

  return (
    <div className="bg-gray-700 p-4 w-80 rounded-lg flex flex-col h-screen max-h-screen">
      <h5 className=" text-left font-bold mb-3">Name</h5>
      <div className=" flex flex-col flex-grow overflow-auto rounded-lg bg-slate-900 p-2">
        {/*  */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={` bg-slate-800 rounded-lg text-white p-3 w-[80%] relative mb-2 ${
              message.uid === user.uid ? "bg-slate-600 self-end" : "bg-red-500"
            }`}
          >
            <h6 className="font-medium italic">{message.username}</h6>
            <p className="my-3 leading-[1rem]">{message.text}</p>
            <i className=" text-xs text-white text-opacity-80 absolute right-2 bottom-2">
              {/* {message.timestamp} */}
            </i>
          </div>
        ))}
        {/*  */}
      </div>
      <div className="my-2">
        <form className="flex flex-grow">
          <input
            type="text"
            className={`bg-gray-800 text-white pl-3 py-3 w-full rounded-l-lg `}
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
          />
          <button
            type="submit"
            onClick={sendMessage}
            className={`bg-emerald-700 px-4 flex justify-center items-center rounded-r-lg`}
          >
            <GrSend className="text-slate-300 text-lg " color="white" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
