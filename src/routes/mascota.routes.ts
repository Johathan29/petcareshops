import { Router } from "express"
import {
  createMascota,
  getMascotas,
  getMascotaById,
  updateMascota,
  deleteMascota
} from "../controllers/mascotas.controller"

const router = Router()

router.post("/", createMascota)
router.get("/", getMascotas)
router.get("/:id", getMascotaById)
router.put("/:id", updateMascota)
router.delete("/:id", deleteMascota)

export default router
