import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useRef, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import axios from "axios";
import { IUser } from "../../type";
import { useParams } from "react-router";
import Error from "../error/Error";

const Profile = () => {
  const loadRef = useRef<any>();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const username = useParams().username;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState<IUser>();
  useEffect(() => {
    loadRef.current.continuousStart();
    setIsLoading(true);
    const fetchUser = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER}/users?username=${username}`
      );
      setUser(res.data);
      loadRef.current.complete();
      setIsLoading(false);
    };
    fetchUser();

    console.log(isLoading);
  }, [username]);

  return (
    <>
      <LoadingBar height={5} ref={loadRef} color={"white"} />
      {user && (
        <div>
          <Topbar />

          <div className="profile">
            <Sidebar />
            <div className="profileRight">
              <div className="profileRightTop">
                <div className="profileCover">
                  <img
                    className="profileCoverImg"
                    src={user.coverPicture || PF + "person/noCover"}
                    alt=""
                  />
                  <img
                    className="profileUserImg"
                    src={user.profilePicture || PF + "person/noAvatar"}
                    alt=""
                  />
                </div>
                <div className="profileInfo">
                  <h4 className="profileInfoName">{user.username}</h4>
                  <span className="profileInfoDesc">{user.desc}</span>
                </div>
              </div>
              <div className="profileRightBottom">
                <Feed username={user.username} isProfile={true} />
                <Rightbar user={user} showFollow={true} />
              </div>
            </div>
          </div>
        </div>
      )}
      {!user && isLoading === false && <Error />}
    </>
  );
};
export default Profile;
