import { db } from "../config/firebase.js"

const collectionName = "adoption"

export const getAllAdoption= async () => {
  const snapshot = await db.collection(collectionName).get()
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

export const getAdoptionById = async (id) => {
  const doc = await db.collection(collectionName).doc(id).get()
  if (!doc.exists) return null
  return { id: doc.id, ...doc.data() }
}

export const createAdoption = async (data) => {
  const ref = await db.collection(collectionName).add(data)
  return ref.id
}

export const deleteAdoption = async (id) => {
  await db.collection(collectionName).doc(id).delete()
}
