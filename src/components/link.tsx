import { palette } from "@/lib/theme/colors";
import NextLink from "next/link";

type Sizes = "xl" | "md"

function getSizeStyling(size: Sizes = "md"): string {
  if (size === "xl") {
    return "text-xl font-bold"
  }
  return "font-medium"
}

export function Link({
  href,
  children,
  size = "md"
}: {
  href: string;
  children: React.ReactNode;
  size?: Sizes;
}) {
  return (
    <NextLink
      href={href}
      className={`${palette.lightText} ${palette.linkHover} transition ${getSizeStyling(size)} hover:cursor-pointer`}
    >
      {children}
    </NextLink>
  );
}

export function LinkStyledButton({
  handleClick,
  children,
  size = "md"
}: {
  handleClick: () => void;
  children: React.ReactNode;
  size?: Sizes;
}) {
  return (
    <button
      onClick={handleClick}
      className={`${palette.lightText} ${palette.linkHover} transition hover:cursor-pointer ${getSizeStyling(size)}`}
    >
      {children}
    </button>
  );
}
