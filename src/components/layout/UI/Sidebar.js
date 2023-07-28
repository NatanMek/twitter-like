import "./Sidebar.css";
import {
  BookmarkBorder,
  ListAlt,
  MailOutline,
  MoreHoriz,
  PermIdentity,
  Twitter,
} from "@mui/icons-material";
import SidebarOption from "./SidebarOption";
import { Home, Search, NotificationsNone } from "@mui/icons-material";
import { Button } from "@mui/material";

function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <Twitter className="sidebar__twitterIcon" />
        <SidebarOption active Icon={Home} text="Home" />
        <SidebarOption Icon={Search} text="Explore" />
        <SidebarOption Icon={NotificationsNone} text="Notifications" />
        <SidebarOption Icon={MailOutline} text="Messages" />
        <SidebarOption Icon={BookmarkBorder} text="Bookmarks" />
        <SidebarOption Icon={ListAlt} text="Lists" />
        <SidebarOption Icon={PermIdentity} text="Profile" />
        <SidebarOption Icon={MoreHoriz} text="More" />
        <Button variant="outlined" className="sidebar__tweet" fullWidth>
          Tweet
        </Button>
      </div>
    </>
  );
}

export default Sidebar;
