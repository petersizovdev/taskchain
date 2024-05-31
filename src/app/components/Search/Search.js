'use client'
import React, { useState, useEffect, useContext } from 'react';
import styles from './search.module.scss';
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
} from 'firebase/firestore';
import { db } from '@/app/api/firebase';
import { AuthContext } from '@/app/context/AuthContext';

const Search = () => {
  const [username, setUsername] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const handleSearch = async () => {
      if (username.trim().length > 2) {
        const q = query(
          collection(db, 'users'),
          where('displayName', '==', username.trim())
        );

        try {
          const querySnapshot = await getDocs(q);
          const results = [];
          querySnapshot.forEach((doc) => {
            results.push(doc.data());
          });

          setSearchResults(results);
          setNotFound(results.length === 0);
        } catch (err) {
          console.error(err);
          setNotFound(true);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
        setNotFound(false);
      }
    };

    handleSearch();
  }, [username]);

  const handleCreateChat = async (selectedUser) => {
    const combinedId =
      currentUser.uid > selectedUser.uid
       ? currentUser.uid + selectedUser.uid
        : selectedUser.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, 'chats', combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });

        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: selectedUser.uid,
            displayName: selectedUser.displayName,
            photoURL: selectedUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', selectedUser.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUsername('');
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
              onClick={() => handleCreateChat(result)}
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
          <span>Пользователь не найден</span>
        </div>
      )}
    </div>
  );
};

export default Search;