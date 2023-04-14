import type { FC, ReactNode } from "react";

interface TitleProps {
  title: string | ReactNode;
  titleStyles?: string;
}

const Title: FC<TitleProps> = ({ title, titleStyles }) => {
  return (
    <h2
      className={`whitespace-nowrap font-semibold leading-tight tracking-wider ${
        titleStyles ? titleStyles : "text-gray-900"
      }`}
    >
      {title}
    </h2>
  );
};

export default Title;
