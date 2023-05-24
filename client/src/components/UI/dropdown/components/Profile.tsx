import { useAuth, useProfile } from "@/hooks";
import { appUtils } from "@/utils";
import React from "react";
import SpinnerLoader from "src/components/reusable/SpinnerLoader";

const Profile = () => {
  /**
   * component states
   */
  const { profile, isFetchingProfile } = useProfile();
  const { user } = useAuth();
  const { generateAvatar } = appUtils;

  return (
    <section className="h-[10rem] w-[20rem]">
      {isFetchingProfile ? (
        <div className="h-full w-full items-center justify-center">
          <SpinnerLoader color="fill-primary" />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center gap-4">
          <img
            src={generateAvatar(user?.email || "")}
            className="rounded-full"
          />

          <div className="flex flex-col gap-2">
            <span className="w-fit rounded-full bg-[#170140]/10 px-3 py-1 text-sm capitalize leading-loose text-[#170140] shadow-sm">
              {user?.name}
            </span>
            <span>{user?.email}</span>
            <span>{user?.phone}</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
