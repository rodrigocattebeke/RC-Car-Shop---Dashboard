import { auth } from "@/lib/firebase";
import { singInWithGoogleService } from "@/services/auth/authService";
import { createIfNotExists, getUserProfile } from "@/services/user/userService";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { useRouteError } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(undefined);
  const [userProfile, setUserProfile] = useState(undefined);
  const [unauthorized, setUnauthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUnauthorized(false);

      if (!firebaseUser) {
        setUserProfile(null);
        setAuthUser(null);
        setLoading(false);
        return;
      }

      // Create user
      await createIfNotExists(firebaseUser);

      // Get user profile

      const userProfile = await getUserProfile(firebaseUser.uid);

      if (!userProfile) {
        await signOut(auth);
        setUnauthorized(true);
        setLoading(false);
        return;
      }

      // Set user if exists
      setUserProfile(userProfile);
      setAuthUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const singInWithGoogle = async () => {
    await singInWithGoogleService();
  };

  const state = {
    authUser,
    userProfile,
    isAdmin: userProfile?.role === "admin",
    unauthorized,
    loading,
    singInWithGoogle,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
