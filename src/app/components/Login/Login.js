import Image from "next/image";
import styles from "./register.module.scss";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <h3>Вход</h3>
        <form>
          <input type="email" placeholder="Ваш email" />
          <input type="password" placeholder="Пароль" />
          <button>Войти</button>
          {err && <h5>Что-то пошло не так...</h5>}
        </form>
        <p>Нет аккаунта? Зарегестрироваться</p>
      </div>
    </div>
  );
};

export default Login;
