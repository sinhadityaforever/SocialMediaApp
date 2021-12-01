import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { IUser } from "../../type";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
type FeedProps = {
  username?: string;
};

const Feed: React.FC<FeedProps> = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const selectedUser = useAppSelector((state) => state.user.user);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(
            `${process.env.REACT_APP_SERVER}/posts/profile/${username}`
          )
        : await axios.get(
            `${process.env.REACT_APP_SERVER}/posts/timeline/` +
              selectedUser!._id
          );
      setPosts(res.data);
    };
    fetchPosts();
    console.log(posts);
  }, [username, selectedUser]);

  return (
    <div className="feed">
      {posts && (
        <div className="feedWrapper">
          <Share />
          {posts.map((p: any) => (
            <Post key={p._id} post={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
