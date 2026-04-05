import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Show the layered shell grid (default: true) */
  grid?: boolean;
  /** Match home hero: `shell-grid--fade` + `shell-grid-fine--fade` masks on the grids */
  shellFadedGrid?: boolean;
}

const SectionWrapper = ({ children, className, id, grid = true, shellFadedGrid = false }: SectionWrapperProps) => (
  <section id={id} className={cn("relative overflow-hidden py-16 md:py-24", className)}>
    {grid ? (
      <>
        <div className={cn("shell-grid", shellFadedGrid && "shell-grid--fade")} aria-hidden />
        <div className={cn("shell-grid-fine", shellFadedGrid && "shell-grid-fine--fade")} aria-hidden />
      </>
    ) : null}
    <div className="container relative z-10 mx-auto px-4 md:px-8">{children}</div>
  </section>
);

export default SectionWrapper;
