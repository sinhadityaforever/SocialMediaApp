import axios from "axios";
import { useEffect, useRef, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { useAppSelector } from "../../app/hooks";
import { IPost, IUser } from "../../type";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
type FeedProps = {
  username?: string;
  isProfile?: boolean;
};

const Feed: React.FC<FeedProps> = ({ username, isProfile }) => {
  const loadRef = useRef<any>();
  const [posts, setPosts] = useState([]);
  const selectedUser = useAppSelector((state) => state.user.user);
  useEffect(() => {
    const fetchPosts = async () => {
      loadRef.current.continuousStart();
      const res = username
        ? await axios.get(
            `${process.env.REACT_APP_SERVER}/posts/profile/${username}`
          )
        : await axios.get(
            `${process.env.REACT_APP_SERVER}/posts/timeline/` +
              selectedUser!._id
          );
      setPosts(
        res.data.sort((p1: any, p2: any) => {
          return (
            (new Date(p2.createdAt) as any) - (new Date(p1.createdAt) as any)
          );
        })
      );
      loadRef.current.complete();
    };
    fetchPosts();

    console.log(posts);
  }, [username]);

  return (
    <div className="feed">
      <LoadingBar ref={loadRef} color="white" height={5} />
      {posts && (
        <div className="feedWrapper">
          {(!username || username === selectedUser?.username) && <Share />}

          {posts.map((p: any) => (
            <Post isProfile={isProfile} key={p._id} post={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
