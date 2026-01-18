import { lockAnimalForAdoption } from "../services/animal.service.js"

export const updateAnimalStatus = async (req, res) => {
  try {
    await lockAnimalForAdoption(req.params.id, req.body.adoptionId)
    res.sendStatus(204)
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}
