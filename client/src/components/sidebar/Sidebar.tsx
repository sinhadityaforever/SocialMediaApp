import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";

import CloseFriend from "../closeFriend/closeFriend";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "../../app/hooks";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [users, setUsers] = useState<any>();
  const selectedUser = useAppSelector((state) => state.user.user);
  useEffect(() => {
    const getAllSuggestions = async () => {
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

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <Link style={{ color: "black", textDecoration: "none" }} to="/error">
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </li>
            <li className="sidebarListItem">
              <Chat className="sidebarIcon" />
              <span className="sidebarListItemText">Chats</span>
            </li>
            <li className="sidebarListItem">
              <PlayCircleFilledOutlined className="sidebarIcon" />
              <span className="sidebarListItemText">Videos</span>
            </li>
            <li className="sidebarListItem">
              <Group className="sidebarIcon" />
              <span className="sidebarListItemText">Groups</span>
            </li>
            <li className="sidebarListItem">
              <Bookmark className="sidebarIcon" />
              <span className="sidebarListItemText">Bookmarks</span>
            </li>
            <li className="sidebarListItem">
              <HelpOutline className="sidebarIcon" />
              <span className="sidebarListItemText">Questions</span>
            </li>
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              <span className="sidebarListItemText">Jobs</span>
            </li>
            <li className="sidebarListItem">
              <Event className="sidebarIcon" />
              <span className="sidebarListItemText">Events</span>
            </li>
            <li className="sidebarListItem">
              <School className="sidebarIcon" />
              <span className="sidebarListItemText">Courses</span>
            </li>
          </ul>
        </Link>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <p>Suggested People:</p>
        <ul className="sidebarFriendList">
          {users && users.map((u: any) => <CloseFriend key={u.id} user={u} />)}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
