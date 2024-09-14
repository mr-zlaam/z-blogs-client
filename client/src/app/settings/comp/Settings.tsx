"use client";
import BackToPreviousRoute from "@/_subComponents/backToPreviousRoute/BackToPreviousRoute";
import { ThemeToggler } from "@/theme/ThemeToggler";
import { useTheme } from "next-themes";
import {} from "react";

function Settings() {
  const { theme } = useTheme();
  return (
    <>
      <BackToPreviousRoute />
      <section
        style={{
          border:
            theme === "dark" ? "1px solid #ffffff1f" : "1px solid #00000013",
        }}
        className="rounded-md "
      >
        <div className="mode w-full  p-3 flex items-center justify-around ">
          <span className="cursor-default">Theme</span>
          <ThemeToggler />
        </div>
      </section>
    </>
  );
}

export default Settings;
