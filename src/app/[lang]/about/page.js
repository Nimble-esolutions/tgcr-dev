import AboutUs from "@/components/AboutUs/AboutUs";
import CourseAdvisor from "@/components/Shared/CourseAdvisor";
import SubscribeForm from "@/components/Shared/SubscribeForm";
import ASpot from "@/components/tGCRHome/ASpot";
import FeedbackSliderWithFunFacts from "@/components/tGCRHome/FeedbackSliderWithFunFacts";
import Partner from "@/components/tGCRHome/Partner";
import { getPartners } from "@/actions/admin/getPartners";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getDictionary } from "@/app/[lang]/dictionaries";

export async function generateMetadata({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: dict.homepage.pageTitle,
	};
}

const page = async ({ params }) => {
	const { lang } = await params;
	const dict = await getDictionary(lang);
	// const { partners } = await getPartners();
	const currentUser = await getCurrentUser();

	return (
		<>
			<AboutUs currentUser={currentUser} lang={lang} aboutUsDict={dict.homepage.aboutUs} />

			{/* <FeedbackSliderWithFunFacts {...dict} /> */}

			<ASpot currentUser={currentUser} lang={lang} featureDict={dict.homepage.feature} />

			{/* <CourseAdvisor /> */}

			{/* <Partner partners={partners} /> */}

			{/* <SubscribeForm {...dict} /> */}
		</>
	);
};

export default page;
