import { Router } from "express";
import {
  createAppointment,
  getMyAppointments,
  updateAppointment,
  cancelAppointment,
} from "../controllers/appointment.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// Criar novo agendamento (cliente autenticado)
router.post("/", protect, createAppointment);

// Listar todos os agendamentos do cliente autenticado
router.get("/me", protect, getMyAppointments);

// Atualizar agendamento (protegido)
router.patch("/:id", protect, updateAppointment);

// Cancelar agendamento (protegido)
router.patch("/:id/cancel", protect, cancelAppointment);

export default router;
