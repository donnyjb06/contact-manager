import { Router } from "express";
import { registerUser, loginUser, getCurrentUser } from "../controllers/user.controller";

const router = Router();

router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/current", getCurrentUser)

export { router as userRoutes }
