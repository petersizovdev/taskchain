import Image from "next/image";
import styles from "./register.module.scss";

const Register = () => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <h3>Регистрация</h3>
        <form>
          <input type="text" placeholder="Как вас зовут?" />
          <input type="email" placeholder="Ваш email" />
          <input type="password" placeholder="Пароль" />
          <input className={styles.avatarUploader} type="file" id="avatar" />
          <label className={styles.avatarUploaderText} htmlFor="avatar">
            <Image alt="."></Image> <span>Загрузить аватар</span>
          </label>
          <button>Зарегистрироваться</button>
        </form>
        <p>Уже есть аккаунт? Войти</p>
      </div>
    </div>
  );
};

export default Register;
