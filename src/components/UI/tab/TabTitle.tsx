import React, { type FC } from "react";
import { Title } from "@/components";

type TabTitleProps = {
  title: string;
  titleStyles?: string;
};

const TabTitle: FC<TabTitleProps> = ({ title, titleStyles }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-secondary icon rounded-full" />
      <Title
        title={title}
        titleStyles={`${titleStyles ? titleStyles : "text-white"}`}
      />
    </div>
  );
};

export default TabTitle;
