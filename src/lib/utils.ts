import { db } from "@/config/firebase";
import { clsx, type ClassValue } from "clsx";
import { doc, getDoc } from "firebase/firestore";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getFeature(feature: string) {
  try {
    const docRef = doc(db, "features", feature);
    const querySnapshot = await getDoc(docRef);
    const res = querySnapshot.data();
    if (res) {
      return res.data;
    }
  } catch (err) {
    console.log(err);
  }
}
