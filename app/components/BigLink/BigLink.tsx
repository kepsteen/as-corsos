"use client";

import { cn } from "@/app/lib/utils";
import Link from "next/link";

type BigLinkProps = {
	title: string;
	subtitle: string;
	path: string;
	className?: string;
};
export function BigLink({ title, subtitle, path, className }: BigLinkProps) {
	return (
		<Link
			href={path}
			className={cn(
				"flex flex-col w-full items-center py-[20px] transition-colors duration-300 ease bg-white text-gray-700 hover:bg-[#5e5e5e] hover:text-white",
				className
			)}
		>
			<span className="font-heading text-[2.25rem] font-semibold text-center">
				{title}
			</span>
			<span className="font-body text-[1.25rem] font-medium text-center">
				{subtitle}
			</span>
		</Link>
	);
}
