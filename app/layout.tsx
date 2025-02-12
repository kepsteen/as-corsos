import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, League_Spartan } from "next/font/google";
import { Navbar } from "./components/Navbar/Navbar";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	display: "swap",
});

const spartan = League_Spartan({
	variable: "--font-spartan",
	subsets: ["latin"],
	display: "swap",
});

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${spartan.variable} bg-white text-black`}>
			<body className="min-w-[375px]">
				<section className="min-h-screen">
					<Navbar />
					<main className="pt-[60px]">{children}</main>
				</section>
				<SpeedInsights />
			</body>
		</html>
	);
}
