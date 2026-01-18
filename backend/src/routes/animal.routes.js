import { Router } from "express"
import * as controller from "../controllers/animal.controller.js"

const router = Router()


router.post("/:id", controller.updateAnimalStatus)


export default router
