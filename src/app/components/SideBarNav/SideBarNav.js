"use client";

import Image from "next/image";
import styles from "./sidebarnav.module.scss";
import React, { useContext } from "react";
import { signOut } from "firebase/auth";

import { AuthContext } from "../../context/AuthContext";
import { auth } from "@/app/api/firebase";

const SideBarNav = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={styles.sideBarNav}>
      <img src={currentUser.photoURL} alt="." width={16}/>
      <div className={styles.navUser}>
        <h4>{currentUser.displayName}</h4>
        <button onClick={() => signOut(auth)}>Выйти</button>
      </div>
    </div>
  );
};

export default SideBarNav;
