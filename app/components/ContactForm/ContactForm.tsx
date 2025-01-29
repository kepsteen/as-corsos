"use client";

import { useCallback, useState } from "react";
import { Button } from "../Button/Button";
// import emailjs from 'emailjs-com';

export function ContactForm() {
	const [nameText, setNameText] = useState<string>();
	const [emailText, setEmailText] = useState<string>();
	const [messageText, setMessageText] = useState<string>();

	// function sendEmail(e: React.FormEvent<HTMLFormElement>) {
	//   e.preventDefault();

	//   /**
	//    * I was able to figure out how to send emails using emailjs
	//    * it's currently setup to send stuff to me
	//    * if they want to use it, they will need to make their own account (there is a free version that allows 200 emails/month)
	//    * if they want to use something else, let me know
	//    */
	//   emailjs.send('service_fuzez5h', 'template_lcnwbhk', {
	//     'from_name': nameText,
	//     'from_email': emailText,
	//     'message': messageText,
	//   }, 'Y3Ds21IYgk49GXNBR')
	//   .then(() => {
	//     window.location.reload();
	//   })
	// }

	return (
		<form className="w-full max-w-[500px] mx-auto">
			<label>
				Name <span className="text-red-500">*</span>
				<div>
					<input
						required
						type="text"
						name="from_name"
						className="border-2 rounded w-full mb-5 pl-2 focus:outline-yellow-400"
						value={nameText ? nameText : ""}
						onChange={(e) => setNameText(e.target.value)}
					/>
				</div>
			</label>

			<label>
				Email <span className="text-red-500">*</span>
				<div>
					<input
						required
						type="email"
						name="from_email"
						className="border-2 rounded w-full mb-5 pl-2 focus:outline-yellow-400	"
						value={emailText ? emailText : ""}
						onChange={(e) => setEmailText(e.target.value)}
					/>
				</div>
			</label>

			<label>
				Message <span className="text-red-500">*</span>
				<div>
					<textarea
						required
						name="message"
						className="border-2 rounded w-full h-[100px] mb-5 pl-2 focus:outline-yellow-400	"
						value={messageText ? messageText : ""}
						onChange={(e) => setMessageText(e.target.value)}
					/>
				</div>
			</label>

			<div className="w-full flex justify-end">
				<Button color="black" text="Send!" path="/home" />
			</div>
		</form>
	);
}
