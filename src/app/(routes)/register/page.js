"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import { auth, storage, db } from "../../api/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import Header from "@/app/components/Header/Header";
import Card from "@/app/components/Card/Card";
import { FiImage } from "react-icons/fi";
import Button from "@/app/components/Button/Button";
import Footer from "@/app/components/Footer/Footer";

const Register = () => {
  const [displayName, setDisplayName] = useState('');
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const inputText = e.target.value
      .toLowerCase()  // Преобразование в нижний регистр
      .replace(/\s/g, '_')  // Замена пробелов на знак нижнего подчеркивания
      .replace(/[^a-zA-Z0-9_.]/g, ''); // Оставляем только буквы, цифры и точку
    setDisplayName(inputText);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    if (!consent) {
      setErr(true);
      setLoading(false);
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            router.push("/login");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <Header />
      <div className={styles.formCard}>
        <Card className="cardButton">
          <div className={styles.form}>
            <h1>Регистрация</h1>
            <form onSubmit={handleSubmit}>
            <input
                required
                type="text"
                placeholder="Отображаемое имя"
                value={displayName}
                onChange={handleInputChange}
              />
              <input required type="email" placeholder="E-mail" />
              <input required type="password" placeholder="Пароль" />
              <input
                required
                style={{ display: "none" }}
                type="file"
                id="file"
              />
              <label htmlFor="file">
                <FiImage />
                <h4>Загрузить аватар</h4>
              </label>
              <div className={styles.consent}>
                <input
                  required
                  type="checkbox"
                  onChange={() => setConsent(!consent)}
                />
                <label htmlFor="consent">
                  <p>
                    Я согласен на обработку{" "}
                    <a href="/policy.pdf">персональных данных</a>
                  </p>
                </label>
              </div>
              <Button
                className={`accent ${consent ? "" : "disabled"}`}
                disabled={!consent}
              >
                Зарегистрироваться
              </Button>
              {loading && "Сохраняем данные..."}
              {err && <span>Что-то пошло не так...</span>}
            </form>
            <p>
              Уже есть аккаунт?{" "}
              <Link href="/login" className={styles.reg}>
                Вход
              </Link>
            </p>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
