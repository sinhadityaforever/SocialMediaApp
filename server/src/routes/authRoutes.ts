import { Router } from "express";
import { register, login } from "../controllers/authController";

const router: Router = Router();
router.route("/register").post(register);
router.route("/login").post(login);

export default router;
