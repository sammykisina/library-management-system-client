import React, { useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { appAtoms } from "@/atoms";
import { Dropdown, Icon, NavLink, Profile, Title } from "@/components";
import { HiBell, HiOutlineBell, HiOutlineUser, HiUser } from "react-icons/hi2";
import { useAuth, useProfile } from "@/hooks";
import { format, isEqual } from "date-fns";

const TopHeader = () => {
  /**
   * component states
   */
  const { showSidebarState } = appAtoms;
  const setShowSidebar = useSetRecoilState(showSidebarState);
  const pathname = usePathname();
  const [showProfileDropdown, setShowProfileDropdown] =
    useState<boolean>(false);
  // const [showNotificationDropdown, setShowNotificationDropdown] =
  //   useState<boolean>(false);

  const { user } = useAuth();

  const { profile, isFetchingProfile } = useProfile();

  // const todaysNotifications = profile?.relationships?.notifications?.filter(
  //   (notification: any) =>
  //     isEqual(
  //       new Date(format(new Date(), "EE, MMM d, yyy")),
  //       new Date(
  //         format(
  //           new Date(notification?.attributes?.createdAt),
  //           "EE, MMM d, yyy"
  //         )
  //       )
  //     )
  // );

  /**
   * component function
   */
  const getTitle: (pathname: string) => string = (pathname) => {
    let title = "";

    switch (pathname) {
      case "/":
        title = "Dashboard";
        break;

      case "/auth/login":
        title = "Login";
        break;

      case "/auth/signup":
        title = "Sign Up";
        break;

      case "/ad/users":
        title = "All Users";
        break;

      case "/ad/library":
        title = "Library";
        break;

      default:
        title = "Title";
    }

    return title;
  };

  return (
    <nav className="flex h-[50px] items-center justify-between rounded-xl border border-secondary/30 px-2 sm:px-0">
      <div className="flex items-center gap-x-4">
        <Icon
          icon={
            <HiOutlineMenuAlt3 className="text-c_green h-5 w-5 sm:hidden" />
          }
          purpose={() => setShowSidebar((prevShowSidebar) => !prevShowSidebar)}
        />

        {/* the current page title */}
        {pathname && (
          <Title
            title={getTitle(pathname)}
            titleStyles="capitalize text-c_dark text-xl font-semibold tracking-wider"
          />
        )}
      </div>

      {/* the rest of the icons */}
      <div className="flex items-center  gap-x-2">
        {/* the current user dropdown */}
        {user ? (
          <div className="flex items-center px-2">
            <Dropdown
              inactive={<HiOutlineUser className="icon" />}
              active={<HiUser className="icon" />}
              dropdownComponent={<Profile />}
              displayState={showProfileDropdown}
              setDisplayState={setShowProfileDropdown}
            />

            {/* <Dropdown
                inactive={<HiOutlineBell className="icon" />}
                active={<HiBell className="icon" />}
                dropdownComponent={}
                displayState={showNotificationDropdown}
                setDisplayState={setShowNotificationDropdown}
                badge={}
              /> */}
          </div>
        ) : (
          <div className="flex items-center px-2">
            <NavLink
              route={{ to: "/auth/login", name: "Login" }}
              type="link"
              fullWidth={false}
              active={pathname === "/auth/login" && "activeLink"}
            />

            <NavLink
              route={{ to: "/auth/signup", name: "Sign Up" }}
              type="link"
              fullWidth={false}
              active={pathname === "/auth/signup" && "activeLink"}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopHeader;
