import { palette } from "@/lib/theme/colors";

export function Link({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={`${palette.lightText} ${palette.linkHover} transition font-medium hover:cursor-pointer`}
    >
      {children}
    </a>
  );
}

export function LinkStyledButton({
  handleClick,
  children,
}: {
  handleClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={handleClick}
      className={`${palette.lightText} ${palette.linkHover} transition font-medium hover:cursor-pointer`}
    >
      {children}
    </button>
  );
}
