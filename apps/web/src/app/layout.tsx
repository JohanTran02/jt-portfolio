import type { Metadata } from "next";
import "../index.css";
import Providers from "@/components/providers";

export const metadata: Metadata = {
	title: "jt-portfolio",
	description: "jt-portfolio",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body >
				<Providers>
					{children}
				</Providers>
			</body>
		</html>
	);
}
