import Message from "../Message/Message";
import styles from "./chatbox.module.scss";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "@/app/context/ChatContext";
import { db } from "@/app/api/firebase";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className={styles.chatBox}>
      {messages == 0 ? (
        <h5>Начните диалог</h5>
      ) : (
        messages.map((m) => <Message message={m} key={m.id} />)
      )}
    </div>
  );
};

export default ChatBox;
