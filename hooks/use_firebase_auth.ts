import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { useEffect, useState } from "react";
import FirebaseClient from "../models/firebase_client";
import { InAuthUser } from "../models/in_auth_user";

const useFirebaseAuth = () => {
  const [authUser, setAuthUser] = useState<InAuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const signInWithGoogle = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    try {
      const signInResult = await signInWithPopup(
        FirebaseClient.getInstance().Auth,
        provider
      );
      if (signInResult.user) {
        console.info(signInResult);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signOut = () => FirebaseClient.getInstance().Auth.signOut().then(clear);

  const authStateChanged = async (authState: User | null) => {
    if (authState === null) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setAuthUser({
      uid: authState.uid,
      email: authState.email,
      photoURL: authState.photoURL,
      displayName: authState.displayName,
    });
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe =
      FirebaseClient.getInstance().Auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInWithGoogle,
    signOut,
  };
};

export default useFirebaseAuth;
