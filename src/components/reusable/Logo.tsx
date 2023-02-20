import Link from "next/link";
import type { FC } from "react";

interface LogoProps {
  logoStyles?: string;
  dotStyles?: string;
}

const Logo: FC<LogoProps> = ({ logoStyles, dotStyles }) => {
  return (
    <Link
      href="/"
      className={`flex cursor-pointer  items-center gap-1 font-bold  ${logoStyles}`}
    >
      <div className="text-shadow relative whitespace-nowrap font-semibold leading-tight tracking-wider">
        LMS
        <div
          className={`absolute  bottom-[0.2rem] -right-[0.2rem] self-end  rounded-full ${dotStyles}`}
        />
      </div>
    </Link>
  );
};

export default Logo;
