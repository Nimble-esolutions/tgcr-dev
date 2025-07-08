import TermsContent from "./TermsContent";

export const metadata = {
	title: "Terms & Condition | eLearniv - React Next.js Learning Management System",
};

const page = async ({ params }) => {
	const { lang } = await params;
	return (
		<>
			<TermsContent />
		</>
	);
};

export default page;
