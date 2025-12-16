import { db } from "@/lib/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

export const createIfNotExists = async (user) => {
  const ref = doc(db, "users", user.uid);
  try {
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, {
        role: "user",
        name: user.displayName || "Usuario",
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        createdAt: serverTimestamp(),
      });
    }
    return true;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return false;
  }
};

export const getUserProfile = async (uid) => {
  const ref = doc(db, "users", uid);

  try {
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      return null;
    }

    return snap.data();
  } catch (error) {
    console.error("Error al traer los datos de usuario:", error);
    return null;
  }
};
