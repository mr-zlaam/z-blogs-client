import { BookLock, BookOpenCheck, Package2, Users2 } from "lucide-react";

export const dashboardNavlinks = [
  {
    path: "/home",
    name: "Home",
    iconClassName: "h-5 w-5 transition-all group-hover:scale-110",
    icon: Package2,
    className:
      "group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base",
  },
  {
    path: "/admin/users",
    className:
      "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
    name: "Users",
    icon: Users2,
    iconClassName: "h-5 w-5",
  },
  {
    name: "Private Blogs",
    icon: BookLock,
    iconClassName: "h-5 w-5",
    path: "/admin/blogs/privateBlogs",
    className:
      "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
  },
  {
    name: "Public Blogs",
    icon: BookOpenCheck,
    iconClassName: "h-5 w-5",
    path: "/admin/blogs/publicBlogs",
    className:
      "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
  },
];
