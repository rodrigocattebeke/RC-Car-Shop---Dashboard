import MenuIcon from "@/assets/svg/menu.svg?react";
import CloseIcon from "@/assets/svg/close.svg?react";
import EditIcon from "@/assets/svg/edit.svg?react";
import DeleteIcon from "@/assets/svg/delete.svg?react";
import styles from "./FloatingMenu.module.css";
import { useState } from "react";

export const FloatingMenu = ({ ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div {...props} className={styles.container}>
      <div className={styles.menuWrapper}>
        <button className={`${styles.button} ${styles.menuButton}`} onClick={handleOpen}>
          {isOpen ? <CloseIcon className={styles.closeIcon} /> : <MenuIcon className={styles.menuIcon} />}
        </button>
        <div className={styles.actionsContainer}>
          <button className={`${styles.button} ${styles.deleteButton} ${isOpen ? styles.active : ""}`}>
            <DeleteIcon />
          </button>
          <button className={`${styles.button} ${styles.editButton} ${isOpen ? styles.active : ""}`}>
            <EditIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
