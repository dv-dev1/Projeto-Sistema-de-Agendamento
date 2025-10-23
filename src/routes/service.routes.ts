import { Router } from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/service.controller";
import { protect, authorize } from "../middleware/auth.middleware";

const router = Router();

// Rotas acessíveis para qualquer usuário autenticado (cliente/logado)
router.get("/", protect, getAllServices);
router.get("/:id", protect, getServiceById);

// Rotas restritas a administradores
router.post("/", protect, authorize("admin"), createService);
router.put("/:id", protect, authorize("admin"), updateService);
router.delete("/:id", protect, authorize("admin"), deleteService);

export default router;
