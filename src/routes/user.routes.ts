import { Router } from "express";
import { registerUser, loginUser, getCurrentUser } from "../controllers/user.controller";
import verifyTokenHandler from "../middleware/verifyTokenHandler";

const router = Router();

router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/current", verifyTokenHandler, getCurrentUser)

export { router as userRoutes }
