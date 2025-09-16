import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type SheetSize = "sm" | "md" | "lg" | "xl" | "full";

const widthMap: Record<SheetSize, string> = {
  sm: "!max-w-[320px]",
  md: "!max-w-[480px]",
  lg: "!max-w-[640px]",
  xl: "!max-w-[800px]",
  full: "!max-w-full",
};

type AppSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  size?: SheetSize;
  className?: string;
};

export function SliderSheet({
  open,
  onOpenChange,
  title,
  header,
  footer,
  children,
  side = "right",
  size = "md",
  className,
}: AppSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={side}
        className={cn(
          widthMap[size],
          "bg-slate-900/95 backdrop-blur-xl border-l border-slate-800 shadow-2xl rounded-l-2xl gap-0",
          "text-slate-200 flex flex-col",
          className
        )}
      >
        <SheetHeader className="border-b border-slate-800">
          {title && (
            <SheetTitle className="text-lg font-semibold text-slate-100">
              {title}
            </SheetTitle>
          )}
          {header}
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4">{children}</div>

        {footer && (
          <SheetFooter className="border-t border-slate-800 pt-4 mt-6">
            {footer}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
