import { Router } from "express";
import {
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  getPosts,
  getTimelinePosts,
  getUserPosts,
} from "../controllers/postController";

const router: Router = Router();

router.route("/").post(createPost);
router.route("/:id").put(updatePost).delete(deletePost).get(getPosts);

router.route("/:id/like").put(toggleLike);
router.route("/timeline/:userId").get(getTimelinePosts);
router.route("/profile/:username").get(getUserPosts);
export default router;
