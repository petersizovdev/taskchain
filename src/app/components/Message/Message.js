import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import styles from "./message.module.scss";
import cn from "classnames";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const isSender = message.senderId === currentUser.uid;

  const messageDate = new Date(message.date.toMillis());
  const formattedDate = messageDate.toLocaleString("ru-RU", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div
      ref={ref}a
      className={cn(styles.message, isSender ? styles.owner : styles.receiver)}
    >
      <div className={styles.messageInfo}>
        <img
          src={isSender ? currentUser.photoURL : data.user.photoURL}
          alt=""
        />
      </div>
      <div className={styles.messageContent}>
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
        <span>{formattedDate}</span>
      </div>
    </div>
  );
};

export default Message;
