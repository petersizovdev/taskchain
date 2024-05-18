"use client";
import Header from "./components/Header/Header";
import Welcome from "./components/Welcome/Welcome";
import styles from "./page.module.scss";
import Link from "next/link";
import Mockup from "@/assets/img/mockup.png";
import Yoga from "@/assets/img/yoga.png";
import Image from "next/image";
import Accordion from './components/Accordion/Accordion';

export default function Home() {
  return (
    <main className={styles.container}>
      <Header />
      <div className={styles.welcome}>
        <Welcome />
      </div>
      <div className={styles.about}>
        <div className={styles.aboutText}>
          <h1>
            Рабочие контакты <br />в одном месте
          </h1>
          <h2>
            И ничто не отвлекает <Image src={Yoga} width={128}></Image>
          </h2>
        </div>
        <Image src={Mockup}></Image>
      </div>
      <div className={styles.about}>
        <Accordion/>
      </div>
    </main>
  );
}
