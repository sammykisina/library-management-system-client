import type { FC, ReactNode } from "react";
import { Icon } from "@/components";

type AdminDashboardCardProps = {
  title: string;
  icon: ReactNode;
  totalCount: number;
  numberOfCountLastMonth: number;
  bgColor: string;
  textColor: string;
};

const AdminDashboardCard: FC<AdminDashboardCardProps> = ({
  title,
  icon,
  numberOfCountLastMonth,
  totalCount,
  bgColor,
  textColor,
}) => {
  return (
    <div>
      <div
        className={`w-fit divide-y  rounded-[2rem]  ${bgColor} py-3 px-3 text-sm shadow-sm`}
      >
        <div className="flex items-center gap-4">
          <div className="pb-2">
            <div
              className={`flex justify-between gap-4 rounded-full bg-gray-200/10 px-3 py-1 text-sm  font-bold capitalize leading-loose ${textColor} shadow-sm`}
            >
              {title}
              <Icon iconWrapperStyles="text-white" icon={icon} />
            </div>
          </div>

          {/* count */}
          <div className="flex flex-col">
            <span className="text-2xl text-secondary">{totalCount}</span>
            <span className="tracking-wide text-secondary">{title}</span>
          </div>
        </div>

        {/* summary */}
        <div className="flex justify-between divide-x py-2">
          <div className="p-2">
            <div className="flex h-8 w-fit items-center justify-center rounded-[2rem] bg-indigo-200/50  px-3 text-lg text-white shadow-sm">
              {numberOfCountLastMonth}
            </div>

            <span className="tracking-wide text-secondary">Last Month</span>
          </div>

          <div className="py-2 pr-3 pl-2">
            <div className="flex items-center gap-2">
              <span>+</span>
              <div className="flex h-8 w-fit items-center justify-center rounded-[2rem]   px-3 text-lg text-white shadow-sm">
                {totalCount - numberOfCountLastMonth}
              </div>
            </div>

            <span className="tracking-wide text-secondary">This Month</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardCard;
