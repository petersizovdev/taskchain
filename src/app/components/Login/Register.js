import Image from "next/image";
import styles from "./register.module.scss";

const Login = () => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <h3>Вход</h3>
        <form>
          <input type="email" placeholder="Ваш email" />
          <input type="password" placeholder="Пароль" />
          <button>Войти</button>
        </form>
        <p>Нет аккаунта? Зарегестрироваться</p>
      </div>
    </div>
  );
};

export default Login;
