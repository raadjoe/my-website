import { cn } from "@/lib/utils";
import { type HTMLAttributes, type ReactNode } from "react";

type ContentSurfaceProps = {
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "children" | "className">;

/**
 * Frosted surface for text on gridded pastel backgrounds — readable but blends with page color.
 */
export function ContentSurface({ children, className, ...props }: ContentSurfaceProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/35 bg-card/45 text-card-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04)] backdrop-blur-md",
        "dark:bg-card/35 dark:border-border/30 dark:ring-foreground/[0.06]",
        "ring-1 ring-inset ring-foreground/[0.04]",
        "p-6 md:p-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
