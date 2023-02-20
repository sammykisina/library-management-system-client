import {
  HiBell,
  HiBookmark,
  HiHome,
  HiOutlineBell,
  HiOutlineBookmark,
  HiOutlineHome,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
  HiUserCircle,
  HiUserGroup,
} from "react-icons/hi2";
import { type Route } from "src/types/typings.t";

const commonRoutes: Route[] = [
  {
    name: "Dashboard",
    inactiveIcon: <HiOutlineHome className="icon" />,
    activeIcon: <HiHome className="icon" />,
    to: "/",
  },
];

const librarianRoutes: Route[] = [
  {
    name: "Users",
    inactiveIcon: <HiOutlineUserGroup className="icon" />,
    activeIcon: <HiUserGroup className="icon" />,
    to: "/ad/users",
  },
  {
    name: "Library",
    inactiveIcon: <HiOutlineBookmark className="icon" />,
    activeIcon: <HiBookmark className="icon" />,
    to: "/ad/library",
  },
  {
    name: "Notifications",
    inactiveIcon: <HiOutlineBell className="icon" />,
    activeIcon: <HiBell className="icon" />,
    to: "/ad/notifications",
  },
  {
    name: "Profile",
    inactiveIcon: <HiOutlineUserCircle className="icon" />,
    activeIcon: <HiUserCircle className="icon" />,
    to: "/ad/profile",
  },
];

const routers = { commonRoutes, librarianRoutes };

export default routers;
