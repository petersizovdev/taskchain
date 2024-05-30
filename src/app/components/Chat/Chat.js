import React, { useContext } from "react";
import ChatBox from "../ChatBox/ChatBox";
import Input from "../Input/Input";
import styles from "./chat.module.scss";
import { ChatContext } from "../../context/ChatContext";
import DocSaver from "../DocSaver/DocSaver";
import SideBarMenu from "../SideBar/SideBarMenu";

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className={styles.chat}>
      <div className={styles.chatInfo}>
        {data.user?.displayName ? (
          <>
            <h3>{data.user?.displayName}</h3>
            <DocSaver />
          </>
        ) : null}

        <div className={styles.chatMenu}>
          <SideBarMenu />
        </div>
      </div>
      <ChatBox />
      <Input />
    </div>
  );
};
export default Chat;
