"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
  iconClassName?: string;
  /** Compact icon-only control for dense toolbars */
  compact?: boolean;
};

export function ThemeToggle({
  className,
  iconClassName,
  compact = true,
}: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-[color,background-color,transform] duration-150",
        "hover:bg-muted hover:text-foreground active:scale-[0.98]",
        compact ? "size-9" : "h-9 gap-2 px-2.5 text-xs font-medium",
        className,
      )}
      onClick={() => setTheme(nextTheme)}
      aria-label={label}
      title={label}
    >
      {mounted ? (
        isDark ? (
          <Sun className={cn("size-[18px]", iconClassName)} aria-hidden />
        ) : (
          <Moon className={cn("size-[18px]", iconClassName)} aria-hidden />
        )
      ) : (
        <span className={cn("size-[18px]", iconClassName)} aria-hidden />
      )}
      {!compact ? <span>{isDark ? "Light" : "Dark"}</span> : null}
    </button>
  );
}
