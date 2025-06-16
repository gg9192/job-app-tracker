import Link from "next/link"
import { palette } from "@/lib/theme/colors"

type AuthLinkButtonProps = {
  href: string
  children: React.ReactNode
}

export function PageButton({ href, children }: AuthLinkButtonProps) {
  return (
    <Link
      href={href}
      className={`text-white border border-white px-8 py-3 font-semibold rounded-xl transition border-5 ${palette.buttonHover} ${palette.linkHover}`}
    >
      {children}
    </Link>
  )
}
