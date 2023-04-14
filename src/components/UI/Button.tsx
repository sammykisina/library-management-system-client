import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode, FC } from "react";

const buttonStyles = cva(
  "flex items-center justify-center px-4 py-2 rounded-full  focus:outline-none whitespace-nowrap disabled:cursor-not-allowed",
  {
    variants: {
      intent: {
        primary: "bg-primary text-white",
        secondary: "bg-secondary/10 text-secondary",
        danger: "bg-red-500 text-white",
        link: "text-primary font-semibold",
      },
      form: {
        small: "h-[35px] gap-[6px] text-[12px]",
        medium: "h-[40px] gap-[8px] px-[16px] text-[16px]",
        large: "h-[56px] gap-[8px] px-[20px] text-[18px]",
      },
      fullWidth: {
        true: "w-full",
        false: "w-fit",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

interface ButtonProps extends VariantProps<typeof buttonStyles> {
  title?: string | ReactNode;
  purpose?: () => void;
  disabled?: boolean;
  type: "reset" | "button" | "submit" | undefined;
}

const Button: FC<ButtonProps> = ({
  intent,
  fullWidth,
  type,
  form,
  title,
  purpose,
  disabled,
}) => {
  return (
    <button
      onClick={purpose}
      type={type}
      className={buttonStyles({ intent, fullWidth, form })}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
