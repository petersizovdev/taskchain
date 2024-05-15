"use client";
import React, { useState } from "react";
import Image from "next/image";
import Router from "next/router";
import styles from "./register.module.scss";
import { auth, storage, db } from "../../api/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, `${displayName + "avatarImage"}`);

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
            Router.push('/messages');
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
      <div className={styles.formWrapper}>
        <h3>Регистрация</h3>
        <form onSubmit={handleSubmit}>
          <input name="name" type="text" placeholder="Как вас зовут?" />
          <input name="email" type="email" placeholder="Ваш email" />
          <input name="password" type="password" placeholder="Пароль" />
          <input className={styles.avatarUploader} type="file" id="avatar" />
          <label className={styles.avatarUploaderText} htmlFor="avatar">
            <Image src="" alt="."></Image> <span>Загрузить аватар</span>
          </label>
          <button>Зарегистрироваться</button>

          {loading && <p>Loading...</p>}
          {err && <h5>Что-то пошло не так...</h5>}
        </form>
        <p>Уже есть аккаунт? Войти</p>
      </div>
    </div>
  );
};

export default Register;
