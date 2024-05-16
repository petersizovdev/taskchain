"use client";

import styles from "./page.module.scss";
import React, {  useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../api/firebase";

import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const [err, setErr] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/messenger");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
      
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You dont have an account? <Link href="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
