import React, { useState } from "react";
import Button from "../Button/Button";
import Chats from "../Chats/Chats";
import Search from "../Search/Search";
import SideBarNav from "../SideBarNav/SideBarNav";
import { FiMoreHorizontal, FiX } from "react-icons/fi";
import styles from "./sidebar.module.scss";

const SideBarMenu = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className={styles.sideBarMenuButton}>
        <Button className={"stock"} onClick={toggleSidebar}>
          <FiMoreHorizontal />
        </Button>
      </div>
      <div
        className={styles.SideBarMenuContainer}
        style={{
          transform: isSidebarOpen ? "translateX(0)" : "translateX(-150%)",
        }}
      >
        <div className={styles.sideBarMenuNav}>
          <SideBarNav />
          <div className={styles.sideBarMenuNavButton}>
            <Button className={"stock"} onClick={toggleSidebar}>
              <FiX />
            </Button>
          </div>
        </div>

        <Search />
        <div className={styles.sideBarMenuChat} onClick={toggleSidebar}>
          <Chats />
        </div>
      </div>
    </>
  );
};

export default SideBarMenu;
