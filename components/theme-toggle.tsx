"use client";

import { MoonIcon } from "@phosphor-icons/react/dist/csr/Moon";
import { SunIcon } from "@phosphor-icons/react/dist/csr/Sun";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ViewTransition {
  finished: Promise<void>;
  ready: Promise<void>;
  updateCallbackDone: Promise<void>;
  skipTransition(): void;
}

declare global {
  interface Document {
    startViewTransition(
      callback: () => void | Promise<void>,
    ): ViewTransition | undefined;
  }
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className="-m-2 p-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Toggle theme"
      >
        <SunIcon className="size-4" weight="fill" />
      </button>
    );
  }

  const toggleTheme = () => {
    if (!document.startViewTransition) {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
      return;
    }

    document.startViewTransition(() => {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    });
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="-m-2 p-2 text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <SunIcon className="size-4" weight="fill" />
      ) : (
        <MoonIcon className="size-4" weight="fill" />
      )}
    </button>
  );
}
