import { Router } from "express";
import {
  createProjectController,
  getProjectsController,
  getProjectByIdController,
  updateProjectController,
  deleteProjectController
} from "../controllers/project.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = Router();

router.post("/", authMiddleware, upload.array("files", 5), createProjectController);
router.get("/", authMiddleware, getProjectsController);
router.get("/:id", authMiddleware, getProjectByIdController);
router.post("/:id/update", authMiddleware, upload.array("files", 5), updateProjectController);
router.delete("/:id", authMiddleware, deleteProjectController);

export default router;