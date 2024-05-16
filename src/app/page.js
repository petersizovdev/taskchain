"use client";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import styles from "./page.module.scss";
import Messages from "./components/Messages/Messages";
import { useRouter } from "next/navigation";

export default function Home() {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      router.push("/login");
    }
    return children;
  };

  return (
    <main className={styles.messagesContainer}>
      <ProtectedRoute>
        <Messages />
      </ProtectedRoute>
    </main>
  );
}
