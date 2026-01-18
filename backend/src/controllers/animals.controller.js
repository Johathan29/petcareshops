import { db } from '../config/firebase.js'

const collection = db.collection('animals')

export const getAnimals = async (req, res) => {
  const snapshot = await collection.get()
  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
  res.json(data)
}

export const createAnimal = async (req, res) => {
  const docRef = await collection.add(req.body)
  res.status(201).json({ id: docRef.id })
}

export const updateAnimal = async (req, res) => {
  const { id } = req.params
  await collection.doc(id).update(req.body)
  res.json({ message: 'Updated' })
}

export const deleteAnimal = async (req, res) => {
  const { id } = req.params
  await collection.doc(id).delete()
  res.json({ message: 'Deleted' })
}
