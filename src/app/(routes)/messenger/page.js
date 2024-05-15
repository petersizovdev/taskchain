import styles from "./page.module.scss";
import Register from "@/app/components/Register/Register";
import Login from "@/app/components/Login/Login";
import Messages from '@/app/components/Messages/Messages';


const Messenger = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Messages />;
    }
  };

  return (
    <div className={styles.messagesContainer}>
      <Messages />
      <Register />
      <Login />
    </div>
  );
};

export default Messenger;
