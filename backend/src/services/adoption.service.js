import * as repo from "../repositories/Adoption.repository.js"
import admin from "firebase-admin"
import * as adoptionRepo from "../repositories/Adoption.repository.js"
import * as notificationRepo from "../repositories/Notification.repository.js"
import * as animalRepo from "../repositories/Animal.repository.js"
export const fetchAllAdoption = async () => {
  return await repo.getAllAdoption()
}

export const fetchAdoption = async (id) => {
  return await repo.getAdoptionById(id)
}

export const addAdoption = async (adoption) => {
 
    const {
    petId,
    petName,
    userName,
    email,
    phone,
    address,
    housingType,
    experience,
    message
  } = adoption

  // 🔒 Validación mínima
  if (!petId || !userName || !email || !phone) {
    throw new Error("Datos obligatorios faltantes")
  }

  // 1️⃣ Crear adopción
  const adoptionId = await adoptionRepo.createAdoption({
    petId,
    petName,
    userName,
    email,
    phone,
    address,
    housingType,
    experience,
    message,
    status: "PENDING",
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  })

 /*  // 2️⃣ Actualizar animal
  await animalRepo.updateAnimalStatus(petId, {
    status: "PENDING",
    adoptionRequestId: adoptionId
  })

  // 3️⃣ Crear notificación
  await notificationRepo.createNotification({
    type: "ADOPTION_REQUEST",
    petId,
    requestId: adoptionId,
    read: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  }) */

  return adoptionId
}

export const removeAdoption = async (id) => {
  return await repo.deleteAdoption(id)
}
