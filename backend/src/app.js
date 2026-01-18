import express from "express"
import cors from "cors"
import petRoutes from "./routes/pet.routes.js"
import adoptionRoutes from "./routes/adoptionroutes.js"
import notificationRoutes from "./routes/notification.routes.js"
import animalRoutes from './routes/animal.routes.js'
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/notifications", notificationRoutes)
app.use("/api/animal", animalRoutes)
app.use("/api/animals", petRoutes)
app.use("/api/adoption", adoptionRoutes)

export default app
