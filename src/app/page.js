import Image from "next/image";
import styles from "./page.module.scss";

import Auth from './(routes)/auth/page';

export default function Home() {
  return (
    <main className={styles.main}>
      <Auth />
    </main>
  );
}
