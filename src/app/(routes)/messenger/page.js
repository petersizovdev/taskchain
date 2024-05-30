"use client";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import SideBar from "@/app/components/SideBar/SideBar";
import Chat from "@/app/components/Chat/Chat";

export default function Home() {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      router.push("/login");
      return null;
    }
    return children;
  };
  return (
    <main className={styles.container}>
      <ProtectedRoute>
        <div className={styles.messengerContainer}>
          <div className={styles.sideBar}>
          <SideBar />
          </div>
          <div className={styles.chat}>
            <Chat />
          </div>
        </div>
      </ProtectedRoute>
    </main>
  );
}
