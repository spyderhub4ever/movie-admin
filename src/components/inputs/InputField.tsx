import * as React from "react";
import { cn } from "@/lib/utils";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          ref={ref}
          placeholder=" "
          className={cn(
            "peer w-full rounded-md border-2 border-slate-600 bg-transparent px-3 pt-5 pb-2 text-sm text-slate-200",
            "focus:border-purple-500 focus:ring-0 focus:outline-none",
            "placeholder-transparent",
            error && "border-red-500 focus:border-red-500",
            className
          )}
          {...props}
        />
        <label
          className={cn(
            "absolute left-3 text-slate-400 transition-all",
            "peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-500",
            "top-1.5 text-xs peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-purple-500"
          )}
        >
          {label}
        </label>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";
