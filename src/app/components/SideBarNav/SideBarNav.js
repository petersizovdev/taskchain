"use client";

import styles from "./sidebarnav.module.scss";
import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "@/app/api/firebase";
import Button from '../Button/Button';

const SideBarNav = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={styles.sideBarNav}>
      <img src={currentUser.photoURL} alt="." />
      <div className={styles.navUser}>
        <h4>{currentUser.displayName}</h4>
        <Button className={'outlined'} onClick={() => signOut(auth)}>Выйти</Button>
      </div>
    </div>
  );
};

export default SideBarNav;
