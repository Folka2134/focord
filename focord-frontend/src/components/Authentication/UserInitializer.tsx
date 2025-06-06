import { useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../lib/Firebase/firebase.ts";
import { useAuth } from "@/context/AuthContext.tsx";

export const UserInitializer = () => {
  const { user, isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;

    const initUser = async () => {
      const userRef = doc(db, "users", user.id);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          id: user.id,
          clerkId: user.id,
          username: user.username,
          avatarUrl: user.imageUrl,
          status: "online",
          friendIds: [],
          createdAt: new Date().toISOString(),
        });
      }
    };

    initUser();
  }, [isLoaded, isSignedIn, user]);

  return null;
};
