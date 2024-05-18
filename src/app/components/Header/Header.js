import styles from "./header.module.scss";
import lm from "@/assets/svg/logomobile.svg";
import lt from "@/assets/svg/logotext.svg";
import Image from "next/image";
import Button from "../Button/Button";
import Link from "next/link";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Image className={styles.logoMobile} src={lm}></Image>
        <Image className={styles.logoText} src={lt}></Image>
      </div>
      <div className={styles.nav}>
        <Button className={"stock"}>О нас</Button>
        <Button className={"stock"}>Контакты</Button>
        <Link href="/messenger">
          {" "}
          <Button className={"accent"}> Мессенджер</Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
