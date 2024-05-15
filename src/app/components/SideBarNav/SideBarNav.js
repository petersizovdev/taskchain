import Image from "next/image";
import styles from "./sidebarnav.module.scss";
import { signOut } from 'firebase/auth';
import { auth } from '@/app/api/firebase';

const SideBarNav = () => {
  return (
    <div className={styles.sideBarNav}>
      <Image src="" alt="." />
      <div className={styles.navUser}>
        <h4>Name</h4>
        <button onClick={()=>signOut(auth)}>Выйти</button>
      </div>
    </div>
  );
};

export default SideBarNav;
