import * as notification  from "../services/notification.service.js"

export const notifyAdoption = async (req, res) => {
  try {
    await notification.createNotification(req.body)
    res.sendStatus(201)
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}
export const getAllNotification= async (req, res) => {

   try {
     const adoption= await notification.getAllNotification()
     res.json(adoption)
   } catch (err) {
     res.status(500).json({ message: err.message })
   
}
}