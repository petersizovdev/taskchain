"use client";
import styles from "./page.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.container}>
      <Link href="/messenger">messenger</Link>
    </main>
  );
}
