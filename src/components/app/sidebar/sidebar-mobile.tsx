"use client";
import Link from "next/link";
import { routes } from "./routes";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Package2 } from "lucide-react";

function SidebarMobile() {
  const pathname = usePathname();

  return (
    <div className="flex-1">
      <nav className="grid gap-2 text-lg font-medium">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        {routes.map((item) => {
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground",
                pathname.endsWith(item.href) && "bg-muted text-primary"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default SidebarMobile;
