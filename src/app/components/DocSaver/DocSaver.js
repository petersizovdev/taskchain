import { useContext, useEffect, useState } from "react";
import Card from "../Card/Card";
import styles from "./docsaver.module.scss";
import Button from "../Button/Button";
import Link from "next/link";
import { TbCubePlus, TbFile } from "react-icons/tb";
import { FiX } from "react-icons/fi";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { ChatContext } from "@/app/context/ChatContext";
import { db } from "@/app/api/firebase";

function DocSaver() {
  const [selectedFile, setSelectedFile] = useState();
  const [fileUrl, setFileUrl] = useState(null); // Добавляем состояние для ссылки
  const [fileName, setFileName] = useState(null); // Состояние для имени файла
  const [showModal, setShowModal] = useState(false); // Состояние для модального окна
  const [IPFSlinks, setIPFSLinks] = useState([]); // Массив для хранения ссылок

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name); // Обновляем имя файла
  };

  const handleSubmission = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const metadata = JSON.stringify({
        name: fileName,
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
          },
          body: formData,
        }
      );
      const resData = await res.json();
      const newFileUrl = `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${resData.IpfsHash}`;

      setFileUrl(newFileUrl); // Обновляем состояние с новой ссылкой
      console.log(newFileUrl);

      // Сохраняем новую ссылку в базу данных
      const docRef = doc(db, "chats", data.chatId);
      await setDoc(
        docRef,
        { IPFSlinks: [...IPFSlinks, newFileUrl] },
        { merge: true }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setIPFSLinks(doc.data().IPFSlinks || []); // Получаем ссылки из базы двнных
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <span className={styles.docSaverBtn}>
        {IPFSlinks.length > 0 ? (
          <Link
            href={`https://${IPFSlinks[IPFSlinks.length - 1]}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {IPFSlinks[IPFSlinks.length - 1].slice(-16)}
          </Link>
        ) : (
          <span onClick={() => setShowModal(true)}> Сохранить договор</span>
        )}
        <TbCubePlus onClick={() => setShowModal(true)} />
      </span>

      {showModal && (
        <div className={styles.docSaverBg} onClick={handleCloseModal}>
          <Card className="cardButton">
            <div
              className={styles.docSaverContainer}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className={styles.modalH}>
                Загрузите документ
                <FiX className={styles.closeModal} onClick={handleCloseModal} />
              </h3>
              {fileUrl && (
                <span>
                  <Link
                    href={`https://${fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {fileUrl}
                  </Link>
                </span>
              )}
              <label htmlFor="file">
                {fileName ? fileName : "Выбрать файл"}
                <TbFile size={"1.5rem"} />
              </label>
              <input
                type="file"
                onChange={changeHandler}
                id="file"
                style={{ display: "none" }}
              />
              <Button onClick={handleSubmission} disabled={!selectedFile}>
                Отправить в IPFS
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
export default DocSaver;
