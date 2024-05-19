"use client";
import React, { useState } from "react";
import Image from "next/image";
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

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);       //Cоздание аккаунта

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);  //имя для аватара

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {  //Cоздание профиля
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});   //Cоздание списка чатов профиля
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
              <input required type="text" placeholder="Отображаемое имя" />
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
                <h4>
                  Загрузить аватар
                </h4>
              </label>
              <Button className={"accent"}>Зарегистрироваться</Button>
              {loading && "Сохраняем данные..."}
              {err && <span>Что-то пошло не так...</span>}
            </form>
            <p>
              Есть аккаунт? <Link href="/login">Вход</Link>
            </p>{" "}
          </div>
        </Card>
      </div>
    </div>
  );
};
export default Register;
