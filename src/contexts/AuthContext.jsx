import { auth } from "@/lib/firebase";
import { singInWithGoogleService } from "@/services/auth/authService";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const singInWithGoogle = async () => {
    await singInWithGoogleService();
  };

  const state = {
    user,
    loading,
    isAuthenticated: !!user,
    singInWithGoogle,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
