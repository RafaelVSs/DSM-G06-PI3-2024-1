import { Router } from "express";
import controller from "../controllers/sala.js";

const router = Router();

router.post("/", controller.create);
router.get("/", controller.retrieveAll);
router.get("/:id", controller.retrieveOneId);
router.get("/local/:local", controller.retrieveLocal);
router.delete("/:id", controller.delete);


export default router;