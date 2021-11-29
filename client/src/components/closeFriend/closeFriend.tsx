import { userProps } from "../../type";
import "./closeFriend.css";

const CloseFriend: React.FC<userProps> = ({ user }) => {
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={user.profilePictureUrl} alt="" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
};

export default CloseFriend;
