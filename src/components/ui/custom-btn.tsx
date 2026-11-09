"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./button";

type Variant = "primary" | "secondary" | "tertiary" | "dark" | "light";
type Size = "sm" | "md" | "lg";

interface CustomBtnProps extends Omit<
  React.ComponentProps<typeof Button>,
  "variant" | "size" | "asChild"
> {
  children: React.ReactNode;
  className?: string;
  variants?: Variant;
  size?: Size;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
}

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const base =
  "relative inline-flex items-center justify-center overflow-hidden font-body font-semibold whitespace-nowrap transition-colors duration-300 cursor-pointer active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<Variant, string> = {
  primary:
    "rounded-full bg-primary text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] hover:bg-primary",
  secondary:
    "rounded-full border border-white/40 bg-transparent text-white hover:border-white hover:bg-transparent",
  tertiary:
    "rounded-full bg-transparent px-0 text-[#ff3300] shadow-none hover:bg-transparent",
  dark: "rounded-full bg-[#1a1a1a] text-white hover:bg-[#1a1a1a]",
  light: "rounded-full bg-white text-[#1a1a1a] hover:bg-white",
};

// Colour of the rising fill, and the colour of the label once it has rolled in
const hoverStyles: Record<Variant, { fill: string; text: string }> = {
  primary: { fill: "bg-[#1a1a1a]", text: "text-white" },
  secondary: { fill: "bg-white", text: "text-[#1a1a1a]" },
  tertiary: { fill: "", text: "text-white" },
  dark: { fill: "bg-primary", text: "text-white" },
  light: { fill: "bg-primary", text: "text-white" },
};

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-4 text-sm 2xl:h-11 2xl:px-5 2xl:text-base",
  md: "h-11 px-6 text-sm md:h-12 md:px-7 md:text-base 2xl:h-14 2xl:px-9 2xl:text-lg",
  lg: "h-12 px-8 text-base md:h-14 md:px-10 md:text-lg 2xl:h-16 2xl:px-12 2xl:text-xl",
};

const fillVariants: Variants = {
  rest: {
    y: "101%",
    borderRadius: "50% 50% 0% 0%",
    transition: { duration: 0.45, ease: EASE },
  },
  hover: {
    y: "0%",
    borderRadius: "0% 0% 0% 0%",
    transition: { duration: 0.55, ease: EASE },
  },
};

const labelOutVariants: Variants = {
  rest: { y: "0%", transition: { duration: 0.45, ease: EASE } },
  hover: { y: "-110%", transition: { duration: 0.45, ease: EASE } },
};

const labelInVariants: Variants = {
  rest: { y: "110%", transition: { duration: 0.45, ease: EASE } },
  hover: { y: "0%", transition: { duration: 0.45, ease: EASE } },
};

const underlineVariants: Variants = {
  rest: { scaleX: 0, transition: { duration: 0.4, ease: EASE } },
  hover: { scaleX: 1, transition: { duration: 0.5, ease: EASE } },
};

const CustomBtn = ({
  children,
  className,
  variants = "primary",
  size = "md",
  fullWidth = false,
  leftIcon,
  rightIcon,
  href,
  type = "button",
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}: CustomBtnProps) => {
  const [hovered, setHovered] = useState(false);
  const state = hovered ? "hover" : "rest";

  const classes = cn(
    base,
    variantStyles[variants],
    sizeStyles[size],
    fullWidth && "w-full",
    className,
  );

  const handlers = {
    onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
      setHovered(true);
      onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
      setHovered(false);
      onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent<HTMLButtonElement>) => {
      setHovered(true);
      onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent<HTMLButtonElement>) => {
      setHovered(false);
      onBlur?.(e);
    },
  };

  const hover = hoverStyles[variants];

  const content = (
    <>
      {/* Liquid fill that rises from the bottom */}
      {hover.fill && (
        <motion.span
          aria-hidden
          variants={fillVariants}
          initial="rest"
          animate={state}
          className={cn("absolute inset-0 z-0", hover.fill)}
        />
      )}

      {/* Underline sweep for the text only variant */}
      {variants === "tertiary" && (
        <motion.span
          aria-hidden
          variants={underlineVariants}
          initial="rest"
          animate={state}
          style={{ originX: 0 }}
          className="absolute bottom-1 left-0 z-0 h-[2px] w-full bg-current"
        />
      )}

      <span className="relative z-10 flex items-center justify-center gap-2">
        {leftIcon && (
          <motion.span
            animate={{ x: hovered ? -3 : 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex"
          >
            {leftIcon}
          </motion.span>
        )}

        {/* Label rolls up and is replaced by a second copy */}
        <span className="relative block overflow-hidden">
          <motion.span
            variants={labelOutVariants}
            initial="rest"
            animate={state}
            className="block"
          >
            {children}
          </motion.span>
          <motion.span
            aria-hidden
            variants={labelInVariants}
            initial="rest"
            animate={state}
            className={cn("absolute inset-0 block", hover.text)}
          >
            {children}
          </motion.span>
        </span>

        {rightIcon && (
          <motion.span
            animate={{ x: hovered ? 3 : 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className={cn(
              "flex transition-colors duration-300",
              hovered && hover.text,
            )}
          >
            {rightIcon}
          </motion.span>
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <Button asChild className={classes} {...handlers} {...props}>
        <Link href={href}>{content}</Link>
      </Button>
    );
  }

  return (
    <Button type={type} className={classes} {...handlers} {...props}>
      {content}
    </Button>
  );
};

export default CustomBtn;
