"use client";
import Link from "next/link";

const links = [
  { label: "Full Stack Developer", to: "/" },
  { label: "Contact", to: "#contact" },
  { label: "Works", to: "#works" },
] as const;

export default function Header() {
  return (
    <div>
      <div className="flex flex-row items-center justify-between px-2 py-1 text-lg">
        <Link key={links[0].to} href={links[0].to}>
          {links[0].label}
        </Link>
        <nav className="flex gap-4">
          {links.map(({ to, label }) => {
            if (to === "/") {
              return null;
            }

            return (
              <Link key={to} href={to}>
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}