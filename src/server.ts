import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db";

import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("API de Agendamento está no ar!");
});

import authRoutes from "./routes/auth.routes";
app.use("/api/auth", authRoutes);

import serviceRoutes from "./routes/service.routes";
app.use("/api/services", serviceRoutes);

import professionalRoutes from "./routes/professional.routes";
app.use("/api/professionals", professionalRoutes);

import appointmentRoutes from "./routes/appointment.routes";

app.use("/api/appointments", appointmentRoutes);

import availabilityRoutes from "./routes/availability.routes";
app.use("/api/availability", availabilityRoutes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
