import { Router } from "express";
import { createAppointment, getMyAppointments } from "../controllers/appointment.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// Criar novo agendamento (cliente autenticado)
router.post("/", protect, createAppointment);

// Listar todos os agendamentos do cliente autenticado
router.get("/me", protect, getMyAppointments);

export default router;
