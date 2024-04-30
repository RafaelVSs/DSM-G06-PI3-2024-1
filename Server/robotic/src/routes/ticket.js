import { Router } from "express";
import controller from "../controllers/ticket.js";

const router = Router();

rputer.post("/", controller.create);
