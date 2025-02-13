"use client";
import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/Button/Button";
import { Footer } from "@/app/components/Footer/Footer";
import { HeroBanner } from "@/app/components/HeroBanner/HeroBanner";
import { getPuppies } from "../lib/api";
import { supabase } from "../lib/supabase/client";
import { revalidatePath } from "next/cache";
import { Puppy } from "../lib/types";
import { z } from "zod";

const waitlistSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Please enter a valid email address"),
	phone: z
		.string()
		.regex(
			/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
			"Please enter a valid phone number"
		),
	puppyName: z.string(),
	gender: z.string(),
	livingSituation: z.string().min(1, "Please describe your living situation"),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

export default function Page() {
	const [errors, setErrors] = useState<
		Partial<Record<keyof WaitlistFormData, string>>
	>({});
	const [puppies, setPuppies] = useState<Puppy[]>([]);
	const router = useRouter();

	const formatPhoneNumber = (value: string) => {
		// Remove all non-digits
		const phoneNumber = value.replace(/\D/g, "");

		// Return empty if no input
		if (phoneNumber.length === 0) return "";

		// Format according to length
		if (phoneNumber.length <= 3) {
			return `(${phoneNumber}`;
		}
		if (phoneNumber.length <= 6) {
			return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
		}
		return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
			3,
			6
		)}-${phoneNumber.slice(6, 10)}`;
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formatted = formatPhoneNumber(e.target.value);
		e.target.value = formatted;
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrors({});

		const formData = new FormData(e.currentTarget);
		const formValues = {
			firstName: formData.get("firstName") as string,
			lastName: formData.get("lastName") as string,
			email: formData.get("email") as string,
			phone: formData.get("phone") as string,
			puppyName: formData.get("puppyName") as string,
			gender: formData.get("gender") as string,
			livingSituation: formData.get("livingSituation") as string,
		};

		const result = waitlistSchema.safeParse(formValues);

		if (!result.success) {
			// Convert ZodError into field-specific errors
			const fieldErrors: Partial<Record<keyof WaitlistFormData, string>> = {};
			result.error.errors.forEach((error) => {
				const field = error.path[0] as keyof WaitlistFormData;
				fieldErrors[field] = error.message;
			});
			setErrors(fieldErrors);
			return;
		}

		const application = {
			first_name: result.data.firstName,
			last_name: result.data.lastName,
			email: result.data.email,
			phone_number: result.data.phone,
			desired_puppy: result.data.puppyName,
			gender_preference: result.data.gender,
			living_situation: result.data.livingSituation,
			status: "pending",
		};

		try {
			const { error: supabaseError } = await supabase
				.from("puppy_adoption_waitlist")
				.insert([application]);

			if (supabaseError) throw supabaseError;

			router.push("/thank-you");
		} catch (err) {
			console.error("Error submitting application:", err);
			setErrors({});
		}
		console.log(application);
	};

	useEffect(() => {
		const fetchPuppies = async () => {
			const puppyData = await getPuppies();
			setPuppies(puppyData);
		};
		fetchPuppies();
	}, []);

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
						Waitlist
					</h1>
				</div>
			</HeroBanner>
			<div className="font-body space-y-3 mx-10">
				<h1 className="font-heading text-[3rem] mt-10">The Waitlist Process</h1>
				<p>
					Lorem ipsum odor amet, consectetuer adipiscing elit. Nibh adipiscing
					litora; odio auctor litora ligula. Aliquam semper purus donec nascetur
					sapien. Cursus eros lectus massa vivamus quis semper hac. Et vulputate
					primis aliquet class quis. Habitasse felis metus pretium litora dis
					mollis imperdiet curabitur.
				</p>
				<p>
					Lobortis finibus integer facilisis mauris gravida et. Ac elit
					elementum erat tincidunt ultrices quisque habitasse. Class blandit
					congue convallis ex magnis class sapien enim tellus. Euismod quis
					potenti nisl ac varius dignissim semper. Ullamcorper parturient velit
					hendrerit elementum auctor eleifend vel nullam. Urna habitasse urna
					elit non quam faucibus ut. Scelerisque finibus est turpis facilisi
					consequat phasellus sodales imperdiet adipiscing. Et duis sodales
					netus gravida aptent ligula aptent. Dictum lacinia erat sagittis
					rutrum dolor.
				</p>
			</div>

			<div className="font-body mx-10 mt-8 mb-12">
				<h2 className="font-heading text-[2rem] mb-6 text-center">
					Apply for a Puppy
				</h2>
				<form
					onSubmit={handleSubmit}
					autoComplete="on"
					className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
				>
					<div className="flex flex-col">
						<label htmlFor="firstName" className="mb-2">
							First Name *
						</label>
						<input
							type="text"
							id="firstName"
							name="firstName"
							required
							autoComplete="given-name"
							className={`border-2 ${
								errors.firstName ? "border-red-500" : "border-gray-300"
							} p-2 focus:outline-none focus:border-yellow-400`}
						/>
						{errors.firstName && (
							<p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
						)}
					</div>

					<div className="flex flex-col">
						<label htmlFor="lastName" className="mb-2">
							Last Name *
						</label>
						<input
							type="text"
							id="lastName"
							name="lastName"
							required
							autoComplete="family-name"
							className={`border-2 ${
								errors.lastName ? "border-red-500" : "border-gray-300"
							} p-2 focus:outline-none focus:border-yellow-400`}
						/>
						{errors.lastName && (
							<p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
						)}
					</div>

					<div className="flex flex-col">
						<label htmlFor="email" className="mb-2">
							Email *
						</label>
						<input
							type="email"
							id="email"
							name="email"
							required
							autoComplete="email"
							className={`border-2 ${
								errors.email ? "border-red-500" : "border-gray-300"
							} p-2 focus:outline-none focus:border-yellow-400`}
						/>
						{errors.email && (
							<p className="text-red-500 text-sm mt-1">{errors.email}</p>
						)}
					</div>

					<div className="flex flex-col">
						<label htmlFor="phone" className="mb-2">
							Phone Number *
						</label>
						<input
							type="tel"
							id="phone"
							name="phone"
							required
							autoComplete="tel-national"
							maxLength={14}
							onChange={handlePhoneChange}
							className={`border-2 ${
								errors.phone ? "border-red-500" : "border-gray-300"
							} p-2 focus:outline-none focus:border-yellow-400`}
						/>
						{errors.phone && (
							<p className="text-red-500 text-sm mt-1">{errors.phone}</p>
						)}
					</div>

					<div className="flex flex-col">
						<label htmlFor="puppyName" className="mb-2">
							Desired Puppy Name
						</label>
						<select
							id="puppyName"
							name="puppyName"
							defaultValue=""
							className={`border-2 ${
								errors.puppyName ? "border-red-500" : "border-gray-300"
							} p-2 focus:outline-none focus:border-yellow-400`}
						>
							<option value="">Select a name</option>
							{puppies.map((puppy) => (
								<option key={puppy.id} value={puppy.name}>
									{puppy.name}
								</option>
							))}
						</select>
						{errors.puppyName && (
							<p className="text-red-500 text-sm mt-1">{errors.puppyName}</p>
						)}
					</div>

					<div className="flex flex-col">
						<label htmlFor="gender" className="mb-2">
							Gender Preference
						</label>
						<select
							id="gender"
							name="gender"
							defaultValue=""
							className={`border-2 ${
								errors.gender ? "border-red-500" : "border-gray-300"
							} p-2 focus:outline-none focus:border-yellow-400`}
						>
							<option value="">No Preference</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
						{errors.gender && (
							<p className="text-red-500 text-sm mt-1">{errors.gender}</p>
						)}
					</div>

					<div className="flex flex-col md:col-span-2">
						<label htmlFor="livingSituation" className="mb-2">
							Living Situation *
						</label>
						<textarea
							id="livingSituation"
							name="livingSituation"
							required
							rows={4}
							placeholder="Please describe your living situation (house/apartment, yard size, other pets, etc.)"
							className={`border-2 ${
								errors.livingSituation ? "border-red-500" : "border-gray-300"
							} p-2 focus:outline-none focus:border-yellow-400`}
						></textarea>
						{errors.livingSituation && (
							<p className="text-red-500 text-sm mt-1">
								{errors.livingSituation}
							</p>
						)}
					</div>

					<div className="md:col-span-2">
						<button
							type="submit"
							className="border-2 py-[12px] px-[30px] tablet:px-[60px] font-body text-[1.125rem] font-medium transition:transform duration-[300ms] ease hover:scale-90 cursor-pointer"
						>
							Submit Application
						</button>
					</div>
				</form>
			</div>

			<div
				className={`font-body [&>*>h1]:font-heading mx-10 mt-8 [&>*>h1]:text-[2.3rem] [&>*>ul]:text-[1.1rem] min-[740px]:flex flex-wrap [&>*]:border-2
      [&>*]:border-gray-300 [&>*]:basis-[calc(23%)] [&>*]:min-w-[160px] [&>*]:h-[250px] justify-between [&>*]:py-8 [&>*]:flex [&>*]:flex-col [&>*]:items-center`}
			>
				<div>
					<h1>Apply</h1>
					<ul>
						<li>- Lorem</li>
						<li>- Ipsum</li>
					</ul>
				</div>
				<div>
					<h1>Qualify</h1>
					<ul>
						<li>- Odor</li>
						<li>- Amet</li>
					</ul>
				</div>
				<div>
					<h1>Purchase</h1>
					<ul>
						<li>- Consectetuer</li>
						<li>- Adipiscing</li>
					</ul>
				</div>
				<div>
					<h1>Delivery</h1>
					<ul>
						<li>- Elit</li>
						<li>- Tellus</li>
					</ul>
				</div>
			</div>

			<HeroBanner
				image="corso-2"
				imageFill="contain"
				imagePos="right"
				mobileHeight={300}
				tabletHeight={500}
			>
				<div className="pl-8 h-full flex flex-col justify-center font-body">
					<h1 className="font-heading text-[1.875rem] laptop:text-[3.125rem]">
						Ready?
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
			</HeroBanner>

			<Footer />
		</>
	);
}
