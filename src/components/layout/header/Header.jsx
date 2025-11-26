import styles from "./Header.module.css";
import ArrowBackIcon from "@/assets/svg/arrow_back.svg?react";

/**
 * @param {Object} props
 * @param {string} props.title
 * @returns
 */

export const Header = ({ title = "" }) => {
  return (
    <header className={styles.header}>
      <div className={styles.returnContainer}>
        <ArrowBackIcon className="icon" />
      </div>
      <div className={styles.titleContainer}>
        <h1>{title}</h1>
      </div>
    </header>
  );
};
