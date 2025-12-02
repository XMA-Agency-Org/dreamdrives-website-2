"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";

interface NavigationProps {
  className?: string;
  onLinkClick?: () => void;
  variant?: "horizontal" | "vertical";
}

export function Navigation({
  className,
  onLinkClick,
  variant = "horizontal",
}: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        variant === "horizontal"
          ? "hidden md:flex items-center gap-8"
          : "flex flex-col gap-6",
        className
      )}
    >
      {NAV_LINKS.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick}
            className={cn(
              "relative text-sm font-medium tracking-wide uppercase transition-colors duration-200",
              variant === "vertical" && "text-2xl lowercase tracking-normal",
              isActive
                ? "text-primary-500"
                : "text-foreground-muted hover:text-foreground"
            )}
          >
            {link.label}
            {isActive && variant === "horizontal" && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
