import Image from "next/image";
import styles from "./Footer.module.scss";
import cn from "classnames";
import Link from "next/link";
import Tg from "@/assets/svg/tg.svg";
import Git from "@/assets/svg/git.svg";
import Eth from "@/assets/svg/eth.svg";
import lm from "@/assets/svg/logomobile.svg";
import lt from "@/assets/svg/logotext.svg";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={cn([styles.footerBlock], [styles.left])}>
      <div className={styles.logo}>
        <Image className={styles.logoMobile} src={lm}></Image>
        <Image className={styles.logoText} src={lt}></Image>
      </div>
      </div>
      <div className={cn([styles.footerBlock], [styles.middle])}>
        <span>© All rights reserved</span>
      </div>
      <div className={cn([styles.footerBlock], [styles.right])}>
        <Link href="https://t.me/PlusEx_bot">
          <Image src={Tg} alt=""></Image>
        </Link>

        <Link href="https://github.com/pitersizovdev/taskchain">
          <Image src={Git} alt=""></Image>
        </Link>
      
        <Link href="https://github.com/pitersizovdev/nextjs-PlusExchange">
          <Image src={Eth} alt=""></Image>
        </Link>
      
      </div>
    </div>
  );
};

export default Footer;
