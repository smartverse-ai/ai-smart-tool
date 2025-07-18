// components/ui/Button.tsx
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition",
        className
      )}
      {...props}
    />
  );
}
