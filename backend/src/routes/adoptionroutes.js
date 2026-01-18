import { Router } from "express"
import * as controller from "../controllers/adoption.controller.js"

const router = Router()

router.get("/", controller.getAllAdoption)
router.get("/:id", controller.getAdoption)
router.post("/", controller.createAdoption)
router.delete("/:id", controller.deleteAdoption)

export default router
