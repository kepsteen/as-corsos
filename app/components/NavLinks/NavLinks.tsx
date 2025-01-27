"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinksProps = {
	type: string;
};
export function NavLinks({ type }: NavLinksProps) {
	const pathname = usePathname();

	const highlightClass =
		type === "yellow" ? "text-yellow-400" : "bg-[#3f444a] text-white";
	const hoverClass =
		type === "yellow"
			? " hover:text-yellow-400"
			: " hover:bg-[#3f444a] hover:text-white";

	return (
		<>
			<li className={(pathname === "/" ? highlightClass : "") + hoverClass}>
				<Link href="/">Home</Link>
			</li>
			<li
				className={
					(pathname === "/about-us" ? highlightClass : "") + hoverClass
				}
			>
				<Link href="/about-us">About Us</Link>
			</li>
			<li
				className={
					(pathname === "/about-the-breed" ? highlightClass : "") + hoverClass
				}
			>
				<Link href="/about-the-breed">About the Breed</Link>
			</li>
			<li
				className={
					(pathname === "/contact-us" ? highlightClass : "") + hoverClass
				}
			>
				<Link href="/contact-us">Contact Us</Link>
			</li>
			<li
				className={
					(pathname === "/waitlist" ? highlightClass : "") + hoverClass
				}
			>
				<Link href="/waitlist">Wait List</Link>
			</li>
			<li
				className={
					(pathname === "/available" ? highlightClass : "") + hoverClass
				}
			>
				<Link href="/available">Available</Link>
			</li>
			<li
				className={
					(pathname === "/testimonials" ? highlightClass : "") + hoverClass
				}
			>
				<Link href="/testimonials">Testimonials</Link>
			</li>
			<li className={(pathname === "/faq" ? highlightClass : "") + hoverClass}>
				<Link href="/faq">FAQ</Link>
			</li>
		</>
	);
}
