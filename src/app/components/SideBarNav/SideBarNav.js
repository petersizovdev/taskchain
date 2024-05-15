import Image from "next/image";
import styles from "./sidebarnav.module.scss";

const SideBarNav = () => {
  return (
    <div className={styles.sideBarNav}>
      <Image src="" alt="." />
      <div className={styles.navUser}>
        <h4>Name</h4>
        <button>Выйти</button>
      </div>
    </div>
  );
};

export default SideBarNav;
