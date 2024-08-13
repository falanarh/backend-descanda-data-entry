import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import listingUmkmRoutes from "./routes/listingUmkmRoutes";
import kuesionerUmkmRoutes from "./routes/kuesionerUmkmRoutes";

const cors = require("cors");

dotenv.config();

const app = express();

connectDB();

app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"], // Metode yang diizinkan
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// app.use(cors({
//   origin: ['https://desa-cantik-sda.vercel.app', 'http://localhost:5173'], // Ganti dengan domain Anda
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metode yang diizinkan
//   // allowedHeaders: ['Content-Type', 'Authorization']
// }));

app.use(express.json());
// app.use(bodyParser.json());

app.use("/api/user", userRoutes);
app.use("/api/listingUmkm", listingUmkmRoutes);
app.use("/api/kuesionerUmkm", kuesionerUmkmRoutes);

export default app;
