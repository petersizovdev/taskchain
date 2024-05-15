import Chat from "../Chat/Chat";
import SideBar from "../SideBar/SideBar";
import styles from "./messenger.module.scss";

const Messenger = () => {
  return (
    <div className={styles.messengerContainer}>
      <SideBar />
      <Chat />
    </div>
  );
};

export default Messenger;
