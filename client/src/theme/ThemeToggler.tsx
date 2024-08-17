"use client";

import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { WiMoonAltWaxingCrescent5 } from "react-icons/wi";

export function ThemeToggler() {
  const { setTheme, theme } = useTheme();

  return (
    <>
      <Switch
        checked={theme === "dark" ? true : false}
        className="cursor-pointer shadow-sm shadow-foreground"
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
      />
    </>
  );
}
