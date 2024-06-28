type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
export const navLinks = [
  {
    name: "Latest Posts",
    path: "/home",
    className:
      "border   border-foreground transition-all duration-300 hover:bg-foreground hover:text-background",
    variant: "outline" as ButtonVariant,
  },
  {
    name: "All Posts",
    path: "/all-posts",
    className:
      "border  border-foreground transition-all duration-300 hover:bg-foreground hover:text-background",
    variant: "outline" as ButtonVariant,
  },
];
