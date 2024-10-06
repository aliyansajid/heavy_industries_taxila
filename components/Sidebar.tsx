"use client";

import { getSidebarLinksByRole, Role } from "@/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

const Sidebar = () => {
  const { data: session } = useSession();
  const pathName = usePathname();

  if (!session) {
    return;
  }

  const userRoleFromSession = session?.user?.role;

  const userRole: Role = (
    ["Admin", "CR", "User"].includes(userRoleFromSession)
      ? userRoleFromSession
      : "User"
  ) as Role;

  const filteredLinks = getSidebarLinksByRole(userRole);

  return (
    <nav className="hidden lg:flex flex-col w-60 min-h-screen bg-background-secondary border-r border-border-primary">
      <Link
        href="/"
        className="flex cursor-pointer px-7 py-5 mb-5 border-b border-border-primary"
      >
        <h1 className="text-xl font-medium">HIT</h1>
      </Link>
      {filteredLinks.map((item) => {
        const isActive =
          pathName === item.route || pathName.startsWith(`${item.route}/`);
        if (item.route === "/logout") {
          return (
            <Button
              key={item.label}
              onClick={() => signOut({ callbackUrl: "/" })}
              className={cn(
                "flex bg-transparent justify-start mx-4 px-3 py-2 gap-3 rounded-md",
                {
                  "hover:bg-action-secondary-hover": true,
                }
              )}
            >
              <item.icon size={20} className="text-dark-secondary" />
              <p className="text-dark-secondary text-sm font-medium">
                {item.label}
              </p>
            </Button>
          );
        }

        return (
          <Link
            href={item.route}
            key={item.label}
            className={cn(
              "flex items-center mx-4 px-3 py-2 gap-3 mb-1 rounded-md",
              {
                "hover:bg-action-secondary-hover": !isActive,
                "bg-dark-primary": isActive,
              }
            )}
          >
            <item.icon
              size={20}
              className={cn("text-sm font-medium", {
                "text-light-primary": isActive,
                "text-dark-secondary": !isActive,
              })}
            />

            <p
              className={cn("text-sm font-medium", {
                "text-light-primary": isActive,
                "text-dark-secondary": !isActive,
              })}
            >
              {item.label}
            </p>
          </Link>
        );
      })}
    </nav>
  );
};

export default Sidebar;
