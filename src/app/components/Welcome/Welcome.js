import Image from "next/image";
import blub from "@/assets/svg/bbblurry.svg";
import blub2 from "@/assets/svg/bbblurry1.svg";
import blub3 from "@/assets/svg/bbblurry2.svg";
import Card from "../Card/Card";

import styles from "./Welcome.module.scss";
import Link from "next/link";

const Welcome = () => {
  return (
    <div className={styles.welcome}>
      <div className={styles.welcomeText}>
        <h1>Taskchain</h1>
        <div className={styles.goto}>
          <h3>
            Ваш верный помощник <br />
            на поле фриланса
          </h3>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            href="/messenger"
          >
            <Card className="cardButton">
              <h4 className={styles.cardButton}> Перейти к Мессенджеру</h4>
            </Card>
          </Link>
        </div>
      </div>

      <Image className={styles.blub} priority src={blub2} alt="" />
      <Image className={styles.blub2} priority src={blub} alt="" />
      <Image className={styles.blub3} priority src={blub3} alt="" />
    </div>
  );
};

export default Welcome;
