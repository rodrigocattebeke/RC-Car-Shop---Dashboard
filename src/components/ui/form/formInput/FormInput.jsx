import styles from "./FormInput.module.css";
/**
 * @param {Object} params
 * @param {string} params.name
 * @param {"text"} [params.type]
 * @param {string} params.value
 * @param {string} params.placeholder
 * @param {function} params.onChange
 * @returns
 */

export const FormInput = ({ name = "", type = "text", value = "", onChange, placeholder, ...props }) => {
  return <input className={styles.input} type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} {...props}></input>;
};
