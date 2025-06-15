
import Link from "next/link"

type AuthLinkButtonProps = {
  href: string
  children: React.ReactNode
}

export function PageButton({ href, children }: AuthLinkButtonProps) {
  return (
    <Link
      href={href}
      className="px-8 py-3 border border-white text-white font-semibold rounded-xl hover:bg-white/10 transition"
    >
      {children}
    </Link>
  )
}
