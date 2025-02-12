import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "vtmsehnzeobuciuwgewq.supabase.co",
			},
		],
	},
};

export default nextConfig;
