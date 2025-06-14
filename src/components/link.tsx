export default function Link({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a href={href} className="text-white hover:text-lime-200 transition font-medium hover:cursor-pointer">
            {children}
        </a>
    );
}
