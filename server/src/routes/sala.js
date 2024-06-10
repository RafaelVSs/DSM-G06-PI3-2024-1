import { Router } from "express";
import controller from "../controllers/sala.js";

const router = Router();

router.post("/", controller.create);
router.get("/", controller.retrieveAll);
router.get("/:id", controller.retrieveOneId);
router.delete("/:id", controller.delete);


export default router;