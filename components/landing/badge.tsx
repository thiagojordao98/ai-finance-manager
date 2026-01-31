import { Check } from "lucide-react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "info";
  size?: "default" | "large";
  className?: string;
}

export function Badge({
  children,
  variant = "success",
  size = "default",
  className = "",
}: BadgeProps) {
  const variantStyles = {
    success: "bg-green-500/10 border-green-500/30 text-green-500",
    info: "bg-blue-500/10 border-blue-500/30 text-blue-500",
  };

  const sizeStyles = {
    default: "px-3 py-1.5 text-sm",
    large: "px-4 py-2 text-base",
  };

  return (
    <div
      className={`inline-flex items-center gap-2 border rounded-full font-medium ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      <Check className="w-4 h-4" />
      {children}
    </div>
  );
}
