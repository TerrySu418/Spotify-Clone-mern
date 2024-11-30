import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/auth.middleware.js";
import {
  createSong,
  deleteSong,
  createAlbum,
  deleteAlbum,
  checkAdmin,
} from "../controllers/admin.controller.js";

const router = Router();

//clean code
router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin);

router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);

router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);
// router.post("/songs", protectRoute, requireAdmin, createSong);
// router.delete("/songs/:id", protectRoute, requireAdmin, deleteSong);
// router.post("/albums", protectRoute, requireAdmin, createAlbum);
// router.delete("/albums/:id", protectRoute, requireAdmin, deleteAlbum);

export default router;
