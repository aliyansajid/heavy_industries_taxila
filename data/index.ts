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

export const sidebarLinks = [
  {
    label: "Create Department",
    route: "/create-department",
    icon: Building,
  },
  {
    label: "Create User",
    route: "/create-user",
    icon: User,
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
