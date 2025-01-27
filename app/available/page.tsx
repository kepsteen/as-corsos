import Image from "next/image";

export default function AvailablePage() {
	return (
		<>
			<h1 className="text-center pt-28">HEllo Doggies</h1>
			<main className="flex flex-col items-center">
				<article>
					<div className="w-96 h-96">
						<Image
							src="/puppy.png"
							alt="puppy photo"
							width={500}
							height={500}
						/>
					</div>
					<p>Puppy One</p>
				</article>
			</main>
		</>
	);
}
