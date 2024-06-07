"use client";
import styles from "./sidebarnav.module.scss";
import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "@/app/api/firebase";
import Button from "../Button/Button";
import { FiLogOut, FiSettings } from "react-icons/fi";
import Settings from '../Settings/Settings';

const SideBarNav = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={styles.sideBarNav}>
      <div className={styles.navUserInfo}>
        <img src={currentUser.photoURL} alt="" />
        <h3>{currentUser.displayName}</h3>
      </div>
      <div className={styles.navUser}>
        <Settings/>
        <Button className={"outlined"} onClick={() => signOut(auth)}>
          <FiLogOut />
        </Button>
      </div>
    </div>
  );
};

export default SideBarNav;
