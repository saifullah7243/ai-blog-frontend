"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold gradient-text">
          AI Blog Pro
        </Link>

        <nav className="flex gap-8 text-sm font-medium">
          <NavLink href="/" active={pathname === "/"}>
            Home
          </NavLink>
          <NavLink href="/blogs" active={pathname.startsWith("/blogs")}>
            Blogs
          </NavLink>
          <NavLink href="/workspace" active={pathname === "/workspace"}>
            Workspace
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`transition ${
        active
          ? "text-indigo-600 font-semibold"
          : "text-slate-600 hover:text-indigo-600"
      }`}
    >
      {children}
    </Link>
  );
}
