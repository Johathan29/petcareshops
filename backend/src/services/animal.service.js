import { db } from "../config/firebase.js"

export const lockAnimalForAdoption = async (petId) => {
  const ref = db.collection("animals").doc(String(petId))
  const snap = await ref.get()

  if (!snap.exists) {
    throw new Error("Animal no existe")
  }

  await ref.update({
    estado: "PENDING",
    adoptionRequestId: adoptionId
  })
}
