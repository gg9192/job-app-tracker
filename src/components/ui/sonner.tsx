"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";
import { palette } from "@/lib/theme/colors";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "#292524", // neutralBg: bg-white
          "--normal-text": "#FFFFFF", // neutralText: text-gray-800
          "--normal-border": "#1c1917", // secondaryBorder: border-stone-800
          "--info-bg": "#2dd4bf", // infoBg: bg-teal-400
          "--success-bg": "#22c55e", // successBg: bg-green-500
          "--warning-bg": "#fcd34d", // warningBg: bg-amber-300
          "--error-bg": "#ef4444", // dangerBg: bg-red-500
          "--error-text": "#ef4444" // dangerText: text-red-500
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
