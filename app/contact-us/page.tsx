import { Button } from "@/app/components/Button/Button";
import { ContactForm } from "@/app/components/ContactForm/ContactForm";
import { Footer } from "@/app/components/Footer/Footer";
import { HeroBanner } from "@/app/components/HeroBanner/HeroBanner";

export default async function Page() {
	return (
		<>
			<HeroBanner
				image="corso-gifts-1"
				imageFill="cover"
				mobileHeight={275}
				tabletHeight={325}
				laptopHeight={600}
			>
				<div className="bg-[#3333337c] h-full pl-3 laptop:pl-[3rem] laptop:pt-[4rem] grid place-content-center">
					<h1 className="font-body text-white text-6xl laptop:text-[4rem]">
						Contact Us
					</h1>
				</div>
			</HeroBanner>
			<div className="font-body space-y-3 mx-10 mb-10">
				<h1 className="font-heading text-[3rem] mt-10 text-center">
					Send Us a Message
				</h1>
				<ContactForm />
			</div>

			{/* <HeroBanner
				image="corso-2"
				imageFill="contain"
				imagePos="right"
				mobileHeight={300}
				tabletHeight={500}
			>
				<div className="pl-8 h-full flex flex-col justify-center font-body">
					<h1 className="font-heading text-[1.875rem] laptop:text-[3.125rem]">
						Hello!
					</h1>
					<p className="max-w-[50%] laptop:max-w-[75%] mb-3 laptop:text-[1.5rem]">
						Lorem ipsum odor amet, consectetuer adipiscing elit. Tellus
						scelerisque donec purus dui facilisi.
					</p>
					<p className="hidden tablet:block max-w-[50%] laptop:max-w-[75%] mb-3 laptop:text-[1.5rem]">
						Id odio torquent dis tortor eros euismod. Ornare pellentesque
						himenaeos quisque facilisi tincidunt.
					</p>
					<Button color="black" text="Learn more" path="/home" />
				</div>
			</HeroBanner> */}

			<Footer />
		</>
	);
}
