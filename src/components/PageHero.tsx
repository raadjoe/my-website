import { cn } from "@/lib/utils";
import { type HTMLAttributes, type ReactNode } from "react";

type PageHeroProps = {
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "children" | "className">;

/**
 * First overview block on inner pages (Research, Teaching, Publications, Awards).
 * Stronger surface than {@link ContentSurface} and than body cards — same look site-wide.
 */
export function PageHero({ children, className, ...props }: PageHeroProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/55 bg-card/90 text-card-foreground shadow-md backdrop-blur-md",
        "border-t-[3px] border-t-primary/45",
        "ring-1 ring-inset ring-foreground/[0.05]",
        "p-8 md:p-10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
