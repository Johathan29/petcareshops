import { db } from "../config/firebase.js"

const collectionName = "animals"

export const getAllPets = async () => {
  const snapshot = await db.collection(collectionName).get()
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

export const getPetById = async (id) => {
  const doc = await db.collection(collectionName).doc(id).get()
  if (!doc.exists) return null
  return { id: doc.id, ...doc.data() }
}

export const createPet = async (data) => {
  const ref = await db.collection(collectionName).add(data)
  return ref.id
}

export const deletePet = async (id) => {
  await db.collection(collectionName).doc(id).delete()
}
