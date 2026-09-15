"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { href: "/", label: "ホーム" },
  { href: "/about", label: "Tsumikiについて" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-wrap gap-2">
      {navigationItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={
              isActive
                ? "transition-colors rounded-md bg-primary px-3 py-2 font-semibold text-primary-foreground"
                : "transition-colors rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }
            key={item.href}
            href={item.href}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
