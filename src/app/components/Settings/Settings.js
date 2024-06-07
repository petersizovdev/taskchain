import { useContext, useEffect, useState } from "react";
import Card from "../Card/Card";
import styles from "./settings.module.scss";
import Button from "../Button/Button";
import Link from "next/link";
import { FiSettings } from "react-icons/fi";
import { TbX } from "react-icons/tb";

import { ChatContext } from "@/app/context/ChatContext";
import { db } from "@/app/api/firebase";

function Settings() {
  const [showModal, setShowModal] = useState(false); // Состояние для модального окна
  const { data } = useContext(ChatContext);

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
                <TbX className={styles.closeModal} onClick={handleCloseModal} />
              </h3>

              <Button>Сохранить</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
export default Settings;
