import React, { useContext } from "react";
import ChatBox from "../ChatBox/ChatBox";
import Input from "../Input/Input";
import styles from "./chat.module.scss";
import { ChatContext } from "../../context/ChatContext";
import DocSaver from "../DocSaver/DocSaver";

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className={styles.chat}>
      <div className={styles.chatInfo}>
        <h3>{data.user?.displayName}</h3>

        <DocSaver />
      </div>
      <ChatBox />
      <Input />
    </div>
  );
};

export default Chat;
