import styles from "./GoogleLoginButton.module.css";
import GoogleLogo from "@/assets/images/logo-google.png";

export const GoogleLoginButton = ({ onLogin = null }) => {
  const handleLogin = async () => {
    try {
      if (onLogin) await onLogin();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.container} onClick={handleLogin}>
      <img src={GoogleLogo} />
      <p>Continuar con google</p>
    </div>
  );
};
