import admin from "firebase-admin"
import { db } from "../config/firebase.js"
import * as repo from '../repositories/Notification.repository.js'
export const createNotification = async ({ petId, requestId }) => {
  return await db.collection("notifications").add({
    type: "ADOPTION_REQUEST",
    petId,
    requestId,
    read: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  })
}
export const getAllNotification = async () => {
  return await repo.getAllNotification()
}