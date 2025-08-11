import SubscribeForm from "@/components/Shared/SubscribeForm";
import FaqContent from "./FaqContent";
import { getDictionary } from "../dictionaries";

export const metadata = {
	title: "FAQ's | eLearniv - React Next.js Learning Management System",
};

const page = async ({ params }) => {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return (
		<>
			<FaqContent />
			<SubscribeForm {...dict} />
		</>
	);
};

export default page;
