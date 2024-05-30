import Button from "../Button/Button";
import Chats from "../Chats/Chats";
import Search from "../Search/Search";
import SideBarNav from "../SideBarNav/SideBarNav";
import SideBarMenu from "./SideBarMenu";
import styles from "./sidebar.module.scss";

const SideBar = () => {
  return (
    <div className={styles.sideBar}>
      <div className={styles.sideBarContent}>
        <SideBarNav />
        <Search />
        <Chats />
      </div>
    </div>
  );
};

export default SideBar;
