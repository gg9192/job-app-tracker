import { palette } from "@/lib/theme/colors";

export default function Link({
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
