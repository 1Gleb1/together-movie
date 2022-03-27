import React, { useEffect, useState } from "react";
import { GrSend } from "react-icons/gr";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import moment from "moment";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";

const Chat = ({
  setAnotherUser,
  anotherUser,
  userArray,
  fetchMessagesByGroupId,
  sendMessage,
  messages,
}) => {
  const { uid, displayName, email } = anotherUser;
  const [newMessage, setNewMessage] = useState("");
  const [currentGroupId, setCurrentGroupId] = useState();
  const [group, setGroup] = useState([]);

  const auth = getAuth();
  const authUid = auth.currentUser.uid;

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="bg-gray-700 p-4 rounded-lg flex flex-col h-screen w-[600px]">
      <div className="flex justify-between items-center">
        <button onClick={() => setAnotherUser()}>Back</button>
        <h5 className=" font-bold mb-3 text-center">
          {displayName.stringValue}
        </h5>
        <div />
      </div>
      {/*  */}
      <div className=" flex flex-col flex-grow overflow-auto rounded-lg bg-[#111E41] p-2  ">
        {messages.map((message, index) => (
          <div className="flex relative" key={index}>
            <div className="w-12 h-12 " />
            <div className=" absolute top-3 left-1 w-12 h-12 bg-white rounded-full" />

            <div
              className={`rounded-2xl text-sky-400 flex flex-col p-3 w-[60%] relative self-end`}
            >
              <div className="flex flex-col">
                <h6 className="font-basic text-md flex gap-8 items-center">
                  <span className="text-xl whitespace-nowrap">
                    {message.sentBy}
                  </span>
                  <span className="text-[1rem] whitespace-nowrap">
                    {/* {moment(message.timestamp).startOf("minutes").fromNow()} */}
                  </span>
                </h6>
                <div className=" w-full">
                  <p className="my-[2px] leading-[1rem] break-words text-white text-lg  ">
                    {message.textMessage}
                  </p>
                </div>
              </div>
              {/* <i className=" text-xs text-white text-opacity-80 absolute right-2 bottom-1"></i> */}
            </div>
          </div>
        ))}
      </div>
      {/*  */}
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
            onClick={(e) => sendMessage(newMessage, currentGroupId, e)}
            type="submit"
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
