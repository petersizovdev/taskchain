/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useState } from "react";
import Card from "../Card/Card";
import styles from "./settings.module.scss";
import Button from "../Button/Button";
import { AuthContext } from "../../context/AuthContext";
import { auth, storage, db } from "../../api/firebase";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { FiSettings } from "react-icons/fi";
import { FiEdit3, FiX } from "react-icons/fi";
import Chats from "../Chats/Chats";

function Settings() {
  const { currentUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.settings} onClick={() => setShowModal(true)}>
      <Button className="outlined">
        <FiSettings />
      </Button>

      {showModal && (
        <div className={styles.docSaverBg} onClick={handleCloseModal}>
          <Card className="cardButton">
            <div
              className={styles.docSaverContainer}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className={styles.modalH}>
                Настройки
                <FiX className={styles.closeModal} onClick={handleCloseModal} />
              </h3>
              <div className={styles.navUserInfo}>
                <input
                  required
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                />
                <label htmlFor="file" className={styles.editImg}>
                  <img src={currentUser.photoURL} alt="" />
                  <div className={styles.editImgHover}>
                    <FiEdit3 />
                  </div>
                </label>
                <input
                  type="text"
                  placeholder={currentUser.displayName}
                ></input>
              </div>
              <Button>Сохранить</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
export default Settings;
