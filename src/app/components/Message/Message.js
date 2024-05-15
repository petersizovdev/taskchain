import Image from "next/image";
import styles from "./message.module.scss";

import cn from "classnames";

const Message = () => {
  return (
    <div className={cn(styles.message, styles.owner)}>
      <div className={styles.messageInfo}>
        <Image src="" alt="."></Image>
        <span>10:00</span>
      </div>
      <div className={styles.messageContent}>
        <p>Hi!</p>
        <Image src="" alt="."></Image>
      </div>
    </div>
  );
};

export default Message;
