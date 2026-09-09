import { Router } from "express";

import {
  createClientController,
  getClientsController,
  getClientByIdController,
  updateClientController,
  deleteClientController
} from "../controllers/client.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = Router();

router.post("/", authMiddleware, upload.array("files", 5), createClientController);
router.get("/", authMiddleware, getClientsController);
router.get("/:id", authMiddleware, getClientByIdController);
router.post("/:id/update", authMiddleware, upload.array("files", 5), updateClientController);
router.delete("/:id", authMiddleware, deleteClientController);

export default router;