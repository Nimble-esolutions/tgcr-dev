import { getCurrentUser } from "@/actions/getCurrentUser";
import { getDictionary } from "@/app/[lang]/dictionaries";
import ASpot from "@/components/tGCRHome/ASpot";
import SearchSpot from "@/components/tGCRHome/SearchSpot";
import StepsToLearn from "@/components/tGCRHome/StepsToLearn";
import BecomeTeacher from "@/components/tGCRHome/BecomeTeacher";

// export async function generateMetadata({ params }) {
// 	const { lang } = await params;
// 	const dict = await getDictionary(lang);

// 	return {
// 		title: dict.homepage.pageTitle,
// 	};
// }

const page = async ({ params }) => {
	const { lang } = await params;
	const dict = await getDictionary(lang);
	const currentUser = await getCurrentUser();

	// const { partners } = await getPartners();
	// const { testimonials } = await getTestimonials();

	return (
		<>
			<ASpot currentUser={currentUser} lang={lang} featureDict={dict.homepage.feature} />
			<SearchSpot
				currentUser={currentUser}
				lang={lang}
				getStartedDict={dict.homepage.getStarted}
			/>
			<StepsToLearn
				currentUser={currentUser}
				lang={lang}
				stepsToLearnDict={dict.homepage.stepsToLearn}
			/>
			<BecomeTeacher
				currentUser={currentUser}
				lang={lang}
				becomeTeacherDict={dict.homepage.becomeTeacher}
			/>
			{/* <AboutUs currentUser={currentUser} lang={lang} aboutUsDict={dict.homepage.aboutUs} /> */}
			{/* <Partner partners={partners} /> */}
			{/* <SubscribeForm {...dict} /> */}
		</>
	);
};

export default page;
