import "./rightbar.css";

import Online from "../online/Online";
import { IUser } from "../../type";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Add, Remove } from "@material-ui/icons";
import { follow, unfollow } from "../../features/userSlice";
//TODO: add type to profile
type Props = {
  user?: IUser & {
    _id?: string;
  };
  showFollow?: boolean;
};

const Rightbar: React.FC<Props> = ({ user, showFollow }) => {
  console.log(user);

  const dispatch = useAppDispatch();
  const selectedUser = useAppSelector((state) => state.user.user);
  const [friends, setFriends] = useState<any[]>([]);
  const [followed, setFollowed] = useState<any>(
    selectedUser?.followings?.includes(user?._id)
  );

  const [users, setUsers] = useState<IUser[] | undefined>();

  useEffect(() => {
    setFollowed(selectedUser?.followings?.includes(user?._id));
  }, [user]);
  useEffect(() => {
    const getAllSuggestions = async () => {
      console.log(selectedUser?.followings);

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER}/users/all/${selectedUser?._id}`
        );
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllSuggestions();
  }, []);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          `${process.env.REACT_APP_SERVER}/users/friends/${user!._id}`
        );
        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    console.log("clicked");

    try {
      if (followed) {
        await axios.put(
          `${process.env.REACT_APP_SERVER}/users/${user?._id}/unfollow`,
          {
            userId: selectedUser?._id,
          }
        );
        dispatch(unfollow(user?._id));
        console.log("dispatched");
      } else {
        await axios.put(
          `${process.env.REACT_APP_SERVER}/users/${user?._id}/follow`,
          {
            userId: selectedUser?._id,
          }
        );
        dispatch(follow(user?._id));
        console.log("dispatched");
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
    console.log("end");
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={`/assets/gift.png`} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img
          className="rightbarAd"
          src="https://res.cloudinary.com/dbh0wt0zm/image/upload/v1638611196/Socio_admin/ad5_ap74sb.jpg"
          alt=""
        />
        <h4 className="rightbarTitle">Your Friends</h4>
        <ul className="rightbarFriendList">
          {users &&
            users.map((u: any) => (
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/profile/${u.username}`}
              >
                <Online key={u.id} user={u} />
              </Link>
            ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user?.username !== selectedUser?.username && showFollow && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user!.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user!.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user!.relationship}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        {friends.map((friend) => {
          <Link to={`/profile/${friend.username}`}>
            <div className="rightbarFollowings">
              <div className="rightbarFollowing">
                <img
                  src={friend.profilePicture}
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span
                  className="rightbarFollowingName"
                  style={{ textDecoration: "none" }}
                >
                  {friend.username}
                </span>
              </div>
            </div>
          </Link>;
        })}
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default Rightbar;
