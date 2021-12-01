import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";

import axios from "axios";
import { IUser } from "../../type";
import { useParams } from "react-router";

const Profile = () => {
  const username = useParams().username;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState<IUser>();
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER}/users?username=${username}`
      );
      setUser(res.data);
    };
    fetchUser();
    console.log(user);
  }, []);

  return (
    <>
      <Topbar />
      {user && (
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
                <span className="profileInfoDesc">ABCD</span>
              </div>
            </div>
            <div className="profileRightBottom">
              <Feed username={user.username} />
              <Rightbar user={user} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Profile;
