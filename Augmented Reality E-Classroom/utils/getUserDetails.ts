import { db } from "@/firebaseConfig"
import { doc, getDoc } from "firebase/firestore"

export const getUserDetails = async (uid: string) =>  {
    const userRef = doc(db, 'users', uid)
    const data = await getDoc(userRef)
    return data
}