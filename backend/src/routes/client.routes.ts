import { Router } from "express";

import {
  createClientController,
  getClientsController,
  getClientByIdController,
  updateClientController,
  deleteClientController
} from "../controllers/client.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, createClientController);
router.get("/", authMiddleware, getClientsController);
router.get("/:id", authMiddleware, getClientByIdController);
router.patch("/:id", authMiddleware, updateClientController);
router.delete("/:id", authMiddleware, deleteClientController);

export default router;