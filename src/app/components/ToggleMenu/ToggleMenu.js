'use client'
import React, { useState } from "react";
import Button from "../Button/Button";
import { FiMoreHorizontal, FiX } from "react-icons/fi";
import styles from "./togglemenu.module.scss";

const ToggleMenu = () => {
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
          <div className={styles.sideBarMenuNavButton}>
            <Button className={"stock"} onClick={toggleSidebar}>
              <FiX />
            </Button>
          </div>
        </div>

      </div>
    </>
  );
};

export default ToggleMenu;
