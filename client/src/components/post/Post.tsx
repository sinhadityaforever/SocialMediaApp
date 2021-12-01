import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { IUser, postProps } from "../../type";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
const Post: React.FC<postProps> = ({ post }) => {
  const selectedUser = useAppSelector((state) => state.user.user);
  const [like, setLike] = useState(post.likes!.length);
  const [isLiked, setIsLiked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const likeHandler = async () => {
    try {
      console.log(post._id);

      await axios.put(
        `${process.env.REACT_APP_SERVER}/posts/${post._id}/like`,
        { userId: selectedUser?._id }
      );
    } catch (error) {
      alert("cant like at this moment");
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER}/users?userId=${post.userId}`
      );
      setUser(res.data);
      console.log(user);
    };
    fetchUser();
  }, [post.userId]);

  return (
    <div className="post">
      {user && post && (
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <Link to={`profile/${user.username}`}>
                <img
                  className="postProfileImg"
                  src={user!.profilePicture || PF + "person/noAvatar.png"}
                  alt=""
                />
              </Link>
              <span className="postUsername">{user!.username}</span>
              <span className="postDate">{format(post.createdAt!)}</span>
            </div>
            <div className="postTopRight">
              <MoreVert />
            </div>
          </div>
          <div className="postCenter">
            <span className="postText">{post?.desc}</span>
            <img className="postImg" src={post.img} alt="" />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <img
                className="likeIcon"
                src="http://localhost:3000/assets/like.png"
                onClick={likeHandler}
                alt=""
              />
              <img
                className="likeIcon"
                src="http://localhost:3000/assets/heart.png"
                onClick={likeHandler}
                alt=""
              />
              <span className="postLikeCounter">{like} people like it</span>
            </div>
            <div className="postBottomRight">
              <span className="postCommentText">{post.comment} comments</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
