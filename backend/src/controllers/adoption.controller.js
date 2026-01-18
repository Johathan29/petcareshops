import * as service from "../services/adoption.service.js"

export const getAllAdoption= async (req, res) => {
  try {
    const adoption= await service.fetchAllAdoption()
    res.json(adoption)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getAdoption = async (req, res) => {
  const adoption = await service.fetchAdoption(req.params.id)
  if (!adoption) return res.status(404).json({ message: "Not found" })
  res.json(adoption)
}



export const createAdoption = async (req, res) => {
  try {
    const id = await service.addAdoption(req.body)

    res.status(201).json({
      message: "Solicitud creada correctamente",
      id
    })
  } catch (error) {
    console.error(error)
    res.status(400).json({
      message: error.message
    })
  }
}


export const deleteAdoption = async (req, res) => {
  await service.removeAdoption(req.params.id)
  res.sendStatus(204)
}

export const createAdoptionRequest = async (req, res) => {
  try {
    const {
      petId,
      petName,
      userName,
      email,
      phone,
      address,
      housingType,
      experience,
      message
    } = req.body

    // 1️⃣ Crear solicitud
    const requestRef = await db.collection('adoption').add({
      petId,
      petName,
      userName,
      email,
      phone,
      address,
      housingType,
      experience,
      message,
      status: 'PENDING',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    })

    // 2️⃣ Cambiar estado de mascota
    await db.collection('animals').doc(String(petId)).update({
      estado: 'PENDING',
      adoptionRequestId: requestRef.id
    })

    // 3️⃣ Notificación admin
    await db.collection('notifications').add({
      type: 'ADOPTION_REQUEST',
      petId,
      requestId: requestRef.id,
      read: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    })

    res.status(201).json({
      message: 'Solicitud creada correctamente',
      requestId: requestRef.id
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error creando solicitud' })
  }
}
