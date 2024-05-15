import Image from "next/image";
import styles from "./chats.module.scss";

const Chats = () => {
  return (
    <div className={styles.userChat}>
      <Image src="" alt="."></Image>
      <div className={styles.chatInfo}>
        <span>User Name</span>
        <p>Message text</p>
      </div>
    </div>
  );
};

export default Chats;
