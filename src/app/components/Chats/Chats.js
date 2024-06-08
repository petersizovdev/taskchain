/* eslint-disable @next/next/no-img-element */
import styles from "./chats.module.scss";
import { doc, onSnapshot, deleteDoc, setDoc, deleteField } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db } from "@/app/api/firebase";
import { FiMinus, FiCheck, FiX, FiEdit3 } from "react-icons/fi";

const Chats = () => {
  const [chats, setChats] = useState({});
  const [delet, setDelet] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext) || {};

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data() || {});
      });
      return () => {
        unsub();
      };
    };
    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  const deleteChat = async (chatId) => {
    try {
      await deleteDoc(doc(db, "chats", chatId));
      // Remove chat reference from the user's chats
      const userChatsRef = doc(db, "userChats", currentUser.uid);
      await setDoc(userChatsRef, { [chatId]: deleteField() }, { merge: true });
    } catch (err) {
      console.error("Error deleting chat:", err);
    }
  };

  return (
    <div className={styles.chats}>
      {Object.entries(chats ?? {})
        .sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className={styles.userChat}
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <div className={styles.chatInfo}>
              <img src={chat[1].userInfo.photoURL} alt="" />
              <span>{chat[1].userInfo.displayName}</span>
            </div>
            <p className={styles.msgPrev}>
              {chat[1].lastMessage?.text.slice(0, 8)}
              {chat[1].lastMessage?.text.length > 8 ? "..." : ""}
            </p>
            <div className={styles.delet}>
              {delet ? (
                <div className={styles.deletAsk}>
                  <div
                    onClick={() => {
                      deleteChat(chat[0]);
                    }}
                  >
                    <FiCheck />
                  </div>
                  <div
                    onClick={() => {
                      setDelet(false);
                    }}
                  >
                    <FiX />
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => {
                    setDelet(true);
                  }}
                >
                  <FiMinus />
                </div>
              )}
            </div>
          </div>
        ))}
 
    </div>
  );
};

export default Chats;