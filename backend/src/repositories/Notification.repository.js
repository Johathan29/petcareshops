import { db } from "../config/firebase.js"

const collectionName = "notifications"

export const createNotification = async (data) => {
  const ref = await db.collection(collectionName).add(data)
  return ref.id
}
export const getAllNotification = async () => {
 const snapshot = await db.collection(collectionName).get()
   return snapshot.docs.map(doc => ({
     id: doc.id,
     ...doc.data()
   }))
}