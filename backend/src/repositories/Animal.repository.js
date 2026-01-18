import { db } from "../config/firebase.js"

export const updateAnimalStatus = async (petId, data) => {
  await db.collection("animals").doc(String(petId)).update(data)
}
