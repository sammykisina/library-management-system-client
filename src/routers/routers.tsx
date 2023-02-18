import {
  HiBell,
  HiHome,
  HiOutlineBell,
  HiOutlineHome,

} from "react-icons/hi2";
import { type Route } from "src/types/typings.t";

const commonRoutes: Route[] = [
  {
    name: "Home",
    inactiveIcon: <HiOutlineHome className="icon" />,
    activeIcon: <HiHome className="icon" />,
    to: "/",
  },
];





const routers = { commonRoutes, };

export default routers;