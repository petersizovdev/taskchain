import Image from "next/image";
import styles from "./input.module.scss";

const Input = () => {
  return (
    <div className={styles.input}>
      <input type="text" placeholder="Написать сообщение..." />
      <div className={styles.send}>
        <input type="file" id="file" />
        <label htmlFor="file">
          <Image src="" alt="file"></Image>
        </label>
        <button>Отправить</button>
      </div>
    </div>
  );
};

export default Input;
