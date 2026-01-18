import * as service from "../services/pet.service.js"

export const getPets = async (req, res) => {
  try {
    const pets = await service.fetchPets()
    res.json(pets)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getPet = async (req, res) => {
  const pet = await service.fetchPet(req.params.id)
  if (!pet) return res.status(404).json({ message: "Not found" })
  res.json(pet)
}

export const createPet = async (req, res) => {
  try {
    const id = await service.addPet(req.body)
    res.status(201).json({ id })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const deletePet = async (req, res) => {
  await service.removePet(req.params.id)
  res.sendStatus(204)
}
