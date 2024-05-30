import React, { useState } from "react";
import Button from "../Button/Button";
import Chats from "../Chats/Chats";
import Search from "../Search/Search";
import SideBarNav from "../SideBarNav/SideBarNav";
import { FiArrowLeft } from "react-icons/fi";
import styles from "./sidebar.module.scss";

const SideBarMenu = () => {
  const [showSideBarContent, setShowSideBarContent] = useState(true);

  const toggleSideBarContent = () => {
    setShowSideBarContent(!showSideBarContent);
  };

  return (
    <>
      <div className={styles.sideBarMenuButton}>
        <Button className={"stock"} onClick={toggleSideBarContent}>
          <FiArrowLeft />
        </Button>
      </div>
      <div
        className={`${styles.SideBarMenuContainer} ${
          showSideBarContent ? styles.show : ""
        }`}
      >
        <div className={styles.sideBarMenuButton}>
        <Button className={"stock"} onClick={toggleSideBarContent}>
          <FiArrowLeft />
        </Button>
      </div>
        <SideBarNav />
        <Search />
        <Chats />
      </div>
    </>
  );
};

export default SideBarMenu;
