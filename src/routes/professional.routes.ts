import { Router } from "express";
import {
  createProfessional,
  getAllProfessionals,
  getProfessionalById,
} from "../controllers/professional.controller";
import { protect, authorize } from "../middleware/auth.middleware";

const router = Router();

// Rotas públicas (qualquer usuário autenticado)
router.get("/", protect, getAllProfessionals);
router.get("/:id", protect, getProfessionalById);

// Rota de criação restrita ao admin
router.post("/", protect, authorize("admin"), createProfessional);

export default router;
