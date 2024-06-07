/* eslint-disable jsx-a11y/alt-text */
"use client";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import Image from "next/image";
import styles from "./page.module.scss";
import blub1 from "@/assets/svg/bbblurry.svg";
import blub2 from "@/assets/svg/bbblurry1.svg";
import blub3 from "@/assets/svg/bbblurry2.svg";
import Button from "@/app/components/Button/Button";
import Link from "next/link";
export default function Home() {
  const [consent, setConsent] = useState(false);
  const [isSent, setIsSent] = useState(null);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("taskchain", "tasckchain_template", form.current, {
        publicKey: process.env.NEXT_PUBLIC_EMAILJS,
      })
      .then(
        () => {
          setIsSent(true); // Устанавливаем флаг на успешно отправлено
        },
        (error) => {
          setIsSent(false); // Устанавливаем флаг на неудачную отправку
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <main className={styles.container}>
      <Header />
      <div className={styles.feedback}>
        {isSent === true ? ( // если успешно отправлено
          <div className={styles.log}>
            <h3>Успешно отправлено!</h3>
            <Link href={"/"} className={styles.reg}>
              На главную
            </Link>
          </div>
        ) : isSent === false ? ( // если что-то пошло не так
          <div className={styles.log}>
            <h3>Что-то пошло не так...</h3>
            <Link href={"/feedback"} className={styles.reg}>
              Повторить попытку
            </Link>
          </div>
        ) : (
          <form ref={form} onSubmit={sendEmail}>
            <div className={styles.formLeft}>
              <h2>Наши менеджеры с&nbsp;вами на&nbsp;связи!</h2>
              <div className={styles.formRight}>
                <input
                  name="name"
                  type="name"
                  placeholder="Как к вам обращаться?"
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Ваш email"
                  required
                />
                <select required name="topic">
                  <option disabled selected hidden>
                    Выберете тему сообщения
                  </option>
                  <option>Вопрос</option>
                  <option>Предложение</option>
                  <option>Проблема</option>
                  <option>Другое...</option>
                </select>
              </div>
            </div>
            <textarea
              name="text"
              placeholder="Ваше сообщение..."
              required
              rows="4"
              cols="50"
            ></textarea>

            <div className={styles.consent}>
              <input
                required
                type="checkbox"
                onChange={() => setConsent(!consent)}
              />
              <label htmlFor="consent">
                <p>Я согласен на обработку <a href='/policy.pdf'>персональных данных</a></p>
              </label>
            </div>

            <Button
              className={` ${consent ? "" : "disabled"}`}
              disabled={!consent}
            >
              Отправить
            </Button>
          </form>
        )}
        <Image src={blub1} className={styles.blub1} />
        <Image src={blub2} className={styles.blub2} />
        <Image src={blub3} className={styles.blub3} />
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </main>
  );
}
