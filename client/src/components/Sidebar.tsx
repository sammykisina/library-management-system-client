import { Button, Logo, NavLink } from "@/components";
import { useAuth } from "@/hooks";
import { routers } from "@/routers";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  /**
   * component states
   */
  const { logout, user } = useAuth();
  const pathname = usePathname();
  const { commonRoutes, librarianRoutes, userRoutes } = routers;

  /**
   * component functions
   */

  return (
    <aside className="relative z-40  flex h-screen w-[250px] flex-col justify-between border-x-2 border-primary p-2 pt-8 duration-300">
      <div className="mt-5">
        {/* the logo */}
        <div className="flex justify-center">
          <Logo logoStyles="text-[2.5rem]" dotStyles="w-2 h-2 bg-primary" />
        </div>

        {/* the links */}
        <ul className="flex flex-col gap-2  pt-6">
          {/* admin (librarian routes) */}
          {user?.role === "admin" &&
            commonRoutes
              .concat(librarianRoutes)
              .map((librarianRoute, routeIndex) => (
                <NavLink
                  key={routeIndex}
                  route={librarianRoute}
                  type="medium"
                  fullWidth={true}
                  active={pathname === librarianRoute.to && "navLinkActive"}
                />
              ))}

          {/* user (library user ) routes*/}
          {user?.role === "user" &&
            commonRoutes
              .concat(userRoutes)
              .map((userRoute, routeIndex) => (
                <NavLink
                  key={routeIndex}
                  route={userRoute}
                  type="medium"
                  fullWidth={true}
                  active={pathname === userRoute.to && "navLinkActive"}
                />
              ))}
        </ul>
      </div>

      {/* the logout button */}
      {user && (
        <Button
          title="logout"
          intent="primary"
          type="button"
          form="large"
          purpose={logout}
        />
      )}
    </aside>
  );
};

export default Sidebar;
