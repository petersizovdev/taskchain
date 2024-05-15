import ChatBox from "../ChatBox/ChatBox";
import Input from '../Input/Input';
import styles from "./chat.module.scss";

const Chat = () => {
  return (
    <div className={styles.chat}>
      <div className={styles.chatInfo}>Name</div>
      <ChatBox />
      
      <Input/>
    </div>
  );
};

export default Chat;
