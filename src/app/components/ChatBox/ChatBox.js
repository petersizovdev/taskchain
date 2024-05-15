import Message from "../Message/Message";
import styles from "./chatbox.module.scss";

const ChatBox = () => {
  return (
    <div className={styles.chatBox}>
      <Message /> <Message /> <Message /> <Message /> <Message /> <Message />{" "}
      <Message /> <Message /> <Message /> <Message /> <Message /> <Message />{" "}
      <Message /> <Message /> <Message /> <Message /> <Message /> <Message />{" "}
      <Message /> <Message /> <Message /> <Message /> <Message /> <Message />{" "}
      <Message /> <Message /> <Message /> <Message /> <Message /> <Message />{" "}
      <Message /> <Message /> <Message /> <Message /> <Message /> <Message />
    </div>
  );
};

export default ChatBox;
