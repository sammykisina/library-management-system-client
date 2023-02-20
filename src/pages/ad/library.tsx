import { Books, Borrows, Tab } from "@/components";
import React, { useState } from "react";
import { HiQueueList, HiSquaresPlus } from "react-icons/hi2";

const Library = () => {
  /**
   * pages states
   */

  const [index, setIndex] = useState(0);
  const schoolTabs = [
    {
      label: "Books",
      content: <Books />,
      icon: <HiQueueList className="icon" />,
    },
    {
      label: "Borrows",
      content: <Borrows />,
      icon: <HiSquaresPlus className="icon" />,
    },
  ];
  return (
    <section className="h-full">
      <Tab
        tabsData={schoolTabs}
        tabsBodyStyles="lg:grid grid-cols-6 duration-300"
        index={index}
        iconsOnlyTabs
        setIndex={setIndex}
        iconsOnlyTabsStyles="flex flex-row  flex-wrap duration-300 lg:flex-col gap-2 col-span-1"
        tabsContentHeight="mt-[1rem] py-2 lg:mt-0 scrollbar-hide "
      />
    </section>
  );
};

export default Library;
