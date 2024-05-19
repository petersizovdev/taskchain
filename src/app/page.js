"use client";
import Header from "./components/Header/Header";
import Welcome from "./components/Welcome/Welcome";
import styles from "./page.module.scss";
import Link from "next/link";
import Mockup from "@/assets/img/mockup.png";
import Yoga from "@/assets/img/yoga.png";
import Image from "next/image";
import Accordion from "./components/Accordion/Accordion";
import blub from "@/assets/svg/bbblurry1.svg";
import Footer from './components/Footer/Footer';

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
          <Image className={styles.blub2} priority src={blub} alt="" />
        </div>
        <Image src={Mockup}></Image>
      </div>
      <div className={styles.about}>
        <Accordion />
      </div>
      <Footer/>
    </main>
  );
}
