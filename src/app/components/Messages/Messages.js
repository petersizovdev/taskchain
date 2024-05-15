import Chat from "../Chat/Chat";
import SideBar from "../SideBar/SideBar";
import styles from "./messages.module.scss";

const Messages = () => {
  return (
    <div className={styles.messengerContainer}>
      <SideBar />
      <Chat />
    </div>
  );
};

export default Messages;
