import React from "react";
import VerifyEmail from "@/components/Auth/VerifyEmail";
import { getDictionary } from "@/app/[lang]/dictionaries";

// cannot use generateMetadata() as this is a "use client" page
export async function generateMetadata({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: dict.verifyEmail.pageTitle,
	};
}

// this page will be loaded when the user clicks verify-email link embedded in the email
// URL format: http://localhost:3000/en/auth/verify-email?token=eyJhbGciOiJIUzI1NiIsInR5cCI6
const page = async ({ params }) => {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return (
		<>
			<div className="ptb-15">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-6">
							<VerifyEmail lang={lang} {...dict} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default page;
