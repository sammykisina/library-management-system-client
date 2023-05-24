import {
  HiBell,
  HiBookmark,
  HiHome,
  HiOutlineBell,
  HiOutlineBookmark,
  HiOutlineHome,
  HiOutlineQueueList,
  HiOutlineSquaresPlus,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
  HiQueueList,
  HiSquaresPlus,
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
    name: "Library",
    inactiveIcon: <HiOutlineBookmark className="icon" />,
    activeIcon: <HiBookmark className="icon" />,
    to: "/ad/library",
  },
  {
    name: "Users",
    inactiveIcon: <HiOutlineUserGroup className="icon" />,
    activeIcon: <HiUserGroup className="icon" />,
    to: "/ad/users",
  },

  // {
  //   name: "Notifications",
  //   inactiveIcon: <HiOutlineBell className="icon" />,
  //   activeIcon: <HiBell className="icon" />,
  //   to: "/ad/notifications",
  // },
  {
    name: "Profile",
    inactiveIcon: <HiOutlineUserCircle className="icon" />,
    activeIcon: <HiUserCircle className="icon" />,
    to: "/ad/profile",
  },
];

const userRoutes: Route[] = [
  {
    name: "Browse Books",
    inactiveIcon: <HiOutlineQueueList className="icon" />,
    activeIcon: <HiQueueList className="icon" />,
    to: "/us/books",
  },
  {
    name: "Library History",
    inactiveIcon: <HiOutlineSquaresPlus className="icon" />,
    activeIcon: <HiSquaresPlus className="icon" />,
    to: "/us/library-history",
  },
  {
    name: "Notifications",
    inactiveIcon: <HiOutlineBell className="icon" />,
    activeIcon: <HiBell className="icon" />,
    to: "/us/notifications",
  },
  {
    name: "Profile",
    inactiveIcon: <HiOutlineUserCircle className="icon" />,
    activeIcon: <HiUserCircle className="icon" />,
    to: "/us/profile",
  },
];

const routers = { commonRoutes, librarianRoutes, userRoutes };

export default routers;
