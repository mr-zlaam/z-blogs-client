"use client";
import { ThemeToggler } from "@/theme/ThemeToggler";
import { useTheme } from "next-themes";
import {} from "react";

function Settings() {
  const { theme } = useTheme();
  return (
    <>
      <section
        style={{
          border:
            theme === "dark" ? "1px solid #ffffff1f" : "1px solid #00000013",
        }}
      >
        <div className="mode w-full  p-3 flex items-center justify-around ">
          <span className="cursor-default">DarkMode</span>
          <ThemeToggler />
        </div>
      </section>
    </>
  );
}

export default Settings;
