import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
// import authRoutes from "./app./routes/auth"
// import shopRoutes from "./app./routes/shops"
import router from "./app/routes/auth"

dotenv.config()

const app = express()

// Middleware
app.use(express.json())
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin.includes("localhost")) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
  })
)

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/nineamdb")

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
  console.log("Connected to MongoDB")
})

// Routes
app.use('/', router)
app.use("/api/auth", router)
app.use("/api/shops", router)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
