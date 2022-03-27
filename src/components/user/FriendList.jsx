import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
  getDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase/clientApp";
import Chat from "./Chat";

const FriendList = () => {
  const [anotherUser, setAnotherUser] = useState();
  const [userArray, setUserArray] = useState([]);
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState();
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;
  const getArrayUser = async () => {
    const docRef = collection(firestore, "user");
    let docSnap = await getDocs(docRef);
    const temp = [];
    docSnap.forEach((doc) => {
      temp.push(doc._document.data.value.mapValue.fields);
    });
    setUserArray(temp);
  };

  // CreateGroup
  const createGroup = async (userArray, createBy) => {
    const groupItem = {
      createAt: new Date(),
      createBy,
      members: userArray,
    };
    return new Promise((resolve, reject) => {
      firestore
        .collection("group")
        .add(groupItem)
        .then(function (docRef) {
          groupItem.id = docRef.id;
          this.fetchGroupByUserID(this.user.uid);
          resolve(groupItem);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  };

  const chooseUser = async (user) => {
    setAnotherUser(user);
    let group = await this.filterGroup([this.user.uid, user.uid.stringValue]);
    if (group == null) {
      group = await this.createGroup(
        [this.user.uid, user.uid.stringValue],
        this.user.uid
      );
    }
    this.chooseGroup(group);
  };

  // FilterGroup
  // let unsubFilterGroup;
  // const filterGroup = (userArray) => {
  //   let groupRef = collection(firestore, "group");
  //   const allGroups = [];
  //   userArray.forEach((userId) => {
  //     groupRef = query(groupRef, where("members", "==", userId));
  //   });

  //   if (allGroups.length > 0) {
  //     groups.push(allGroups[0]);
  //   } else {
  //     groups.length = 0;
  //   }
  // };

  // const chooseGroup = async (group) => {
  //   setMessages([]);
  //   setCurrentGroup(group);
  //   await fetchUserByGroup(currentGroup);
  //   // setTimeout(async () => {
  //   //   await fetchMessagesByGroupId(currentGroup.id);
  //   // }, 200);
  // };
  // const fetchUserByGroup = async (groupId) => {
  //   const groups = [];
  //   // const groupRefDoc = doc(collection(firestore, "group"), groupId);
  //   // groupRefDoc.forEach((doc) => {
  //   //   console.log(doc);
  //   // });
  // };

  // const filterUser = (item, queryText, itemText) => {
  //   const textOne = item.displayName.toLowerCase();
  //   const textTwo = item.email.toLowerCase();
  //   const searchText = queryText.toLowerCase();
  //   return textOne.include(searchText) || textTwo.include(searchText);
  // };
  // const updateGroup = (group) => {
  //   const groupRefDoc = doc(collection(firestore, "group"), group.id);
  //   setDoc(groupRefDoc, group);
  // };

  // // Save Message
  // const saveMessage = async (textMessage, currentGroupId, e) => {
  //   e.preventDefault();
  //   if (textMessage) {
  //     const message = {
  //       textMessage,
  //       sentAt: new Date(),
  //       sentBy: authUid,
  //     };
  //     await addDoc(
  //       collection(firestore, `message/${currentGroupId}/messages`),
  //       message
  //     );
  //   }
  //   setNewMessage("");
  // };
  // const sendMessage = async () => {
  //   const sentAt = new Date();
  //   const message = await saveMessage(message, sentAt, currentGroup.id);
  //   if (message) {
  //     setMessage(null);
  //     const group = {
  //       ...currentGroup,
  //       ...{
  //         users: null,
  //         modifiedAt: sentAt,
  //         recentMessage: { ...message, ...{ readBy: [] } },
  //       },
  //     };
  //     updateGroup(group);
  //   }
  // };
  // // Fetch Message for group ID
  // let unsubFetchMessageForGroupId;
  // const fetchMessagesByGroupId = (groupId) => {
  //   const refColletion = query(
  //     collection(firestore, `message/${groupId}/messages`),
  //     orderBy("sentAt")
  //   );
  //   unsubFetchMessageForGroupId = onSnapshot(refColletion, (snapshot) => {
  //     const allMessages = [];
  //     snapshot.forEach((doc) => {
  //       if (doc) allMessages.push(doc.data());
  //     });
  //     setMessages(allMessages);
  //   });
  // };

  useEffect(() => {
    getArrayUser();
    return () => {
      // unsubFilterGroup();
    };
  }, []);

  return (
    <div className=" w-[600px] bg-blue-700 rounded-lg ">
      {!anotherUser &&
        userArray.map((user, index) => (
          <div key={index} className="flex relative  overflow-hidden p-4">
            <div className="w-12 h-12 " />
            <div className=" absolute top-4 left-2 w-12 h-12 bg-white rounded-full " />
            <div className="flex flex-col">
              <button
                onClick={() => chooseUser(user)}
                className="hover:underline"
              >
                {user.email.stringValue}
              </button>
              <div>Message</div>
            </div>
          </div>
        ))}
      {anotherUser && (
        <Chat
          setAnotherUser={setAnotherUser}
          anotherUser={anotherUser}
          userArray={userArray}
          // fetchMessagesByGroupId={fetchMessagesByGroupId}
          // sendMessage={sendMessage}
          messages={messages}
        />
      )}
    </div>
  );
};

export default FriendList;
