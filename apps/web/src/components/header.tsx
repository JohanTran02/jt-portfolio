"use client";
import Link from "next/link";

export default function Header() {
	const links = [
		{ to: "/", label: "Full Stack Developer" },
		{ to: "#contact", label: "Contact" },
		{ to: "#works", label: "Works" },
	] as const;

	return (
		<div>
			<div className="flex flex-row items-center justify-between px-2 py-1 text-lg">
				<Link key={links[0].to} href={links[0].to}>{links[0].label}</Link>
				<nav className="flex gap-4">
					{links.map(({ to, label }) => {
						if (to === "/") return null;

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
