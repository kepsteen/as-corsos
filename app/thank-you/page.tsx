import { HeroBanner } from "@/app/components/HeroBanner/HeroBanner";
import { Button } from "@/app/components/Button/Button";
import { Footer } from "@/app/components/Footer/Footer";

export default function ThankYou() {
	return (
		<>
			<HeroBanner
				image="corso-gifts-1"
				imageFill="cover"
				mobileHeight={275}
				tabletHeight={325}
				laptopHeight={600}
			>
				<div className="bg-[#3333337c] h-full pt-5 pl-3 laptop:pl-[3rem] laptop:pt-[4rem]">
					<h1 className="font-heading text-white text-[3rem] laptop:text-[4rem]">
						Thank You
					</h1>
				</div>
			</HeroBanner>

			<div className="font-body space-y-6 mx-10 my-16 max-w-4xl mx-auto text-center">
				<h2 className="font-heading text-[2rem]">Application Received</h2>
				<p className="text-lg">
					Thank you for submitting your puppy adoption application. We will
					review your information and contact you soon.
				</p>
				<div className="pt-4">
					<Button color="black" text="Return Home" path="/" />
				</div>
			</div>

			<Footer />
		</>
	);
}
