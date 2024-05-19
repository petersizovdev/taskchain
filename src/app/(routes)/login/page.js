"use client";

import styles from "./page.module.scss";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../api/firebase";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import Card from "@/app/components/Card/Card";
import Button from "@/app/components/Button/Button";

const Login = () => {
  const [err, setErr] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/messenger");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className={styles.formContainer}>
      <Header />
      <div className={styles.formCard}>
        <Card className="cardButton">
          <div className={styles.form}>
            <h1 >Вход</h1>
            <form onSubmit={handleSubmit}>
              <input type="email" placeholder="E-mail" />
              <input type="password" placeholder="Пароль" />
              <Button className={"accent"}>Войти</Button>
              {err && <span>Что-то пошло не так...</span>}
            </form>
            <p>
              Нет аккаунта? <Link href="/register">Регистрация</Link>
            </p>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
