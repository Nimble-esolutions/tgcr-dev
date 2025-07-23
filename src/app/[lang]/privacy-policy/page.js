import PolicyContent from "./PolicyContent";

export const metadata = {
	title: "Privacy Policy | eLearniv - React Next.js Learning Management System",
};

const page = async ({ params }) => {
	const { lang } = await params;
	return (
		<>
			<PolicyContent />
		</>
	);
};

export default page;
