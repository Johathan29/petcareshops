import express from "express"
import cors from "cors"
import mascotaRoutes from "./routes/mascota.routes"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/mascotas", mascotaRoutes)

export default app
