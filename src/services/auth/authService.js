import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();

export const singInWithGoogleService = () => {
  return signInWithPopup(auth, provider);
};
