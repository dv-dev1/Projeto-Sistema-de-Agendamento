import { Router } from "express";
import { getAvailableSlots } from "../controllers/availability.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// Disponibilidade de um profissional em um dia específico
router.get("/:professionalId", protect, getAvailableSlots);

export default router;
