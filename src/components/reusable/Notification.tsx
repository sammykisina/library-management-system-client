import { format, isToday, isYesterday } from "date-fns";
import type { FC } from "react";

type NotificationProps = {
  notification: any;
};

const Notification: FC<NotificationProps> = ({ notification }) => {
  /**
   * component states
   */
  const tag = notification?.attributes?.tag;

  return (
    <section
      className={`rounded-[2rem] py-2  px-3   text-sm shadow-sm  ${
        tag === "approved" && "bg-indigo-500/50  "
      }  ${tag === "reject" && "bg-red-500/50  "}  ${
        tag === "notify" && "bg-amber-500/50  "
      } `}
    >
      {/* title */}
      <span
        className={`rounded-full bg-gray-200/10 px-3 py-1 text-sm font-bold  capitalize leading-loose shadow-sm ${
          tag === "approved" && "text-indigo-500"
        } ${tag === "reject" && "text-red-500"} ${
          tag === "notify" && "text-amber-500"
        }`}
      >
        {notification?.attributes?.title}
      </span>

      <p className="ml-5 text-secondary/50">
        {notification?.attributes?.description}
      </p>
      <p className="ml-5 mt-2 font-semibold">
        {notification?.attributes?.action}
      </p>

      <div
        className={`mt-4 w-fit rounded-full px-3 py-1 text-sm font-bold capitalize  leading-loose text-white shadow-sm ${
          tag === "approved" && "bg-indigo-500/50"
        }  ${tag === "reject" && "bg-red-500/50"} ${
          tag === "notify" && "bg-amber-500/50"
        }`}
      >
        {isToday(new Date(notification?.attributes?.createdAt))
          ? "Today"
          : isYesterday(new Date(notification?.attributes?.createdAt))
          ? "Yesterday"
          : format(
              new Date(notification?.attributes?.createdAt),
              "EE, MMM d, yyy"
            )}
      </div>
    </section>
  );
};

export default Notification;
