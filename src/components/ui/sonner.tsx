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
          "--normal-bg": `var(--${palette.neutralBg})`,
          "--normal-text": `var(--${palette.neutralText})`,
          "--normal-border": `var(--${palette.secondaryBorder})`,
          "--info-bg": `var(--${palette.infoBg})`,
          "--success-bg": `var(--${palette.successBg})`,
          "--warning-bg": `var(--${palette.warningBg})`,
          "--error-bg": `var(--${palette.dangerBg})`,
          "--error-text": `var(--${palette.dangerText})`
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
