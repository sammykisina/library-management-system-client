import { Notification, SpinnerLoader, Title } from "@/components";
import { useProfile } from "@/hooks";
import { format, isEqual } from "date-fns";
import React from "react";

const Notifications = () => {
  /**
   * page states
   */
  const { profile, isFetchingProfile } = useProfile();

  return (
    <section className="mt-2 flex h-full flex-col gap-2 overflow-y-scroll  px-2 scrollbar-hide">
      {/* Title */}
      <Title title="YOUR NOTIFICATIONS" titleStyles="text-lg" />

      <div className="flex flex-col gap-5 space-y-4 rounded-[2rem] border px-3 py-2">
        {/* Notifications */}
        {isFetchingProfile ? (
          <div className="flex h-[11rem] items-center justify-center">
            <SpinnerLoader color="fill-primary" />
          </div>
        ) : profile?.relationships?.notifications?.length !== 0 ? (
          <div className="flex h-[36rem] flex-col gap-3 overflow-y-scroll py-2 scrollbar-hide">
            {profile?.relationships?.notifications?.map(
              (notification: any, notificationIndex: number) => (
                <Notification
                  key={notificationIndex}
                  notification={notification}
                />
              )
            )}
          </div>
        ) : (
          <div className="flex h-[10rem] items-center text-lg tracking-wider">
            You Have No Notifications.
          </div>
        )}
      </div>
    </section>
  );
};

export default Notifications;
