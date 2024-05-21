import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/app/api/firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import styles from "./input.module.scss";
import Button from "../Button/Button";
import { FiPaperclip } from "react-icons/fi";
const Input = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (file) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          console.error("Error uploading file:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("Download URL:", downloadURL);
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text: text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
                fileName: file.name,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text: file ? fileName : text, // Используем имя файла, если отправлен файл
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    
    setText(""); // Сброс после отправки
    setFile(null); 
    setFileName("");
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setFileName(file.name);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className={styles.input}>
      <input
        type="text"
        placeholder="Написать сообщение..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={handleKeyDown}
      />
      <div className={styles.fileUpload}>
        <label htmlFor="file">
          <FiPaperclip size={"1.5rem"} />
        </label>
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={onFileChange}
        />
      </div>
      <Button
        disabled={!text.trim() && !file}
        className="accent"
        onClick={handleSend}
      >
        Отправить
      </Button>
    </div>
  );
};

export default Input;
