import Register from "@/app/components/Register/Register";
import styles from "./page.module.scss";
import Login from "@/app/components/Login/Login";

const Auth = () => {
  return (
    <div className={styles.formContainer}>
      <Register />
      <Login />
    </div>
  );
};

export default Auth;
