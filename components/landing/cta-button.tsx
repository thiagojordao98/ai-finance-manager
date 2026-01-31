"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "default" | "large";
  showArrow?: boolean;
  className?: string;
}

export function CTAButton({
  href,
  children,
  variant = "primary",
  size = "default",
  showArrow = false,
  className = "",
}: CTAButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 transform hover:-translate-y-0.5";

  const variantStyles = {
    primary:
      "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40",
    secondary:
      "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl",
  };

  const sizeStyles = {
    default: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  return (
    <Link
      href={href}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
      {showArrow && <ArrowRight className="w-5 h-5" />}
    </Link>
  );
}
