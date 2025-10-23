import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

import { protect } from "../middleware/auth.middleware";

router.get("/me", protect, (req, res) => {
  res.status(200).json(req.user);
});

export default router;
