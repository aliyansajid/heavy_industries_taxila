"use client";

import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import React from "react";

export enum ButtonVariant {
  DEFAULT = "default",
  DESTRUCTIVE = "destructive",
  OUTLINE = "outline",
  SECONDARY = "secondary",
  GHOST = "ghost",
  LINK = "link",
}

interface ButtonProps {
  text: string;
  variant: ButtonVariant;
  iconSrc?: React.ElementType;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const CustomButton = ({
  variant,
  text,
  iconSrc: Icon,
  onClick,
  disabled,
  isLoading = false,
  className,
  type,
}: ButtonProps) => {
  return (
    <Button
      variant={variant}
      type={type}
      className={`${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? (
        <Loader2 size={20} className="spin-animation" />
      ) : (
        <>
          {Icon && <Icon size={20} />}
          <span>{text}</span>
        </>
      )}
    </Button>
  );
};

export default CustomButton;
