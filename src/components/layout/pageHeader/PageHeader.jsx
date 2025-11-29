import styles from "./PageHeader.module.css";
import ArrowBackIcon from "@/assets/svg/arrow_back.svg?react";

/**
 * @param {Object} props
 * @param {string} props.title
 * @returns
 */

export const PageHeader = ({ title = "" }) => {
  return (
    <section className={styles.pageHeader}>
      <div className={styles.returnContainer}>
        <ArrowBackIcon className="icon" />
      </div>
      <div className={styles.titleContainer}>
        <h1>{title}</h1>
      </div>
    </section>
  );
};
