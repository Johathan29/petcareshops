import { Router } from "express"
import * as controller from "../controllers/pet.controller.js"

const router = Router()

router.get("/", controller.getPets)
router.get("/:id", controller.getPet)
router.post("/", controller.createPet)
router.delete("/:id", controller.deletePet)

export default router
