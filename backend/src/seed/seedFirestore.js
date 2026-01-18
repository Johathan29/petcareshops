import { db } from '../config/firebase.js'
import data from '../Data.js'

const [portada, animals, diseases, services] = data.value

const seedCollection = async (name, items) => {
  const batch = db.batch()
  items.forEach(item => {
    const ref = db.collection(name).doc()
    batch.set(ref, item)
  })
  await batch.commit()
}

const seed = async () => {
 // await seedCollection('portada', data.value[0])
  //await seedCollection('animals', data.value[1])
  await seedCollection('diseases', data.value[2])
  await seedCollection('services', data.value[3])

  console.log('✅ Firestore seeded')
  process.exit()
}

seed()
