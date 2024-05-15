import Messenger from "@/app/components/Messenger/Messenger";
import styles from "./page.module.scss";

const Messages = () => {
  return (
    <div className={styles.messagesContainer}>
      <Messenger />
    </div>
  );
};

export default Messages;
