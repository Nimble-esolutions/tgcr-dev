import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/getCurrentUser";
import errorImage from "/public/images/forbidden.png";

const page = async ({ params }) => {
	const { lang } = await params;
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		redirect(`/${lang}/auth/login`);
	}

	return (
		<div style={{ textAlign: "center", marginTop: "50px" }}>
			<Image src={errorImage} alt="Error" width={250} height={250} />
			<h1>403 - Forbidden</h1>
			<p>You do not have permission to access this page.</p>
			<p> </p>
		</div>
	);
};

export default page;
