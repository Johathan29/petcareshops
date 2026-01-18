import { Router } from "express"
import {
  notifyAdoption,
  getAllNotification
} from '../controllers/notification.controller.js'

const router = Router()

router.get("/", getAllNotification)
router.post("/", notifyAdoption)


export default router
