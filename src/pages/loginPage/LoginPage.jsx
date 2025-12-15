import React from "react";
import styles from "./LoginPage.module.css";
import { GoogleLoginButton } from "@/components/ui/auth/GoogleLoginButton/GoogleLoginButton";
import StoreLogo from "@/assets/images/rccarshop-logo.png";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "@/components/ui/loader/Loader";

export const LoginPage = () => {
  const { singInWithGoogle, loading } = useAuth();

  if (loading) return <Loader fullScreen={true} />;

  return (
    <>
      <main className={styles.container}>
        <div className={styles.logoContainer}>
          <img src={StoreLogo} />
        </div>
        <div className={styles.greetingContainer}>
          <h2>BIENVENIDO DE NUEVO</h2>
          <h1>
            Ingresa para administrar <br></br> RC Car Shop
          </h1>
        </div>
        <div className={styles.buttonContainer}>
          <GoogleLoginButton onLogin={singInWithGoogle} />
        </div>
      </main>
    </>
  );
};
