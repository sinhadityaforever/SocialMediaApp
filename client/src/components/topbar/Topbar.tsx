import "./topbar.css";
import {
  Search,
  Person,
  Chat,
  Notifications,
  PowerInput,
  PowerSettingsNew,
  EditRounded,
  Edit,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { loginFailed } from "../../features/userSlice";
import { Tooltip } from "@material-ui/core";
const Topbar = () => {
  const selectedUser = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const submit = () => {
    confirmAlert({
      title: "Log Out",
      message: "Do you want to log out?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            localStorage.removeItem("user");
            dispatch(loginFailed());
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">SocioApp</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        {/* <div className="topbarLinks">
          <Link to={"/"}>
            <span style={{ color: "white" }} className="topbarLink">
              Homepage
            </span>
          </Link>
        </div> */}
        <div className="topbarIcons topbarRightContainer">
          <div className="topbarIconItem" onClick={submit}>
            <Tooltip title="Log Out">
              <PowerSettingsNew />
            </Tooltip>
          </div>

          <div className="topbarIconItem">
            <Tooltip title="Edit Profile">
              <Link to="/profile/edit">
                <Edit style={{ fill: "white" }} />
              </Link>
            </Tooltip>
          </div>
        </div>
        <Tooltip title="View Profile">
          <Link to={`/profile/${selectedUser?.username}`}>
            <img
              src={selectedUser?.profilePicture}
              alt=""
              className="topbarImg"
            />
          </Link>
        </Tooltip>
      </div>
    </div>
  );
};

export default Topbar;
