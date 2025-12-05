import styles from "./Loader.module.css";
/**
 *
 * @param {Object} params
 * @param {boolean} params.fullScreen
 * @param {boolean} params.fullWidth
 * @param {boolean} params.backdrop
 * @returns
 */

export const Loader = ({ fullScreen = false, fullWidth = false, backdrop = false }) => {
  return (
    <section className={`${styles.loaderContainer} ${fullScreen ? styles.fullScreen : ""}  ${fullWidth ? styles.fullWidth : ""} ${backdrop ? styles.backdrop : ""}`}>
      <svg className={`${styles.loader}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect className={`spinner_GmWz ${styles.column1}`} x="1" y="4" width="6" height="14" />
        <rect className={`spinner_GmWz ${styles.column2}`} x="9" y="4" width="6" height="14" />
        <rect className={`spinner_GmWz ${styles.column3}`} x="17" y="4" width="6" height="14" />
      </svg>
    </section>
  );
};
