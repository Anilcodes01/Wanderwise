import express from "express";
import authRoutes from "./routes/authRouter.js";
import packageRoutes from './routes/PackageRouter.js'
import connectToDB from "./db/mongodb.js";
import adminRoutes from './routes/adminRouter.js'
import cors from 'cors'


connectToDB()

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', "https://wanderwise-tl1p.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}))

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use('/api', packageRoutes)
app.use('/api/admin', adminRoutes)

app.listen(3000, () => {
  console.log(`Server started at ${3000}`);
});
