import styles from "./Button.module.css";

/**
 * @param {{
 *  text?: 'string',
 *  mode?:  'default' | 'primary' | 'secondary' | 'success' | 'danger',
 *  fullWidth?: 'false' | 'true',
 *  onClick?: 'function()',
 * }} props
 */

export const Button = ({ children, title = "", mode = "default", fullWidth = false, onClick, disabled = false }) => {
  return (
    <button className={`${styles.button} ${styles[mode]} ${fullWidth ? styles.fullWidth : ""}`} onClick={onClick} title={title || "Button"} disabled={disabled}>
      {children}
    </button>
  );
};
