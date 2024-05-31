"use client";
import React, { useContext, useState } from "react";
import styles from "./search.module.scss";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "@/app/api/firebase";
import { AuthContext } from "@/app/context/AuthContext";
import Button from "../Button/Button";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username) //Поиск совпадея имя из поиска и БД
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleSelect = async () => {
    //создать чат между двумя пользователями, если его еще не существует
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] }); //создание перепискии в коллекции переписок

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          //создание перепискии в коллекции пользователя
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
  };

  return (
    <div className={styles.search}>
      <div className={styles.ssearchForm}>
        <input
          type="text"
          placeholder="Найти пользователя"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <Button onClick={handleSearch} className={"stock"}>
          <FiSearch />
        </Button>
      </div>
      {err && <span>Пользователь не найден</span>}
      {user && (
        <div className={styles.searchUserChat} onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <span>{user.displayName}</span>
          <h4>+</h4>
        </div>
      )}
    </div>
  );
};

export default Search;