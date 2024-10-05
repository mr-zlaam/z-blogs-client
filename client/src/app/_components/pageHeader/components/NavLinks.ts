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
      "border-[0.5px] shadow-sm    border-foreground/40 transition-all duration-300 hover:bg-foreground hover:text-background",
    variant: "outline" as ButtonVariant,
  },
  {
    name: "All Posts",
    path: "/all-posts",
    className:
      "border-[0.5px] shadow-sm   border-foreground/40 transition-all duration-300 hover:bg-foreground hover:text-background",
    variant: "outline" as ButtonVariant,
  },
];
