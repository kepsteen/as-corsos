import Image from "next/image";
import { HeroBanner } from "../components/HeroBanner/HeroBanner";
import { Footer } from "../components/Footer/Footer";
import { getPuppies } from "../lib/api";

export default async function AvailablePage() {
	const puppies = await getPuppies();
	console.log(puppies);

	return (
		<>
			<HeroBanner
				image="corso-woods-1"
				imageFill="cover"
				imagePos="top"
				mobileHeight={275}
				tabletHeight={325}
				laptopHeight={600}
			>
				<div className="bg-[#3333337c] h-full pl-3 laptop:pl-[3rem] laptop:pt-[4rem] grid place-content-center">
					<h1 className="font-heading text-white text-6xl laptop:text-[4rem]">
						Available Puppies
					</h1>
				</div>
			</HeroBanner>
			<div className="flex flex-col items-center space-y-8 max-w-7xl mx-auto py-10">
				{puppies.map((puppy) => (
					<div
						key={puppy.id}
						className="flex justify-center items-start w-full max-w-4xl"
					>
						<div className="relative w-64 h-64 border-4 border-gray-300 shadow-xl">
							<Image
								src={puppy.image_url}
								alt={puppy.name}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 15vw"
							/>
						</div>
						<div className="p-4">
							<h2 className="text-3xl font-bold text-gray-900 mb-2">
								{puppy.name}
							</h2>
							<div className="space-y-1 text-gray-600">
								<p className="flex items-center">
									<svg
										className="w-5 h-5 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									<span className="text-gray-700 text-sm font-medium mr-1">
										Available:
									</span>
									<span className="text-gray-800 text-base">
										{new Date(puppy.available_date).toLocaleDateString()}
									</span>
								</p>
								<p className="flex items-center">
									<svg
										className="w-5 h-5 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
										/>
									</svg>
									<span className="text-gray-700 text-sm font-medium mr-1">
										Gender:
									</span>
									<span className="text-gray-800 text-base">
										{puppy.gender}
									</span>
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
			<Footer />
		</>
	);
}
