"use client";

import { Logo } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="py-4 px-4 md:px-8">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-2xl font-bold text-foreground">
            AdGenius
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <p className="hidden font-headline text-sm text-muted-foreground md:block">
            Click. Create. Captivate.
          </p>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
