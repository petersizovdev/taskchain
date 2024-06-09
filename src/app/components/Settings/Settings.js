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

function Settings() {
  const { currentUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(currentUser.displayName);
  const [newPhotoURL, setNewPhotoURL] = useState(currentUser.photoURL);
  const [selectedImage, setSelectedImage] = useState(null);
  const isUnchanged =
    newDisplayName === currentUser.displayName && selectedImage === null;

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDisplayNameChange = (e) => {
    setNewDisplayName(e.target.value);
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setSelectedImage(image);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setNewPhotoURL(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSaveChanges = async () => {
    try {
      if (selectedImage) {
        const storageRef = ref(storage, `images/${selectedImage.name}`);
        await uploadBytesResumable(storageRef, selectedImage);
        const photoURL = await getDownloadURL(storageRef);

        await updateProfile(auth.currentUser, {
          displayName: newDisplayName,
          photoURL,
        });
        const userDocRef = doc(db, "users", currentUser.uid);
        await setDoc(
          userDocRef,
          { displayName: newDisplayName, photoURL },
          { merge: true }
        );

        console.log("Changes saved successfully!");
      } else {
        await updateProfile(auth.currentUser, { displayName: newDisplayName });
        const userDocRef = doc(db, "users", currentUser.uid);
        await setDoc(
          userDocRef,
          { displayName: newDisplayName },
          { merge: true }
        );

        console.log("Changes saved successfully!");
      }
      // Обновить текущего пользователя в контексте
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error saving changes:", error);
    }
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
                  onChange={handleImageChange}
                />
                <label htmlFor="file" className={styles.editImg}>
                  <img src={newPhotoURL} alt="" />
                  <div className={styles.editImgHover}>
                    <FiEdit3 />
                  </div>
                </label>
                <input
                  type="text"
                  placeholder={currentUser.displayName}
                  value={newDisplayName}
                  onChange={handleDisplayNameChange}
                ></input>
              </div>
              <Button onClick={handleSaveChanges} disabled={isUnchanged}>
                Сохранить
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Settings;
