// lib/firebase/memories.ts
import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

export interface Memory {
  date: string;
  title: string;
  subtitle: string;
  description: string;
  type: "location" | "event" | "note";
  image: string;
  bgColor?: string;
  textColor?: string;
  rotation?: number;
}

export async function saveMemory(memory: Memory) {
  const user = getAuth().currentUser;
  if (!user) throw new Error("User not logged in");

  const userMemoriesRef = collection(db, "users", user.uid, "memories");

  await addDoc(userMemoriesRef, {
    ...memory,
    createdAt: serverTimestamp(),
  });
}
