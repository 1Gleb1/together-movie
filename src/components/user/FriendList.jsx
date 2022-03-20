import React, { useState } from "react";
import Chat from "./Chat";

const FriendList = () => {
  const anotherUser = "valademerovetcv";
  const [isChat, setIsChat] = useState(false);
  return (
    <div className=" w-[600px] bg-blue-700 rounded-lg ">
      {!isChat && (
        <div className="flex relative  overflow-hidden p-4">
          <div className="w-12 h-12 " />
          <div className=" absolute top-4 left-2 w-12 h-12 bg-white rounded-full " />
          <div className="flex flex-col">
            <button onClick={() => setIsChat(true)} className="hover:underline">
              {anotherUser}
            </button>
            <div>Message</div>
          </div>
        </div>
      )}
      {isChat && <Chat anotherUser={anotherUser} />}
    </div>
  );
};

export default FriendList;
