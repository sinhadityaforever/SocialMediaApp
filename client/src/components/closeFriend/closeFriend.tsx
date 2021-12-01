import { IDummyUser } from "../../dummyData";
import { userProps } from "../../type";
import "./closeFriend.css";
//TODO:change dummy type
type Props = {
  user: IDummyUser;
};

const CloseFriend: React.FC<Props> = ({ user }) => {
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={user.profilePicture} alt="" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
};

export default CloseFriend;
