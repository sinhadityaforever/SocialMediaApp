import { IDummyUser } from "../../dummyData";
import { userProps } from "../../type";
import "./online.css";
type Props = {
  user: IDummyUser;
};
const Online: React.FC<Props> = ({ user }) => {
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src={user.profilePicture} alt="" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
};

export default Online;
