import { Router } from 'express'
import {
  getAnimals,
  createAnimal,
  updateAnimal,
  deleteAnimal
} from '../controllers/animals.controller.js'



const router = Router()

router.get("/", getAnimals)
router.get("/:id", updateAnimal)
router.post("/", createAnimal)
router.delete("/:id", deleteAnimal)

export default router

