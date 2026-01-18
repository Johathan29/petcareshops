import * as repo from "../repositories/pet.repository.js"

export const fetchPets = async () => {
  return await repo.getAllPets()
}

export const fetchPet = async (id) => {
  return await repo.getPetById(id)
}

export const addPet = async (pet) => {
  if (!pet.nombre || !pet.especie) {
    throw new Error("Nombre y especie son obligatorios")
  }
  return await repo.createPet(pet)
}

export const removePet = async (id) => {
  return await repo.deletePet(id)
}
