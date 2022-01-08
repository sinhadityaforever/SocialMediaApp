import { Router } from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
  getFriends,
  validateUsername,
  getAllUsers,
  testUser,

  // getUserByUsername,
} from "../controllers/userController";

const router: Router = Router();
router.route("/test").get(testUser);
router.route("/all/:userId").get(getAllUsers);
router.route("/validate/:username").get(validateUsername);
router.route("/friends/:userId").get(getFriends);
router.route("/").delete(deleteUser).get(getUser);
router.route("/update/:userId").put(updateUser);
// router.route("/username/:username").get(getUserByUsername);
router.route("/:id/follow").put(followUser);
router.route("/:id/unfollow").put(unfollowUser);
export default router;
