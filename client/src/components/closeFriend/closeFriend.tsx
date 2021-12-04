import { Link } from "react-router-dom";

import { IUser, userProps } from "../../type";
import "./closeFriend.css";
//TODO:change dummy type
type Props = {
  user: IUser;
};

const CloseFriend: React.FC<Props> = ({ user }) => {
  return (
    <Link
      style={{ textDecoration: "none", color: "black" }}
      to={`/profile/${user.username}`}
    >
      <li className="sidebarFriend">
        <img className="sidebarFriendImg" src={user.profilePicture} alt="" />
        <span className="sidebarFriendName">{user.username}</span>
      </li>
    </Link>
  );
};

export default CloseFriend;
