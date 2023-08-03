import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./button";
import { VariantProps, cva } from "class-variance-authority";
import { typographyVariants } from "./typography";
import { Icon, IconProps, iconVariants } from "./icons";
import { useModal } from "./modalcontext";

const inputVariants = cva(
  "transition-all duration-500 h-fit px-2 focus:border-blue-400  border w-full border-gray-300",
  {
    variants: {
      variant: {
        default: "",
        authInput: typographyVariants({ bold: "semibold" }),
        smallSearch: "bg-slate-100",
      },
      sizes: {
        default: "p-3",
        sm: "p-2.5",
        lg: "p-4",
        xs: "p-2",
      },
      rounded: {
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      sizes: "default",
      rounded: "lg",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  buttonLeft?: React.ReactNode;
  buttonRight?: React.ReactNode;
  iconLeft?: boolean;
  buttonVariant?: string;
  iconLeftType?: IconProps["type"];
  iconRight?: React.ReactNode;
  iconSize?: IconProps["size"];
  inputLoadingState?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      variant,
      sizes,
      buttonVariant,
      buttonLeft,
      iconLeftType,
      iconRight,
      iconLeft,
      buttonRight,
      rounded,
      iconSize,
      inputLoadingState,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex relative w-full">
        {buttonLeft && (
       buttonLeft
        )}
        <input
          type={type}
          className={cn(
            inputVariants({ variant, sizes, rounded }),
            typographyVariants({ size: sizes }),
            ` ${iconLeft ? "pl-12 " : ""} ${iconRight ? "pr-12" : ""}`,
            className
          )}
          ref={ref}
          {...props}
        />
        {iconLeft && (
          <Icon
            size={iconSize}
            type={iconLeftType}
            variant={"inputIconLeft"}
          />
        )}
        {iconRight && iconRight}
        {buttonRight && (
      buttonRight
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
