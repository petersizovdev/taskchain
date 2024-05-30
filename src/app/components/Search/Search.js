import React, { useContext, useState, useEffect } from "react";
import styles from "./search.module.scss";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/api/firebase";
import { AuthContext } from "@/app/context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [notFound, setNotFound] = useState(false); // State для обозначения "Пользователь не найден"

  useEffect(() => {
    const handleSearch = async () => {
      if (username.trim().length > 2) {
        const q = query(
          collection(db, "users"),
          where("displayName", "==", username.trim())
        );

        try {
          const querySnapshot = await getDocs(q);
          const results = [];
          querySnapshot.forEach((doc) => {
            results.push(doc.data());
          });

          setSearchResults(results);
          setNotFound(results.length === 0); // Установка notFound в true, если результаты пусты
        } catch (err) {
          console.error(err);
          setNotFound(true);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
        setNotFound(false); // Сбросить notFound при пустом запросе
      }
    };

    handleSearch();
  }, [username]);

  const handleSelect = async (selectedUser) => {
    setUsername("");
  };

  return (
    <div className={styles.search}>
      <div className={styles.searchForm}>
        <input
          type="text"
          placeholder="Найти пользователя"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {searchResults.length > 0 && (
        <div className={styles.searchResults}>
          {searchResults.map((result) => (
            <div
              key={result.uid}
              className={styles.searchUserChat}
              onClick={() => handleSelect(result)}
            >
              <img src={result.photoURL} alt="" />
              <span>{result.displayName}</span>
              <h4>+</h4>
            </div>
          ))}
        </div>
      )}
      {notFound && (
        <div className={styles.err}>
          <span>Пользователь не найден</span>{" "}
        </div>
      )}
    </div>
  );
};

export default Search;
