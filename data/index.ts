import {
  User,
  Box,
  FileText,
  Inbox,
  LogOut,
  Mail,
  PencilLine,
  Search,
  Send,
  Upload,
  Building,
} from "lucide-react";

export type Role = "Admin" | "CR" | "User";

export const sidebarLinks = [
  {
    label: "Create User",
    route: "/create-user",
    icon: User,
  },
  {
    label: "Create Department",
    route: "/create-department",
    icon: Building,
  },

  {
    label: "Upload",
    route: "/upload",
    icon: Upload,
  },
  {
    label: "Inbox",
    route: "/inbox",
    icon: Inbox,
  },
  {
    label: "Outbox",
    route: "/outbox",
    icon: Box,
  },
  {
    label: "Search",
    route: "/search",
    icon: Search,
  },
  {
    label: "Track Letter",
    route: "/track-letter",
    icon: Mail,
  },
  {
    label: "Write",
    route: "/write",
    icon: PencilLine,
  },
  {
    label: "Send",
    route: "/send",
    icon: Send,
  },
  {
    label: "Requests",
    route: "/requests",
    icon: Inbox,
  },

  {
    label: "Send Request",
    route: "/send-request",
    icon: FileText,
  },
  {
    label: "Logout",
    route: "/logout",
    icon: LogOut,
  },
];

export const roleBasedMenuOptions: Record<Role, string[]> = {
  Admin: ["/create-department", "/create-user", "/logout"],
  CR: ["/upload", "/search", "/requests", "/logout"],
  User: [
    "/inbox",
    "/outbox",
    "/track-letter",
    "/write",
    "/send",
    "/send-request",
    "/logout",
  ],
};

export const getSidebarLinksByRole = (userRole: Role) => {
  const allowedRoutes = roleBasedMenuOptions[userRole] || [];
  return sidebarLinks.filter((link) => allowedRoutes.includes(link.route));
};
