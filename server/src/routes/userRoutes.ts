import { Router } from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
} from "../controllers/userController";

const router: Router = Router();

router.route("/:id").put(updateUser).delete(deleteUser).get(getUser);

router.route("/:id/follow").put(followUser);
router.route("/:id/unfollow").put(unfollowUser);
export default router;
