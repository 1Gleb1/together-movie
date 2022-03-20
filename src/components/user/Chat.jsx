import React, { useEffect, useState } from "react";
import { GrSend } from "react-icons/gr";
import { getDatabase, onValue, push, ref } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import moment from "moment";

const Chat = ({ anotherUser }) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState();
  const auth = getAuth();
  const db = getDatabase();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.length > 0) {
      push(
        ref(
          db,
          anotherUser
            ? `message/${auth.currentUser.uid}_${anotherUser}`
            : "messages"
        ),
        {
          username: user.displayName,
          email: user.email,
          uid: user.uid,
          text: newMessage,
          timestamp: Date.now(),
        }
      );
      setNewMessage("");
    }
  };

  useEffect(() => {
    const messagesRef = ref(
      db,
      anotherUser
        ? `message/${auth.currentUser.uid}_${anotherUser}`
        : "messages"
    );
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
    <div className="bg-gray-700 p-4 rounded-lg flex flex-col h-screen w-[600px]">
      <h5 className=" font-bold mb-3 text-center">
        {anotherUser ? anotherUser : "Общий Чат"}
      </h5>
      <div className=" flex flex-col flex-grow overflow-auto rounded-lg bg-[#111E41] p-2  ">
        {/*  */}
        {messages.map((message, index) => (
          <div className="flex relative" key={index}>
            <div className="w-12 h-12 " />
            <div className=" absolute top-3 left-1 w-12 h-12 bg-white rounded-full " />

            <div
              className={`rounded-2xl text-sky-400 flex flex-col p-3 w-[60%] relative`}
            >
              <div className="flex flex-col items-start">
                <h6 className="font-basic text-md flex gap-8 items-center">
                  <span className="text-xl whitespace-nowrap">
                    {message.username}
                  </span>
                  <span className="text-[1rem] whitespace-nowrap">
                    {moment(message.timestamp).startOf("minutes").fromNow()}
                  </span>
                </h6>
                <div className=" w-full">
                  <p className="my-[2px] leading-[1rem] break-words text-white text-lg  ">
                    {message.text}
                  </p>
                </div>
              </div>
              {/* <i className=" text-xs text-white text-opacity-80 absolute right-2 bottom-1"></i> */}
            </div>
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
