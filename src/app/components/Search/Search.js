import Image from "next/image";
import styles from "./search.module.scss";

const Search = () => {
  return (
    <div className={styles.search}>
      <div className={styles.searchForm}>
        <input type="text" placeholder="Найти пользователя"></input>
      </div>
      <div className={styles.user}>
        <Image src='' alt='.'></Image>
        <div className={styles.userInfo}>
          <span>User Name</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
