import { Puppy } from "./types";

export async function getPuppies() {
	let puppieResponse = await fetch(
		`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/puppies?select=*`,
		{
			headers: new Headers({
				apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
			}),
			next: {
				revalidate: 3600, // Revalidate every hour (3600 seconds)
			},
		}
	);
	const puppies = (await puppieResponse.json()) as Puppy[];
	return puppies;
}
