import { Router } from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
  // getUserByUsername,
} from "../controllers/userController";

const router: Router = Router();

router.route("/").put(updateUser).delete(deleteUser).get(getUser);
// router.route("/username/:username").get(getUserByUsername);
router.route("/:id/follow").put(followUser);
router.route("/:id/unfollow").put(unfollowUser);
export default router;
