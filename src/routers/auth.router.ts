import express, { Router } from "express";
import { login, signup } from "../controllers/auth.controller";

const router: Router = express.Router();

router.post("/auth/login", login);
router.post("/auth/signup", signup);

export default router;
