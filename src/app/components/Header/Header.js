"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./header.module.css";
import lm from "@/assets/svg/logomobile.svg";
import lt from "@/assets/svg/logotext.svg";
import Image from "next/image";
import Button from "../Button/Button";
import Link from "next/link";
import { FiMoreHorizontal, FiX } from "react-icons/fi";

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <Image className={styles.logoMobile} src={lm} alt="logo" />
          <Image className={styles.logoText} src={lt} alt="logo text" />
        </Link>
      </div>
      <div className={`${styles.nav} ${isSidebarOpen ? styles.hide : ""}`}>
        <Link href="#faq">
          <Button className="stock">О нас</Button>
        </Link>
        <Link href="/feedback">
          <Button className="stock">Контакты</Button>
        </Link>
        <Link href="/messenger">
          <Button className="accent">Мессенджер</Button>
        </Link>
      </div>

      {isSidebarOpen && (
        <div className={`${styles.SideBarMenuContainer} ${styles.show}`}>
          <div className={styles.sideBarMenuNav}>
            <Button className="stock" onClick={toggleSidebar}>
              {isSidebarOpen ? <FiX /> : <FiMoreHorizontal />}
            </Button>

            <Link href="/#faq" onClick={() => setSidebarOpen(false)}>
              <Button className="stock">О нас</Button>
            </Link>
            <Link href="/feedback" onClick={() => setSidebarOpen(false)}>
              <Button className="stock">Контакты</Button>
            </Link>
            <Link href="/messenger" onClick={() => setSidebarOpen(false)}>
              <Button className="accent">Мессенджер</Button>
            </Link>
          </div>
        </div>
      )}

      {!isSidebarOpen && (
        <div className={styles.toggleMenu}>
          <Button className="stock" onClick={toggleSidebar}>
            <FiMoreHorizontal />
          </Button>{" "}
        </div>
      )}
    </div>
  );
};

export default Header;
