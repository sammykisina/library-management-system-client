import { type FC, type ReactNode, useRef } from "react";
import { Icon } from "@/components";
import { type SetterOrUpdater } from "recoil";
import { useClickOutside } from "@/hooks";

interface DropdownProps {
  active?: ReactNode;
  inactive: ReactNode;
  dropdownComponent: ReactNode;
  displayState: boolean;
  setDisplayState: SetterOrUpdater<boolean>;
  badge?: number;
}

const Dropdown: FC<DropdownProps> = ({
  active,
  inactive,
  dropdownComponent,
  displayState,
  setDisplayState,
  badge,
}) => {
  /**
   * component states
   */
  const dropdownComponentRef = useRef<HTMLDivElement>(null);

  /**
   * component functions
   */
  useClickOutside(dropdownComponentRef, () => setDisplayState(false));

  return (
    <div className="relative z-40" ref={dropdownComponentRef}>
      <div className="group">
        <Icon
          icon={displayState ? active : inactive}
          iconWrapperStyles={`p-2 z-30  rounded-full relative ${
            displayState && "bg-primary text-white"
          }`}
          purpose={() => setDisplayState((prev) => !prev)}
        />

        {badge
          ? badge > 0 && (
              <div className="group-hover:text-dark absolute top-[0.5rem] right-[0.5rem] z-30 h-2 w-2 items-center justify-center rounded-full bg-red-500 text-sm duration-300" />
            )
          : ""}
      </div>

      <div
        className={` ${
          displayState ? "dropdownContent active" : "dropdownContent"
        }`}
      >
        {dropdownComponent}
      </div>
    </div>
  );
};

export default Dropdown;